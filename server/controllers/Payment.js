import axios from "axios";
import Patient from "../models/Patient.js";
import PremiumPatient from "../models/PremiumPatient.js";
import User from "../models/User.js";

const CHAPA_URL =
  process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH =
  process.env.CHAPA_AUTH || "CHASECK_TEST-WXM4qaFmOfpZsmrJmM2kRUpiniM5fgFY"; // || register to chapa and get the key

const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
  },
};

export const addPayment = async (req, res, next) => {
  // chapa redirect you to this url when payment is successful
  const CALLBACK_URL = "http://localhost:3003/api/payment/verifypayment/";
  const RETURN_URL = "http://localhost:3000/";

  // a unique reference given to every transaction
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();

  const user = await User.findOne({ _id: req.user?.id });

  // form data
  const data = {
    amount: "3499",
    currency: "ETB",
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + TEXT_REF,
    return_url: RETURN_URL,
  };

  // post request to chapa
  //   await axios
  //     .post(CHAPA_URL, data, config)
  //     .then((response) => {
  //       res.redirect(response.data.data.checkout_url);
  //     })
  //     .catch((err) => console.log(err));

  console.log(user.email);

  try {
    const response = await axios.post(CHAPA_URL, data, {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    if (response.data.status === "success") {
      console.log("Payment was successfully verified");
      const patient = await Patient.findOne({ user: user._id });
      if (patient) {
        const premiumPatient = await PremiumPatient.findOne({
          patient: patient._id,
        });
        if (premiumPatient) {
          // Update existing premium patient
          premiumPatient.isPremium = true;
          premiumPatient.isValid = true;
          premiumPatient.date = new Date();
          await premiumPatient.save();
          console.log("Premium patient updated successfully");
        } else {
          // Create new premium patient
          const newPremiumPatient = new PremiumPatient({
            patient: patient._id,
            date: new Date(),
            isPremium: true,
            isValid: true,
          });
          await newPremiumPatient.save();
          console.log("Premium patient added successfully");
        }
      } else {
        console.log("Patient not found");
      }
    }
    res.json({ detail: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  //verify the transaction

  console.log("verifying");

  try {
    const response = await axios.get(
      "https://api.chapa.co/v1/transaction/verify/" + req.params.id,
      config
    );
  } catch (err) {
    console.log("Payment can't be verified", err);
    res.status(500).json({ error: err.message });
  }
};

export const paymentSuccess = async (req, res) => {
  res.render("success");
};

export const freePayment = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createError(400, "User ID is missing"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const patient = await Patient.findOne({ user: user._id });
    if (!patient) {
      return next(createError(404, "Patient not found"));
    }

    let premiumPatient = await PremiumPatient.findOne({ patient: patient._id });

    if (premiumPatient) {
      // Update existing premium patient
      premiumPatient.isPremium = false;
      premiumPatient.isValid = true;
      premiumPatient.date = new Date();
      await premiumPatient.save();
      console.log("free patient updated successfully");
    } else {
      // Create new premium patient
      premiumPatient = new PremiumPatient({
        patient: patient._id,
        date: new Date(),
        isPremium: false, // This should be false for free payment
        isValid: true,
      });
      await premiumPatient.save();
      console.log("free patient added successfully");
    }

    res
      .status(200)
      .json({
        message: "Patient subscription updated successfully",
        premiumPatient,
      });
  } catch (error) {
    console.error("Error updating patient subscription", error);
    next(createError(500, "Internal Server Error"));
  }
};

import axios from "axios";

const CHAPA_URL =
  process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH =
  process.env.CHAPA_AUTH || "CHASECK_TEST-WXM4qaFmOfpZsmrJmM2kRUpiniM5fgFY"; // || register to chapa and get the key

const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`,
  },
};

export const addPayment = async (req, res) => {
  // chapa redirect you to this url when payment is successful
  const CALLBACK_URL = "http://localhost:3003/api/payment/verifypayment/";
  const RETURN_URL = "http://localhost:3000/";

  // a unique reference given to every transaction
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();

  // form data
  const data = {
    amount: "100",
    currency: "ETB",
    email: "ato@Chala.com",
    first_name: "Ato",
    last_name: "Chala",
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

  //

  try {
    const response = await axios.post(CHAPA_URL, data, {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`,
        "Content-Type": "application/json",
      },
    });
    res.json({ detail: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  //verify the transaction

  await axios
    .get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
    .then((response) => {
      console.log("Payment was successfully verified");
    })
    .catch((err) => console.log("Payment can't be verfied", err));
};

export const paymentSuccess = async (req, res) => {
  res.render("success");
};

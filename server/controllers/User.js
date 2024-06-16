import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";
import Patient from "../models/Patient.js";
import Therapist from "../models/Therapist.js";
import otpGenerator from "otp-generator";
import crypto from "crypto";
import { promisify } from "util";
import PremiumPatient from "../models/PremiumPatient.js";
// import mailService from "../services/mailer.js"

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT);

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, img, userType } = req.body;

    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    const isActive = 1;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      isActive,
    });
    const createdUser = await user.save();
    // Create a new Patient or Therapist document based on userType
    if (userType === "patient") {
      const patient = new Patient({
        user: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      });
      await patient.save();

      const premiumPatient = await PremiumPatient.findOne({
        patient: patient._id,
      });

      const userinfo = {
        patientId: patient._id,
        patientFirstName: patient.firstName,
        patientLastName: patient.lastName,
        isPremium: premiumPatient?.isPremium,
      };
      const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
        expiresIn: "9999 years",
      });
      return res.status(200).json({ token, user, userinfo });
    } else if (userType === "therapist") {
      const therapist = new Therapist({
        user: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      });
      await therapist.save();
    }
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

export const sendOTP = async (req, res, next) => {
  const { userId } = req;
  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 Mins after otp is sent

  const user = await User.findByIdAndUpdate(userId, {
    otp_expiry_time: otp_expiry_time,
  });

  user.otp = new_otp.toString();

  await user.save({ new: true, validateModifiedOnly: true });

  console.log(new_otp);

  // TODO send mail
  mailService.sendEmail({
    from: "shreyanshshah242@gmail.com",
    to: user.email,
    subject: "Verification OTP",
    html: otp(user.firstName, new_otp),
    attachments: [],
  });

  res.status(200).json({
    status: "success",
    message: "OTP Sent Successfully!",
  });
};

export const verifyOTP = async (req, res, next) => {
  // verify otp and update user accordingly
  const { email, otp } = req.body;
  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      status: "error",
      message: "Email is already verified",
    });
  }

  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });

    return;
  }

  // OTP is correct

  user.verified = true;
  user.otp = undefined;
  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified Successfully!",
    token,
    user_id: user._id,
  });
};

export const protect = async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;

  // req.headers is going to be in the form 'Bearer lkj452u34gjh43'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      message: "You are not logged in! Please log in to get access.",
    });
  }
  // 2) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT);

  console.log(decoded);

  // 3) Check if user still exists

  const this_user = await User.findById(decoded.userId);
  if (!this_user) {
    return res.status(401).json({
      message: "The user belonging to this token does no longer exists.",
    });
  }
  // 4) Check if user changed password after the token was issued
  if (this_user.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      message: "User recently changed password! Please log in again.",
    });
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = this_user;
  next();
};

export const forgotPassword = async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "There is no user with email address.",
    });
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `http://localhost:3000/auth/new-password?token=${resetToken}`;
    // TODO => Send Email with this Reset URL to user's email address

    console.log(resetURL);

    mailService.sendEmail({
      from: "shreyanshshah242@gmail.com",
      to: user.email,
      subject: "Reset Password",
      html: resetPassword(user.firstName, resetURL),
      attachments: [],
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      message: "There was an error sending the email. Try again later!",
    });
  }
};

export const resetPassword = async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Token is Invalid or Expired",
    });
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password Reseted Successfully",
    token,
  });
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    // Check if user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }
    console.log(user);

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      console.log(password);
      console.log(user.password);
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });

    if (user.userType === "patient") {
      const patient = await Patient.findOne({ user: user._id });
      if (!patient) {
        return next(createError(404, "Patient not found"));
      }
      const premiumPatient = await PremiumPatient.findOne({
        patient: patient._id,
      });

      const userinfo = {
        patientId: patient._id,
        patientFirstName: patient.firstName,
        patientLastName: patient.lastName,
        isPremium: premiumPatient?.isPremium,
      };

      console.log(userinfo);
      return res.status(200).json({ token, user, userinfo });
    } else if (user.userType === "therapist") {
      const therapist = await Therapist.findOne({ user: user._id });
      if (!therapist) {
        return next(createError(404, "Therapist not found"));
      }
      console.log(therapist);
      return res.status(200).json({ token, user, therapist });
    }

    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

export const getUsers = async (req, res) => {
  const all_users = await User.find({}).select("firstName lastName");

  res.status(200).json({
    data : all_users
  })
};

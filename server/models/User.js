import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (email) {
          return String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        message: (props) => `Email (${props.value}) is invalid!`,
      },
    },
    password: {
      // unselect
      type: String,
    },
    passwordChangedAt: {
      // unselect
      type: Date,
    },
    passwordResetToken: {
      // unselect
      type: String,
    },
    passwordResetExpires: {
      // unselect
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      // unselect
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otp_expiry_time: {
      type: Date,
    },
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    socket_id: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Online", "Offline"],
    },
    userType: {
      type: String,
      enum: ["admin", "patient", "therapist"],
      default: null,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  // Only run this function if otp was actually modified
  if (!this.isModified("otp") || !this.otp) return next();

  // Hash the otp with cost of 12
  this.otp = await bcrypt.hash(this.otp.toString(), 12);

  console.log(this.otp.toString(), "FROM PRE SAVE HOOK");

  next();
});

// UserSchema.pre("save", async function (next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified("password") || !this.password) return next();

//   // Hash the password with cost of salt
//   const salt = bcrypt.genSaltSync(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   //! Shift it to next hook // this.passwordChangedAt = Date.now() - 1000;

//   next();
// });

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", UserSchema);

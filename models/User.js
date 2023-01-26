let mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    username: {
      type: String,
      required: true,
      minLength: 3,
      default: null,
      trim: true,
      unique: true,
    },
    // isEmailVerified: { type: Boolean, default: false },
    // otp: { type: String, default: null },
    // otpExpires: { type: Date, default: null },
    // isOtpVerified: { type: Boolean, default: false },
    // resetPasswordToken: { type: String, default: null },

    role: {
      type: Number,
      default: 2, //  2- User
      enum: [
        1, // 1: Admin
        2, // 2: User
      ],
    },
    password: String,
  },
  { timestamps: true }
);
UserSchema.methods.setPassword = async function (password) {
	this.password = bcrypt.hashSync(password, 10)
};

module.exports = mongoose.model("User", UserSchema);

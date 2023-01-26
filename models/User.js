let mongoose = require("mongoose");


let UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			lowercase: true,
			required: true,
			trim: true,
			index: true,
			unique: true,
			sparse: true,
		},
		username: {
			type: String,
			required: true,
			minLength: 3,
			default: null,
			trim: true,
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
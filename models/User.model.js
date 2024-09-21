const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    rank: {
      type: Number,
      default: 1000
    },
    phoneNumber: {
      type: Number,
    },
    description: {
      type: String,
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

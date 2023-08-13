const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const dataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  url: String,
  title: String,
  price: String,
  description: String,
  reviewAndRatings: String,
  ratings: String,
  mediaCounts: Number,
});

const User = mongoose.model("User", userSchema);
const Data = mongoose.model("Data", dataSchema);

module.exports = {
  User,
  Data,
};

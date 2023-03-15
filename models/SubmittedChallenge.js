const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const SubmittedChallenge = new Schema({
  challenge: { type: mongoose.Types.ObjectId, ref: "Challenge" },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  github_url: { type: "String", required: true },
  site_url: { type: "String", required: true },
  description: { type: "String", required: true },
});

module.exports = mongoose.model("SubmittedChallenges", SubmittedChallenge);

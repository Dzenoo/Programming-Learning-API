const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmitSchema = new Schema({
  title: { type: String },
  github_url: { type: String },
  site_url: { type: String },
  description: { type: String },
  submitter: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("SubmitChallenge", SubmitSchema);

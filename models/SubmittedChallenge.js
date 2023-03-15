const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const SubmitSchema = new Schema({
  title: { type: String, required: true },
  github_url: { type: String, required: true },
  site_url: { type: String, required: true },
  description: { type: String, required: true },
  submitter: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("SubmitChallenge", SubmitSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmitSchema = new Schema(
  {
    title: { type: "String", required: true },
    github: { type: "String", required: true },
    site: { type: "String", required: true },
    description: { type: "String", required: true },
    submitter: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubmitChallenge", SubmitSchema);

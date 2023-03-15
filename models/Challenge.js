const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema(
  {
    image: { type: "String", required: "true" },
    title: { type: "String", required: "true" },
    description: { type: "String", required: "true" },
    difficulty: { type: "String", required: "true" },
    technologies: [{ type: "String", required: "true" }],
    xp: { type: "Number", required: "true" },
    acceptableFiles: [{ type: "String", required: "true" }],
    listOfSteps: [{ type: "String", required: "true" }],
    submissions: [
      { type: mongoose.Types.ObjectId, ref: "SubmittedChallenges" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);

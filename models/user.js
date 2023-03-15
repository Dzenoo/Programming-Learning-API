const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: "String", required: true },
  last_name: { type: "String", required: true },
  user_name: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
  number: { type: "Number", required: true },
  image: { type: "String", required: true },
  level: { type: "Number", required: true },
  challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  submittedChallenges: [
    { type: Schema.Types.ObjectId, ref: "SubmittedChallenges" },
  ],
});

module.exports = mongoose.model("User", UserSchema);

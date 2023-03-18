const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  number: { type: Number, required: true },
  image: { type: String, required: true },
  level: { type: Number, required: true },
  xp: { type: Number, required: true },
  achievements: [{ type: mongoose.Types.ObjectId, ref: "Achievement" }],
  challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  submittedChallenges: [
    { type: Schema.Types.ObjectId, required: true, ref: "SubmitChallenge" },
  ],
});

module.exports = mongoose.model("User", UserSchema);

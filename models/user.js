const { default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: Number, required: true },
  image: { type: String, required: true },
  level: { type: Number, required: true },
  challenges: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
  submittedChallenges: [
    [{ type: Schema.Types.ObjectId, required: true, ref: "SubmitChallenge" }],
  ],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AchievementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Achievement", AchievementSchema);

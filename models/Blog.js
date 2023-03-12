const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  image: { type: "String", required: true },
  title: { type: "String", required: true },
  date: { type: "Number", required: true },
  description: { type: "String", required: true },
  details: { type: "String", required: true },
});
module.exports = mongoose.model("Blog", BlogSchema);

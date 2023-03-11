const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/HttpError");
const UserRoutes = require("./routes/UserRoutes");
const ChallengeRoutes = require("./routes/ChallengeRoutes");

const PORT = 8000;
const app = express();
app.use(bodyParser.json());

app.use("/api/users", UserRoutes);
app.use("/api/challenges", ChallengeRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

mongoose
  .connect(
    "mongodb+srv://Dzenis:BZjS88NZKV9lV0et@cluster0.8suhkcc.mongodb.net/ProgrammingLearning?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

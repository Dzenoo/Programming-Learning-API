const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/HttpError");
const UserRoutes = require("./routes/UserRoutes");
const ChallengeRoutes = require("./routes/ChallengeRoutes");
const BlogRoutes = require("./routes/BlogRoutes");

const PORT = 8000;
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", UserRoutes);
app.use("/api/challenges", ChallengeRoutes);
app.use("/api/blog", BlogRoutes);

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

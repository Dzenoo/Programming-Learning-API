const { validationResult } = require("express-validator");
const Challenge = require("../models/Challenge");
const HttpError = require("../models/HttpError");

exports.CreateChallenge = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    title,
    description,
    difficulty,
    technologies,
    xp,
    acceptableFiles,
    listOfSteps,
  } = req.body;

  const createdChallenge = new Challenge({
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1678370732/Screenshot_36_b96qtg.png",
    title,
    description,
    difficulty,
    technologies,
    xp,
    acceptableFiles,
    listOfSteps,
  });

  try {
    await createdChallenge.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ ch: createdChallenge });
};

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
      "Creating challenge failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ ch: createdChallenge });
};

exports.DeleteChallenge = async (req, res, next) => {
  const challengeId = req.params.cid;

  let existingChallenge;
  try {
    existingChallenge = await Challenge.findByIdAndDelete(challengeId);
  } catch (err) {
    const error = new HttpError(
      "Deleting challenge failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Challenge Deleted" });
};

exports.GetChallenges = async (req, res, next) => {
  let challenges;

  try {
    challenges = await Challenge.find();
  } catch (err) {
    const error = new HttpError(
      "Could not find challenges, please try again.",
      500
    );
    return next(error);
  }

  res.json({
    challenges: challenges.map((challenge) =>
      challenge.toObject({ getters: true })
    ),
  });
};

exports.GetChallengeById = async (req, res, next) => {
  const chId = req.params.cid;

  let challenge;
  try {
    challenge = await Challenge.findById(chId);
  } catch (err) {
    const error = new HttpError(
      "Could not find challenge, please try again.",
      500
    );
    return next(error);
  }

  if (!challenge) {
    const error = new HttpError(
      "Could not find challenge for this id, please try again.",
      500
    );
    return next(error);
  }

  res.json({ challenge: challenge });
};

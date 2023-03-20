const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const HttpError = require("../models/HttpError");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { first_name, last_name, user_name, email, password, number } =
    req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Could not signup, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Users exist already", 422);
    return next(error);
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user, try again later", 500);
    return next(error);
  }

  const createdUser = new User({
    first_name,
    last_name,
    user_name,
    email,
    password: hashPassword,
    number,
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1678535834/Untitled_design_3_zbm2cx.png",
    level: 0,
    xp: 0,
    achievements: [],
    challenges: [],
    submittedChallenges: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signup failed", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      "stringshow",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Loggin in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in please check credentials.",
      500
    );
    return next(error);
  }

  if (!isPasswordValid) {
    const error = new HttpError(
      "Could not log you in please check credentials.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "stringshow",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Loggin in failes.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getProfile = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Could not find user, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User is not found.", 404);
    return next(error);
  }

  res.json({ user });
};

exports.GetUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Could not find users, please try again later.",
      500
    );
    return next(error);
  }

  res.status(200).json({ users });
};

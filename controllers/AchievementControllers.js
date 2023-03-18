const Achievement = require("../models/Achievement");
const User = require("../models/user");
const HttpError = require("../models/HttpError");

exports.CreateAchievement = async (req, res, next) => {
  const { name, description, image } = req.body;

  const createdAchievement = new Achievement({
    name,
    description,
    image,
  });

  try {
    await createdAchievement.save();
  } catch (err) {
    const error = new HttpError("Could not create achievement", 500);
    return next(error);
  }

  res.status(201).json("Achievement created");
};

exports.AddAchievement = async (req, res, next) => {
  const userId = req.params.uid;
  const achievementName = req.query.name;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Could not create achievement", 500);
    return next(error);
  }

  let achievement;
  try {
    achievement = await Achievement.findOne({ name: achievementName });
  } catch (err) {
    const error = new HttpError("Could not find achievement", 500);
    return next(error);
  }

  if (user.achievements.includes(achievement._id)) {
    const error = new HttpError("Achievement already added", 400);
    return next(error);
  }

  user.achievements.push(achievement._id);
  achievement.users.push(userId);
  await user.save();
  await achievement.save();
  res.status(201).json({ message: "Achievement added" });
};

exports.GetUserAchievements = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate("achievements");
  } catch (err) {
    const error = new HttpError("Could not find user", 404);
    return next(error);
  }

  res.json({
    achievements: user.achievements.map((a) => a.toObject({ getters: true })),
  });
};

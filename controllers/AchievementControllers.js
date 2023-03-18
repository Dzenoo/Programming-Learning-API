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

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Could not create achievement", 500);
    return next(error);
  }

  if (user.submittedChallenges.length === 1) {
    const firstTimeUserAchievemt = await Achievement.findOne({
      name: "First Time User",
    });
    if (firstTimeUserAchievemt) {
      user.achievements.push(firstTimeUserAchievemt._id);
      await user.save();
    }
  }
};

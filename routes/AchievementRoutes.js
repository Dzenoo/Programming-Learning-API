const express = require("express");
const AchievementControllers = require("../controllers/AchievementControllers");

const router = express.Router();

router.post("/", AchievementControllers.CreateAchievement);

router.post("/:uid/addAchievement", AchievementControllers.AddAchievement);

module.exports = router;

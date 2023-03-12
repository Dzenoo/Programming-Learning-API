const express = require("express");
const {
  CreateChallenge,
  DeleteChallenge,
  GetChallenges,
  GetChallengeById,
  startChallenge,
} = require("../controllers/ChallengeContollers");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/CheckAuth");
const router = express.Router();

router.get("/", GetChallenges);

router.get("/:cid", GetChallengeById);

router.use(checkAuth);

router.post("/:uId/:cId/start", startChallenge);

router.post(
  "/create",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("xp").not().isEmpty(),
    check("difficulty").not().isEmpty(),
  ],
  CreateChallenge
);

router.delete("/:cid", DeleteChallenge);

module.exports = router;

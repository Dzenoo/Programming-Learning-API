const express = require("express");
const {
  CreateChallenge,
  DeleteChallenge,
  GetChallenges,
  GetChallengeById,
} = require("../controllers/ChallengeContollers");
const { check } = require("express-validator");
const router = express.Router();

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

router.get("/", GetChallenges);

router.get("/:cid", GetChallengeById);

module.exports = router;

const express = require("express");
const { CreateChallenge } = require("../controllers/ChallengeContollers");
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

module.exports = router;

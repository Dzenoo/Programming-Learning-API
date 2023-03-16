const express = require("express");
const {
  CreateChallenge,
  DeleteChallenge,
  GetChallenges,
  getChallengeById,
  startChallenge,
  submitChallenge,
  GetSubmittedChallenges,
} = require("../controllers/ChallengeContollers");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/CheckAuth");
const router = express.Router();

router.get("/", GetChallenges);

router.get("/submittedChallenges", GetSubmittedChallenges);

router.get("/:cId", getChallengeById);

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

// router.use(checkAuth);

router.post("/submit", submitChallenge);

router.post("/:uId/:cId/start", startChallenge);

module.exports = router;

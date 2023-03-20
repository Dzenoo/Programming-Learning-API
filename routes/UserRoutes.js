const express = require("express");
const UserControllers = require("../controllers/UserControllers");
const { check } = require("express-validator");
const router = express.Router();

router.get("/:userId/profile", UserControllers.getProfile);

router.get("/", UserControllers.GetUsers);

router.post("/:uid/newComment", UserControllers.NewComment);

router.get("/getComments", UserControllers.GetComments);

router.post(
  "/signup",
  [
    check("first_name").not().isEmpty(),
    check("last_name").not().isEmpty(),
    check("user_name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("number").isLength({ min: 6 }),
  ],
  UserControllers.signup
);

router.post("/login", UserControllers.login);

module.exports = router;

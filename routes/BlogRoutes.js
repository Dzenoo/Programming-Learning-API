const express = require("express");
const { check } = require("express-validator");
const {
  NewBlog,
  DeleteBlog,
  GetBlogs,
  GetBlog,
} = require("../controllers/BlogControllers");

const router = express.Router();

router.post(
  "/new",
  [
    check("title").not().isEmpty(),
    check("date").not().isEmpty(),
    check("description").not().isEmpty(),
    check("details").not().isEmpty(),
  ],
  NewBlog
);

router.delete("/:bid", DeleteBlog);

router.get("/", GetBlogs);

router.get("/:bid", GetBlog);

module.exports = router;

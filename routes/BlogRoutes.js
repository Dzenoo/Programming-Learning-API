const express = require("express");
const {
  NewBlog,
  DeleteBlog,
  GetBlogs,
  GetBlog,
} = require("../controllers/BlogControllers");

const router = express.Router();

router.post("/new", NewBlog);

router.delete("/:bid", DeleteBlog);

router.get("/", GetBlogs);

router.get("/:bid", GetBlog);

module.exports = router;

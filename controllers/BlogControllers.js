const { validationResult } = require("express-validator");
const Blog = require("../models/Blog");
const HttpError = require("../models/HttpError");

exports.NewBlog = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs", 500);
    return next(error);
  }

  const { title, date, description, details, image } = req.body;

  const createdBlog = new Blog({
    image,
    title,
    date,
    description,
    details,
  });

  try {
    await createdBlog.save();
  } catch (err) {
    const error = new HttpError("Creating blog failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ blog: createdBlog });
};

exports.DeleteBlog = async (req, res, next) => {
  const blogId = req.params.bid;

  let deletedBlog;
  try {
    deletedBlog = await Blog.findByIdAndDelete(blogId);
  } catch (err) {
    const error = new HttpError("Deleting blog failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ deletedBlog: deletedBlog });
};

exports.GetBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    const error = new HttpError("Could not find blogs, please try again.", 500);
    return next(error);
  }

  res.json({ blogs: blogs.map((blog) => blog.toObject({ getters: true })) });
};

exports.GetBlog = async (req, res, next) => {
  const blogId = req.params.bid;

  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (err) {
    const error = new HttpError("Could not find blog, please try again.", 500);
    return next(error);
  }

  res.json({ blog });
};

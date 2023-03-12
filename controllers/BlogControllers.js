const Blog = require("../models/Blog");
const HttpError = require("../models/HttpError");

exports.NewBlog = async (req, res, next) => {
  const { title, date, description, details } = req.body;

  const createdBlog = new Blog({
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1676482330/Untitled_design_3_giwyy7.png",
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

exports.DeleteBlog = async (req, res, next) => {};

exports.GetBlogs = async (req, res, next) => {};

exports.GetBlog = async (req, res, next) => {};

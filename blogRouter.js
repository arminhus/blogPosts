const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { BlogPosts } = require("./model");
const jsonParser = bodyParser.json();

BlogPosts.create(
  "This is a my very first blog post whiles learning how to use Node and express."
);
BlogPosts.create(
  "This is a my second blog post whiles learning how to use Node and express."
);

router.get("/blog-posts", (req, res) => {
  res.json(BlogPosts.get());
});

module.exports = router;

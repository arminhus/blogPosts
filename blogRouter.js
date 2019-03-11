const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { BlogPosts } = require("./model");
const jsonParser = bodyParser.json();

BlogPosts.create(
  "First Node/Express Create",
  "This is a my very first blog post whiles learning how to use Node and express.",
  "Armin"
);
BlogPosts.create(
  "Second Node/Express Create",
  "This is a my second blog post whiles learning how to use Node and express.",
  "Armin"
);

router.get("/", (req, res) => {
  res.json(BlogPosts.get());
  //   res.send("hello");
});

router.post("/blog-posts", (req, res) => {
  const requiredFields = ["title", "content", "author"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author,
    req.body.publishDate
  );
  res.status(201).json(item);
});

router.put("/blog-posts/:id", jsonParser, (req, res) => {
  const requiredFields = ["name", "budget", "id"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${
      req.body.id
    }) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping list item \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

router.delete('/blog-posts/:id"', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;

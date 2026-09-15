const { Router } = require("express");
const { posts, comments, nanoid } = require("../data/store");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.get("/", (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json(posts);
  }

  const term = String(q).toLowerCase();
  const filtered = posts.filter((post) =>
    [post.title, post.author, post.description, post.content]
      .join(" ")
      .toLowerCase()
      .includes(term)
  );

  res.json(filtered);
});

router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post não encontrado." });
  }
  res.json(post);
});

router.post("/", requireAuth, (req, res) => {
  const { title, content, author, description } = req.body || {};

  if (!title || !content || !author) {
    return res.status(400).json({ message: "Título, conteúdo e autor são obrigatórios." });
  }

  const post = {
    id: nanoid(8),
    title,
    author,
    description: description || content.slice(0, 140),
    content,
    createdAt: new Date().toISOString(),
  };

  posts.unshift(post);
  res.status(201).json(post);
});

router.put("/:id", requireAuth, (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post não encontrado." });
  }

  const { title, content, author, description } = req.body || {};
  if (title) post.title = title;
  if (content) post.content = content;
  if (author) post.author = author;
  if (description) post.description = description;

  res.json(post);
});

router.delete("/:id", requireAuth, (req, res) => {
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Post não encontrado." });
  }

  posts.splice(index, 1);
  res.status(204).end();
});

router.get("/:id/comments", (req, res) => {
  res.json(comments.filter((c) => c.postId === req.params.id));
});

router.post("/:id/comments", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post não encontrado." });
  }

  const { author, text } = req.body || {};
  if (!author || !text) {
    return res.status(400).json({ message: "Nome e comentário são obrigatórios." });
  }

  const comment = {
    id: nanoid(8),
    postId: post.id,
    author,
    text,
    createdAt: new Date().toISOString(),
  };

  comments.push(comment);
  res.status(201).json(comment);
});

module.exports = router;

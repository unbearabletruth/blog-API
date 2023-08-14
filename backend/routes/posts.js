const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: 'all posts' })
});

router.get("/:id", (req, res) => {
    res.json({ message: 'single post' })
});

router.post("/", (req, res) => {
    res.json({ message: 'create post' })
});

router.patch("/:id", (req, res) => {
    res.json({ message: 'update post' })
});

router.delete("/:id", (req, res) => {
    res.json({ message: 'delete post' })
});

module.exports = router;
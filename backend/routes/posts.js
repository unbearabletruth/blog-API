const express = require('express');
const router = express.Router();
const { getPost, getPosts, createPost, updatePost, deletePost } = require('../controllers/post_controller');

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", createPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
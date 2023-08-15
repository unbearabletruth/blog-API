const express = require('express');
const router = express.Router({ mergeParams: true });
const { getComments, createComment } = require('../controllers/comment_controller');

router.get("/comments", getComments);

router.post("/comments", createComment);

module.exports = router;
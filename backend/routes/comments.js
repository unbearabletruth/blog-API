const express = require('express');
const router = express.Router({ mergeParams: true });
const { getComments, createComment, deleteComment, updateComment } = require('../controllers/comment_controller');

router.get("/comments", getComments);

router.post("/comments", createComment);

router.delete("/comments/:commentId", deleteComment);

router.patch("/comments/:commentId", updateComment);

module.exports = router;
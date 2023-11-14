const Comment = require("../models/comment");

exports.getComments = async (req, res) => {
    const comments = await Comment.find({post: req.params.id}).sort({timestamp: -1}).exec()
    res.status(200).json(comments)
};

exports.createComment = async (req, res) => {
    const newComment = new Comment({
        text: req.body.text,
        author: req.body.author,
        timestamp: new Date(),
        post: req.params.id
    })
    try{
        const comment = await newComment.save()
        res.status(200).json(comment)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

exports.deleteComment = async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.commentId)
    if (comment){
        return res.status(200).json(comment)
    }
    res.status(400).json({error: 'No such comment'})
}

exports.updateComment = async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, {
        ...req.body,
    }, { new: true })
    if (comment){
        return res.status(200).json(comment)
    }
    res.status(400).json({error: 'No such comment'})
}
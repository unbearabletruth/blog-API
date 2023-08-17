const Post = require("../models/post");

exports.getPosts = async (req, res) => {
    const posts = await Post.find().populate('author').sort({timestamp: -1}).exec()
    res.status(200).json(posts)
};

exports.getPost = async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('author').exec()
    if (post){
        return res.status(200).json(post)
    }
    res.status(400).json({error: 'No such post'})
};

exports.createPost = async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        timestamp: new Date(),
        is_published: false
    })
    try{
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, {
        ...req.body
    })
    if (post){
        return res.status(200).json(post)
    }
    res.status(400).json({error: 'No such post'})
}

exports.deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (post){
        return res.status(200).json(post)
    }
    res.status(400).json({error: 'No such post'})
}
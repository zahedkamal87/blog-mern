const { validationResult } = require('express-validator');

const Post = require('../models/Post');

// @desc    Get all users posts
// @route   GET /api/posts
// @access  Private
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add new post
// @route   POST /api/posts
// @access  Private
exports.addPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { header, body } = req.body;
  try {
    const newPost = new Post({
      header,
      body,
      user: req.user.id
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update Post
// @route   POST /api/posts?:id
// @access  Private
exports.updatePost = async (req, res) => {
  const { header, body } = req.body;
  //Build Post
  const postFields = {};
  if (header) postFields.header = header;
  if (body) postFields.body = body;
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: 'Post not found' });
    }
    //make sure user own post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: postFields
      },
      {
        new: true
      }
    );
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete Post
// @route   DELETE /api/posts?:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: 'Post not found' });
    }
    //make sure user own post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await Post.findByIdAndRemove(req.params.id);
    res.json({ message: 'Post Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

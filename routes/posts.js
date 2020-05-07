const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');

const Post = require('../models/Post');

// @route   GET /api/posts
// @desc    Get all users posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/posts
// @desc    Add new post
// @access  Private
router.post(
  '/',
  [
    auth,
    check('header', 'Please add a Header').not().isEmpty(),
    check('body', 'Please add a Body').not().isEmpty()
  ],
  async (req, res) => {
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
  }
);

// @route   POST /api/posts?:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
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
    //Nmake sure user own post
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
});

// @route   DELETE /api/posts?:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
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
});

module.exports = router;

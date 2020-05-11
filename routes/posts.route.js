const express = require('express');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const {
  getAllPosts,
  addPost,
  updatePost,
  deletePost
} = require('../controllers/posts.controller');

const router = express.Router();

router
  .route('/')
  .get(auth, getAllPosts)
  .post(
    [
      auth,
      check('header', 'Please add a Header').not().isEmpty(),
      check('body', 'Please add a Body').not().isEmpty()
    ],
    addPost
  );

router.route('/:id').put(auth, updatePost).delete(auth, deletePost);

module.exports = router;

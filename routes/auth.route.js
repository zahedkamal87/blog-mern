const express = require('express');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const {
  getLoggedInUser,
  authorizeUser
} = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/')
  .get(auth, getLoggedInUser)
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ],
    authorizeUser
  );

module.exports = router;

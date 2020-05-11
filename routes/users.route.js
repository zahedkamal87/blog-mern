const express = require('express');
const { check } = require('express-validator');
const { registerUser } = require('../controllers/users.controller');

const router = express.Router();

router
  .route('/')
  .post(
    [
      check('name', 'Please add name').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ],
    registerUser
  );

module.exports = router;

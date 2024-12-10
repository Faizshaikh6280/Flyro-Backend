const express = require('express');
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be atleast 3 characters long.'),

    body('fullname.lastname')
      .isLength({ min: 3 })
      .withMessage('Last name must be 3 characters long.'),

    body('email').isEmail().withMessage('Email is not valid.'),

    body('password').isLength({ min: 6 }).withMessage('Password is too short.'),
  ],
  userController.registerUser
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is not valid.'),
    body('password').isLength({ min: 6 }).withMessage('Password is too short.'),
  ],
  userController.loginUser
);

module.exports = router;

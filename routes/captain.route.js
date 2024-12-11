const express = require('express');
const captainController = require('../controllers/captain.controller');
const authController = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be atleast 3 characters long.'),

    body('email').isEmail().withMessage('Email is not valid.'),

    body('password').isLength({ min: 6 }).withMessage('Password is too short.'),

    body('vehicle.color')
      .isLength({ min: 3 })
      .withMessage('color length should be more than 3 characters long'),

    body('vehicle.type')
      .isIn(['motorcycle', 'car', 'auto'])
      .withMessage('Invalid vehicle type')
      .isLength({ min: 3 })
      .withMessage('type length should be more than 3 characters long'),

    body('vehicle.platno')
      .isLength({ min: 3 })
      .withMessage('Length of platno should be mpre than 3 characters long'),

    body('vehicle.capacity')
      .isInt({ min: 1 })
      .withMessage('Capacity should be more than 1'),
  ],
  captainController.registerCaptain
);

// router.post(
//   '/login',
//   [
//     body('email').isEmail().withMessage('Email is not valid.'),
//     body('password').isLength({ min: 6 }).withMessage('Password is too short.'),
//   ],
//   userController.loginUser
// );
// router.get('/profile', authController.authUser, userController.getUserProfile);
// router.get('/logout', authController.authUser, userController.logout);

module.exports = router;

const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    const existsinguser = await captainModel.findOne({ email: req.body.email });

    if (existsinguser)
      return res
        .status(400)
        .json({ error: 'Captain already exists with this email.' });

    const {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle,
    } = req.body;

    // hashing the password
    const hashedPassword = await captainModel.hashPassword(password);

    const user = await captainModel.create({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
      vehicle,
    });

    const token = user.getAuthToken();

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE_IN * 24 * 60 * 60 * 1000
      ), // valid for 24 hours from now if JWT_EXPIRE_IN is 1 day
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('token', token, cookieOptions);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// module.exports.loginCaptain = aysnc (req, res) => {};

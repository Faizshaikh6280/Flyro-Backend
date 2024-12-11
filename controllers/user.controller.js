const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklist.model');

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    const existsinguser = await userModel.findOne({ email: req.body.email });

    if (existsinguser)
      return res
        .status(400)
        .json({ error: 'User already exists with this email.' });

    const {
      fullname: { firstname, lastname },
      email,
      password,
    } = req.body;

    // hashing the password
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
    });

    const token = user.getAuthToken();

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE_IN * 24 * 60 * 60 * 1000
      ), // valid for 24 hours from now if expire in is 1 day
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

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user)
      return res.status(401).json({ error: 'Email or password is incorrect.' });

    const isValid = await user.compareMethod(password);

    if (!isValid)
      return res.status(401).json({ error: 'Email or password is incorrect.' });

    const token = user.getAuthToken();

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE_IN * 24 * 60 * 60 * 1000
      ), // valid for 24 hours from now if expire_in is 1 day
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('token', token, cookieOptions);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie('token');
    res.status(200).json({ message: 'User Logout Successfully!' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

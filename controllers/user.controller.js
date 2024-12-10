const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');

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

    console.log(user);

    const token = user.getAuthToken();

    delete user.password;

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

    console.log(isValid);

    if (!isValid)
      return res.status(401).json({ error: 'Email or password is incorrect.' });

    const token = user.getAuthToken();

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

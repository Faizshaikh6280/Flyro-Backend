const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, ' First name must be atleast 3 characters long.'],
    },
    lastname: {
      type: String,
      minlength: [3, 'Last name must be 3 characters long.'],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, 'Email must be atleast 5 characters long.'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, 'Password must be atleast 6 characters long.'],
  },
  socketId: String,
});

userSchema.methods.getAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.compareMethod = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
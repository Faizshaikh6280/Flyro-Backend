const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const captainSchema = new mongoose.Schema({
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
    unique: [true, 'User already already exists with this mail'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },

  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be atleast 6 characters long.'],
    select: false,
  },

  socketId: String,

  vehicle: {
    color: {
      type: String,
      required: true,
    },
    platno: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['motorcycle', 'car', 'auto'],
      required: true,
    },
  },

  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  },

  location: {
    lan: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
});

captainSchema.set('toJSON', {
  transform: (doc, ret, option) => {
    delete ret.password;
    return ret;
  },
});

captainSchema.methods.getAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Captain', captainSchema);

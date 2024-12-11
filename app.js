const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');

const express = require('express');
const connectToDb = require('./DB/db');
const userRouter = require('./routes/user.route');
const captainRouter = require('./routes/captain.route');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/captains', captainRouter);

module.exports = app;

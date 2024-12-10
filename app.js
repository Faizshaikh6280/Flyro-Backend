const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');

const express = require('express');
const connectToDb = require('./DB/db');
const userRouter = require('./routes/user.route');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use('/api/v1/users', userRouter);

module.exports = app;

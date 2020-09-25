require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const usersRouter = require("./user/user-router");
const itemsRouter = require("./item/item-router");
const authRouter = require("./auth/auth-router");


const morganSetting = process.env.NODE_ENV === 'production'
  ? 'tiny'
  : 'common';
// Middleware
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/items", itemsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.get('/', (req, res) => {
  res.send('TransActionary!')
});


app.use(function errorHandler(error, req, res, next) {
   let response;
   if (process.env.NODE_ENV === 'production') {
     response = { error: { message: 'server error' } };
   } else {
     console.error(error);
     response = { message: error.message, error };
   }
   res.status(500).json(response);
  });
 

module.exports = app
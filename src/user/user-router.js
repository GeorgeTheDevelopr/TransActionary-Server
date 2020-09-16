const express = require("express");
const UsersService = require("./user-service");

const { requireAuth } = require("../middleware/jwt-auth");

const usersRouter = express.Router();

const serializeUser = (users) => ({
  id: users.id,
  firstName: users.first_name,
  lastName: users.last_name,
  email: users.email,
  password: users.password
});

//GET ALL USERS
usersRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  UsersService.getAllUsers(knexInstance)
    .then((users) => {
      res.status(200).json(users.map(serializeUser));
    })
    .catch(next);
});

//GET USERS BY ID
usersRouter.route("/user").get(requireAuth, (req, res, next) => {
  res.json(req.user);
});

module.exports = usersRouter;

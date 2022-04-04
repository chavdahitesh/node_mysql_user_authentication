module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const { body } = require("express-validator");
  const router = require("express").Router();

  //register
  router.post(
    "/register",
    [
      body("name", "The name must be of minimum 3 characters length")
        .notEmpty()
        .escape()
        .trim()
        .isLength({ min: 3 }),
      body("email", "Invalid email address")
        .notEmpty()
        .escape()
        .trim()
        .isEmail(),
      body("password", "The Password must be of minimum 4 characters length")
        .notEmpty()
        .trim()
        .isLength({ min: 4 }),
    ],
    users.register
  );

  //login
  router.post(
    "/login",
    [
      body("email", "Invalid email address")
        .notEmpty()
        .escape()
        .trim()
        .isEmail(),
      body("password", "The Password must be of minimum 4 characters length")
        .notEmpty()
        .trim()
        .isLength({ min: 4 }),
    ],
    users.login
  );
  router.get("/getuser", users.getUser);
  //getuser
  app.use("/api/v1/user", router);
};

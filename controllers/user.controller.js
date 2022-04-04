const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conn = require("../config/dbconnection").promise();

/**
 * @method POST
 * @requrl localhost:3000/api/v1/user/register
 * @param {name:'',email:'',password:''}
 */
exports.register = async (req, res, next) => {
  console.log("req.body", req.body);
  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const [row] = await conn.execute(
      "SELECT `email` FROM `users` WHERE `email`=?",
      [req.body.email]
    );

    if (row.length > 0) {
      return res.status(201).json({
        message: "The e-mail already in use",
      });
    }

    const hashPass = await bcrypt.hash(req.body.password, 12);

    const [rows] = await conn.execute(
      "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
      [req.body.name, req.body.email, hashPass]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The user has been successfully registered.",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const [row] = await conn.execute("SELECT * FROM `users` WHERE `email`=?", [
      req.body.email,
    ]);
    if (row.length === 0) {
      return res.status(422).json({
        status: "fail",
        message: "Invalid email address",
      });
    }
    const passMatch = await bcrypt.compare(req.body.password, row[0].password);
    if (!passMatch) {
      return res.status(422).json({
        status: "fail",
        message: "Incorrect password",
      });
    }
    const theToken = jwt.sign({ id: row[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    return res.status(201).json({
      status: "success",
      message: "welcome! you are login successfully",
      data: [
        {
          token: theToken,
        },
      ],
    });
    1;
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(422).json({
        message: "Please provide the token",
      });
    }

    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, process.env.JWT_SECRET);

    const [row] = await conn.execute(
      "SELECT id,name,email FROM users WHERE id = ?",
      [decoded.id]
    );
    if (row.length > 0) {
      return res.json({
        user: row[0],
      });
    }

    res.json({
      message: "No user found",
    });
  } catch (error) {
    next(error);
  }
};

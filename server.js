const express = require("express");
const cors = require("cors");
require("dotenv").config({ override: true, multiline: true });
const app = express();
const bodyParser = require("body-parser");

//CORS setting
var corsOptions = {
  origin: ["*", "http://localhost:4200"],
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Handling Errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

// ROUTES
app.get("/", (req, res) => {
  res.json({ message: `Welcome to ${process.env.APP_TITLE} application ` });
});
require("./routes/user.routes")(app);
// set port, listen for requests
let PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* 
    this file will have all the application level configuration,
    as we go ahead we will keep on adding middlewares 
    and supporting libraries
*/

const express = require("express"); // import express
const app = express(); // initialise app with express

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Logger
app.use(logger("dev"));

// body parsers
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// import our routes
const patientRoutes = require("./Routes/PatientRoutes");
const logRoutes = require("./Routes/LogRoutes");
const appRoutes = require("./Routes/AppRoutes");

// middleware to use our routes
app.use("/", appRoutes);
app.use("/patient", patientRoutes);
app.use("/log", logRoutes);
app.use("/app", appRoutes);

// export the app
module.exports = app;

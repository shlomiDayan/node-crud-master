/*
    this file will have all the server configuration,
    DB Connection, port settings etc
*/

//Set up mongoose connection
var mongoose = require("mongoose");
//set up reference for the enviornment .env file
require("dotenv").config({ path: ".env" });

// Database connection
mongoose.connect(process.env.DATABASE_CLOUD, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`Database Connection Error → ${err.message}`);
});

// require app.js
const app = require("./app");

// patient schema model
require("./Models/Patient");

// start the server on port 3000
const server = app.listen(3000, () => {
  console.log(
    `Backend node.js Express running → PORT ${server.address().port}`
  );
});

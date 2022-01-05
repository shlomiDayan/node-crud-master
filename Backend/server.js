/*
    this file will have all the server configuration,
    DB Connection, port settings etc
*/


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/medicard';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`Database Connection Error → ${err.message}`);
});

require('dotenv').config({ path: '.env' });

// patient schema model
require('./Models/Patient');

// require app.js
const app = require('./app');

// start the server on port 3000
const server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
})
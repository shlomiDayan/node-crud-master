// imports to create a schema/model
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// create patient schema
const LogSchema = new mongoose.Schema({
  PatientId: {
    type: String,
  },
  PatientName: {
    type: String,
  },
  Created: {
    type: Date,
  },
});

module.exports = mongoose.model("log", LogSchema);

// imports to create a schema/model
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// create patient schema
const PaitentSchema = new mongoose.Schema({
  SocialID: {
    type: String,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  PassportID: {
    type: String,
  },
  status: {
    type: String,
  },
  Gender: {
    type: String,
  },
  BirthDate: {
    type: String,
  },
  AdresssLine: {
    type: String,
  },
  City: {
    type: String,
  },
  Country: {
    type: String,
  },
  PostalCode: {
    type: String,
  },
  Telephone: {
    type: String,
  },
  Email: {
    type: String,
  },
  RelativeContactName: {
    type: String,
  },
  RelativeTelephone: {
    type: String,
  },
  RelativeEmail: {
    type: String,
  },
  BloodType: {
    type: String,
  },
  BloodType: {
    type: String,
  },
  Medication: {
    type: String,
  },
  Medication: {
    type: String,
  },
  ActiveDisease: {
    type: String,
  },
  Allergy: {
    type: String,
  },
  OldDisease: {
    type: String,
  },
  immunization: {
    type: String,
  },
  Photo: {
    type: String,
  },
  DocURL: {
    type: String,
  },
  Notes: {
    type: String,
  },
  CreatedDate: {
    type: Date,
  },
  ModifiedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("patient", PaitentSchema);

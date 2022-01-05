const mongoose = require("mongoose");
const Patient = require("../Models/Patient");

// import and initiate the patients model to query the database
const PatientModel = mongoose.model("patient");

// function for base route on "/"
exports.baseRoute = async (req, res) => {
  res.send(
    "<style>body{background-color:black;}}</style><h1 style='color:lightgreen'>Backend Server Running :: node.js</h1>"
  );
};

// function to get patient on route "/getPatient"
exports.getPatients = async (req, res) => {
  const patient = await PatientModel.find();
  res.json(patient);
};

// function to create a patient
exports.createPatient = async (req, res) => {
  // we use mongodb's save functionality here
  await new Patient(req.body).save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
      res.status(200).json({
        message: "Patient Created",
        data,
      });
    }
  });
};

// function to get a single Paitent
exports.getSinglePatient = async (req, res) => {
  // get id from URL by using req.params
  let paitentID = req.params.id;
  // we use mongodb's findById() functionality here
  await PatientModel.findById({ _id: paitentID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      console.log(data);
      res.status(200).json({
        message: "Paitent found",
        data,
      });
    }
  });
};

// function to update a single Paitent
exports.updatePatient = async (req, res) => {
  // get a paitentID.
  let paitentID = req.params.id;

  // we will use findByIdAndUpdate function : findByIdAndUpdate(id, data, callback)
  await Patient.findByIdAndUpdate(
    { _id: paitentID },
    { $set: req.body },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong, please try again later.",
        });
      } else {
        res.status(200).json({
          message: "Patient Updated",
          data,
        });
      }
    }
  );
};

// function to delete a patient from the DB
exports.deletePatient = async (req, res) => {
  let patientID = req.params.id;
  // we use mongodb's deleteOne() functionality here
  await Patiens.deleteOne({ _id: patientID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      res.status(200).json({
        message: "Paitent Deleted",
      });
    }
  });
};

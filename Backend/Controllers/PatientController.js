const mongoose = require("mongoose");
const Patient = require("../Models/Patient");

// import and initiate the patients model to query the database
const PatientModel = mongoose.model("patient");

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
// function to get a single Paitent
exports.getPatientByEmail = async (req, res) => {
  // get id from URL by using req.params
  let paitentEmail = req.params.email;
  // we use mongodb's findById() functionality here
  await PatientModel.findOne({ Email: paitentEmail }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else if (data === null) {
      console.log(
        "🚀 ~ file: PatientController.js ~ line 63 ~ awaitPatientModel.findOne ~ data",
        data
      );

      res.status(404).json({
        message: "Paitent Not found",
      });
    } else {
      console.log(data);
      res.status(200).json({
        message: "Paitent found by email",
        data,
      });
    }
  });
};

// function to get a single Paitent
exports.searchPatient = async (req, res) => {
  // get id from URL by using req.params
  let searchParams = req.params.searchParams;
  // we use mongodb's findById() functionality here
  await PatientModel.find(
    {
      $or: [
        {
          FirstName: { $regex: ".*" + searchParams + ".*", $options: "i" },
        },
        {
          LastName: { $regex: ".*" + searchParams + ".*", $options: "i" },
        },
        {
          SocialID: { $regex: ".*" + searchParams + ".*", $options: "i" },
        },
      ],
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong, please try again later.",
        });
      } else if (data === null || data.length === 0) {
        res.status(404).json({
          message: "Paitent Not found",
        });
      } else {
        console.log(data);
        res.status(200).json({
          message: "Paitent found by email",
          data,
        });
      }
    }
  );
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

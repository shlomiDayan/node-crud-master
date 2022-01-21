const mongoose = require("mongoose");
const Log = require("../Models/Log");

// import and initiate the patients model to query the database
const LogModel = mongoose.model("log");

// // function to get patient on route "/getPatient"
// exports.getPatients = async (req, res) => {
//   const patient = await PatientModel.find();
//   res.json(patient);
// };

//insert log on Patient scan and get to patient (GetuserByID)
exports.logClientActivity = async (req, res) => {
  // we use mongodb's save functionality here
  let reqData = req.body;
  console.log(
    "🚀 ~ file: LogController.js ~ line 17 ~ exports.logClientActivity= ~ reqData",
    reqData
  );

  await new Log(reqData).save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
      res.status(200).json({
        message: "Log Created",
        data,
      });
    }
  });
};

// function to get a single Paitent
exports.getLogs = async (req, res) => {
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

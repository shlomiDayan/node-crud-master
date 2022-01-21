const express = require("express");
const router = express.Router();

// import the controller file for fcuntions
const logController = require("../Controllers/LogController");

// create
router.post("/logClientActivity", logController.logClientActivity);

// // read all
// router.get("/getPatients", logController.getPatients);

// // read one
// router.get("/getPatient/:id", patientController.getSinglePatient);

module.exports = router;

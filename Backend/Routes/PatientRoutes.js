const express = require("express");
const router = express.Router();

// import the controller file for fcuntions
const patientController = require("../Controllers/PatientController");

// create
router.post("/create", patientController.createPatient);

// read all
router.get("/getPatients", patientController.getPatients);

// read one
router.get("/getPatient/:id", patientController.getSinglePatient);

router.get("/getPatientByEmail/:email", patientController.getPatientByEmail);

router.get("/searchPatient/:searchParams", patientController.searchPatient);

// update
router.put("/patient/:id/update", patientController.updatePatient);

// delete
router.delete("/delete/:id", patientController.deletePatient);

module.exports = router;

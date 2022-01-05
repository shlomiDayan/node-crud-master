import axios from "axios";

const patientService = {
  getPatients: function () {
    console.log("fetch patients from backend using patientService");
    // we use axios to hit our api and get data
    return axios.get("http://localhost:3000/getPatients");
  },
  getPatientById: function (id) {
    debugger;
    console.log("fetch patient by ID from backend using patientService");
    // we use axios to hit our api and get data
    return axios.get("http://localhost:3000/getpatient/" + id);
  },
};

export default patientService;

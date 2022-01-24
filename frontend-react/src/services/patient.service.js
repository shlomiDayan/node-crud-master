import axios from "axios";

const serverBaseUrl = "http://localhost:3000/patient/";
const patientService = {
  getPatients: function () {
    console.log("fetch patients from backend using patientService");
    // we use axios to hit our api and get data
    return axios.get(serverBaseUrl + "getPatients");
  },
  getPatientById: function (id) {
    console.log("fetch patient by ID from backend using patientService");
    // we use axios to hit our api and get data
    return axios.get(serverBaseUrl + "getpatient/" + id);
  },
  getPatientByEmail: function (email) {
    console.log("🚀 ~ file: patient.service.js ~ line 16 ~ email", email);
    // we use axios to hit our api and get data
    return axios.get(serverBaseUrl + "getPatientByEmail/" + email, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });
  },
};

export default patientService;

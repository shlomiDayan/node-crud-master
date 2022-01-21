import axios from "axios";

const serverBaseUrl = "http://localhost:3000/log/";
const logService = {
  logClientActivity: function (client) {
    console.log("fetch patients from backend using patientService");
    // we use axios to hit our api and get data
    return axios.post(
      serverBaseUrl + "logClientActivity",
      {
        PatientId: "123123321123",
        PatientName: client.FirstName + client.LastName,
        Created: new Date(),
      },
      {
        headers: {
          // 'application/json' is the modern content-type for JSON, but some
          // older servers may use 'text/json'.
          // See: http://bit.ly/text-json
          "content-type": "application/json",
        },
      }
    );
  },
  getPatientById: function (id) {
    console.log("fetch patient by ID from backend using patientService");
    // we use axios to hit our api and get data
    return axios.get(serverBaseUrl + "getpatient/" + id);
  },
};

export default logService;

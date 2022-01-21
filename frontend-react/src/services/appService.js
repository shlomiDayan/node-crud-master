import axios from "axios";

const serverBaseUrl = "http://localhost:3000/app/";
const appService = {
  getConfiguration: function () {
    // we use axios to hit our api and get data
    return axios.get(serverBaseUrl + "getConfiguration");
  },
};

export default appService;

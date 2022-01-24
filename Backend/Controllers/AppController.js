//set up reference for the enviornment .env file
require("dotenv").config({ path: ".env" });

// function for base route on "/"
exports.baseRoute = async (req, res) => {
  res.send(
    "<style>body{background-color:black;}}</style><h1 style='color:lightgreen'>Backend Server Running :: node.js</h1>"
  );
};

// function to get patient on route "/getPatient"
exports.getConfiguration = async (req, res) => {
  res.json({
    frontendBaseUrl: process.env.BASE_FRONTEND_URL,
    serverBaseUrl: process.env.BASE_SERVER_URL,
  });
};

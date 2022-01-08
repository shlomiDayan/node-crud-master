//set up reference for the enviornment .env file
require("dotenv").config({ path: ".env" });

// function to get patient on route "/getPatient"
exports.getConfiguration = async (req, res) => {
  res.json({ frontendBaseUrl: process.env.BASE_FRONTEND_URL });
};

const express = require("express"); //import express

// 1.
const router = express.Router();
// 2.
const appController = require("../controllers/AppController");
// 3.
router.post("/app/getConfiguration", appController.getConfiguration);
// 4.
module.exports = router; // export to use in server.js

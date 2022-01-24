const express = require("express"); //import express
// 1.
const router = express.Router();
// 2.
const appController = require("../controllers/AppController");
// use
router.get("/", appController.baseRoute);
// 3.
router.get("/getConfiguration", appController.getConfiguration);
// 4.
module.exports = router; // export to use in server.js

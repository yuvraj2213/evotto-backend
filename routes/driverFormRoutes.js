const express = require("express");
const {
  servicingFormController,
} = require("../controllers/servicingFormController");
const { driverFormController } = require("../controllers/driverFormController");


const router = express.Router();

router.post(
  "/driverForm",
  driverFormController
);

module.exports = router;

const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
    bloodGroupDetailsController,
} = require("../controllers/analyticsController");

const router = express.Router();

//routes

//GET BLOOD DATA
router.get("/bloodGroups-data", authmiddleware, bloodGroupDetailsController);

module.exports = router;
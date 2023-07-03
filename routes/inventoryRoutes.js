const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
    createInventoryController,
    getInventoryController,
    getDonarsController,
    getHospitalController,
} = require("../controllers/inventoryController");



const router = express.Router();

// routes
// ADD INVENTORY || POST
router.post("/create-inventory", authmiddleware, createInventoryController)
router.get("/get-inventory", authmiddleware, getInventoryController)

//GET DONAR RECORDS
router.get("/get-donars", authmiddleware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authmiddleware, getHospitalController);

module.exports = router;
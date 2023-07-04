const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
    createInventoryController,
    getInventoryController,
    getDonarsController,
    getHospitalController,
    getDonarsForHospitalController,
    getInventoryHospitalController,
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

//GET DONAR RECORDS FOR HOSPITAL
router.get("/get-donars-for-hospital", authmiddleware, getDonarsForHospitalController);

//GET HOSPITAL BLOOD RECORDS
router.post("/get-inventory-hospital", authmiddleware, getInventoryHospitalController);

module.exports = router;
const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
    createInventoryController,
    getInventoryController,
    getDonarsController,
    getHospitalController,
    getDonarsForHospitalController,
    getInventoryHospitalController,
    getHospitalForDonarController,
    getRecentInventoryController,
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

//GET HOSPITAL RECORDS FOR DONAR
router.get("/get-hospitals-for-donar", authmiddleware, getHospitalForDonarController);

//GET RECENT BLOOD RECORDS
router.get("/get-recent-inventory", authmiddleware, getRecentInventoryController);

module.exports = router;
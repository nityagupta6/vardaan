const express=require("express");
const authmiddleware=require("../middlewares/authmiddleware");
const {
    createInventoryController,
    getInventoryController,
}=require("../controllers/inventoryController");



const router=express.Router();

// routes
// ADD INVENTORY || POST
router.post("/create-inventory",authmiddleware, createInventoryController)
router.get("/get-inventory",authmiddleware, getInventoryController)

module.exports=router;
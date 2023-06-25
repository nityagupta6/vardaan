const express=require("express");
const authmiddleware=require("../middlewares/authmiddleware");
const {
    createInventoryController,
}=require("../controllers/inventoryController");



const router=express.Router();

// routes
// ADD INVENTORY || POST
router.post("/create-inventory",authmiddleware, createInventoryController)

module.exports=router;
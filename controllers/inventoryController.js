const userModel = require("../models/userModel")
const inventoryModel = require("../models/inventoryModel")

//Create inventory
const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body
        //check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not registered")
        }
        // if(inventoryType==="in" && user.role!=="donar"){
        //     throw new Error("Not a donar account")
        // }
        if (inventoryType === "out" && user.role !== "hospital") {
            throw new Error("Not a hospital account")
        }
        //save record
        const inventory = new inventoryModel({
            inventoryType: req.body.inventoryType,
            bloodGroup: req.body.bloodGroup,
            quantity: req.body.quantity,
            email: req.body.email,
            hospital: req.body.hospital,
            donar: req.body.donar
        })
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: "New blood record added!",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in creating inventory",
            error,
        })
    }
}

//get inventory
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ admin: req.body.userID })
        return res.status(200).send({
            success: true,
            message: "Fetched all records successfully",
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in getting inventory list",
            error,
        })
    }
}

module.exports = { createInventoryController, getInventoryController }
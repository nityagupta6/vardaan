const mongoose = require("mongoose");
const userModel = require("../models/userModel")
const inventoryModel = require("../models/inventoryModel")

//Create inventory
const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body
        //check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not registered")
        }
        // if (inventoryType === "in" && user.role !== "donar") {
        //     throw new Error("Not a donar account")
        // }
        // if (inventoryType === "out" && user.role !== "hospital") {
        //     throw new Error("Not a hospital account")
        // }

        if (req.body.inventoryType == "out") {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const admin = new mongoose.Types.ObjectId(req.body.admin);
            //Calculate blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        admin: { $exists: true }, // admin is checked for existence using the $exists operator. This will match documents where the admin field exists, regardless of its value.
                        inventoryType: "in",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;

            //Calculate 'out' Blood Quantity
            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match: {
                        admin: { $exists: true },
                        inventoryType: "out",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            //'in' & 'out' calculation
            const availableQuantityOfBloodGroup = totalIn - totalOut;
            //Quantity validation
            if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ml of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }
            req.body.hospital = user?._id;
        } else {
            req.body.donar = user?._id;
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
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in creating inventory API",
            error,
        })
    }
}

//get inventory
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ admin: req.body.userId })
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

// GET DONAR RECORDS
const getDonarsController = async (req, res) => {
    try {
        const admin = req.body.userId;
        //find donars
        const donorId = await inventoryModel.distinct("donar", {
            admin,
            inventoryType: "in",
        });
        // console.log(donorId);
        const donars = await userModel.find({ _id: { $in: donorId } });

        return res.status(200).send({
            success: true,
            message: "Donar record fetched successfully",
            donars,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in donar records",
            error,
        });
    }
};

const getHospitalController = async (req, res) => {
    try {
        const admin = req.body.userId;
        //GET HOSPITAL ID
        const hospitalId = await inventoryModel.distinct("hospital", {
            admin,
            inventoryType: "out",
        });
        //FIND HOSPITAL
        const hospitals = await userModel.find({
            _id: { $in: hospitalId },
        });
        return res.status(200).send({
            success: true,
            message: "Hospitals data fetched successfully",
            hospitals,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get Hospital API",
            error,
        });
    }
};

// GET DONAR RECORDS FOR HOSPITAL
const getDonarsForHospitalController = async (req, res) => {
    try {
        // const hospital = req.body.userId;
        //find donars
        const donorId = await inventoryModel.distinct("donar", {
            // hospital,
            inventoryType: "in",
        });
        // console.log(donorId);
        const donars = await userModel.find({ _id: { $in: donorId } });

        return res.status(200).send({
            success: true,
            message: "Donar record for hospital fetched successfully",
            donars,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in donar records for hospital",
            error,
        });
    }
};

// GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find(req.body.filters)
            .populate("donar")
            .populate("hospital")
            // .populate("organisation")
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Get hospital consumer records successfully",
            inventory,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Get consumer Inventory",
            error,
        });
    }
};

const getHospitalForDonarController = async (req, res) => {
    try {
        // const admin = req.body.userId;
        //GET HOSPITAL ID
        const hospitalId = await inventoryModel.distinct("hospital", {
            // admin,
            inventoryType: "out",
        });
        //FIND HOSPITAL
        const hospitals = await userModel.find({
            _id: { $in: hospitalId },
        });
        return res.status(200).send({
            success: true,
            message: "Hospitals data for donars fetched successfully",
            hospitals,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in get Hospital for donars API",
            error,
        });
    }
};

module.exports = {
    createInventoryController,
    getInventoryController,
    getDonarsController,
    getHospitalController,
    getDonarsForHospitalController,
    getInventoryHospitalController,
    getHospitalForDonarController,
}
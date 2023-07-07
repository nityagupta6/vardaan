const inventoryModel = require("../models/inventoryModel");
//GET BLOOD DATA
const bloodGroupDetailsContoller = async (req, res) => {
    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
        const admin = req.body.userId;
        //get single blood group

        // Promise.all: this would help all the blood groups to run simultaneously, data will be fetched concurrently for all of them.
        await Promise.all(
            bloodGroups.map(async (bloodGroup) => {
                //Count TOTAL IN
                const totalIn = await inventoryModel.aggregate([
                    {
                        $match: {
                            bloodGroup: bloodGroup,
                            inventoryType: "in",
                            admin: admin,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$quantity" },
                        },
                    },
                ]);
                //Count TOTAL OUT
                const totalOut = await inventoryModel.aggregate([
                    {
                        $match: {
                            bloodGroup: bloodGroup,
                            inventoryType: "out",
                            admin: admin,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$quantity" },
                        },
                    },
                ]);
                //CALCULATE TOTAL
                const availabeBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

                //PUSH DATA
                bloodGroupData.push({
                    bloodGroup,
                    totalIn: totalIn[0]?.total || 0,
                    totalOut: totalOut[0]?.total || 0,
                    availabeBlood,
                });
            })
        );

        return res.status(200).send({
            success: true,
            message: "Blood group data fetched successfully",
            bloodGroupData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in bloodgroup data analytics API",
            error,
        });
    }
};

module.exports = { bloodGroupDetailsContoller };
const userModel=require("../models/userModel")
const inventoryModel=require("../models/inventoryModel")

//Create inventory
const createInventoryController=async(req,res)=>{
    try {
        const {email,inventoryType} = req.body
        //check if user exists
        const user= await userModel.findOne({email});
        if(!user){
            throw new Error("User not registered")
        }
        if(inventoryType==="in" && user.role!=="donar"){
            throw new Error("Not a donar account")
        }
        if(inventoryType==="out" && user.role!=="hospital"){
            throw new Error("Not a hospital account")
        }
        //save record
        const inventory=new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success:false,
            message:"New blood record added!",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in creating inventory",
            error,
        })
    }
}

module.exports={createInventoryController}
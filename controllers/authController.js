const bcrypt=require('bcryptjs');
const userModel = require('../models/userModel');

const registerController =async(req,res) => {
    try {
        
        // Validation
        const existingUser=await userModel.findOne({email: req.body.email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'User already exists',
            })
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(req.body.password,salt);
        req.body.password=hashPassword;

        //rest data
        const user= new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in register API',
            error,
        })
    }
}
module.exports ={registerController}
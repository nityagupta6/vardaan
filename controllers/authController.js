const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")


const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// login call back
const loginController = async (req,res)=>{
    try {
        //validity
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        //confirm password
        const check=await bcrypt.compare(req.body.password,user.password)
        if(!check){
            return res.status(500).send({
                success:false,
                message:"invalid credentials"
            })
        }
        //assigning token
        const token=await jwt.sign({userID:user._id},process.env.JWT_SECRET,{expiresIn:'90d'})
        return res.status(200).send({
            success:true,
            message:"logged in successfully!",
            token,
            user
        })
    } catch (error) {
        console.log("error")
        return res.status(500).send({
            success:false,
            message:"error",
            error
        })
    }
}


module.exports = { registerController, loginController}
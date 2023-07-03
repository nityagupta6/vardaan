const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

//register user
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
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
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

// login call back
const loginController = async (req, res) => {
  try {
    //validity
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      })
    }
    //confirm password
    const check = await bcrypt.compare(req.body.password, user.password)
    if (!check) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials"
      })
    }
    //assigning token
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      token,
      user
    })
  } catch (error) {
    console.log("error")
    return res.status(500).send({
      success: false,
      message: "error",
      error
    })
  }
}

//get current user
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId })
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error
    })
  }
}


module.exports = { registerController, loginController, currentUserController }
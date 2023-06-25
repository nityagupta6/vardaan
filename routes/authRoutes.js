const express = require("express")
const authMiddleware=require("../middlewares/authmiddleware")

const {registerController, loginController, currentUserController} = require("../controllers/authController")

const router = express.Router()

//routes
//REGISTER || POST
router.post("/register", registerController)

// Login || POST
router.post("/login", loginController)

// current-use|| GET
router.get("/current-user", authMiddleware, currentUserController)

module.exports = router;
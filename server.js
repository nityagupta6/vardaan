const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')

//dot config
dotenv.config()


//mongodb connection
connectDB()

//rest object
const app = express()

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// routes
// test route- 1
app.use("/api/v1/test", require("./routes/testRoutes"))
// register route
app.use("/api/v1/auth", require("./routes/authRoutes"))
// inventory route
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"))
// analytics route
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"))


// port
const PORT = process.env.PORT || 8080


// listen
app.listen(PORT, () => {
    console.log(`node server running in ${process.env.DEV_MODE} ModeOn port ${process.env.PORT}`.bgBlue.white);
})


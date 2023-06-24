//controller
const testController = (req,res) => {
    res.status(200).send({
        message: "welcome user",
        success: true,
    })
}

//export
module.exports = {testController}
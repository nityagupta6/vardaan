const JWT=require("jsonwebtoken")

module.exports =async(req,res,next)=>{
    try {
        //extract token from header
        const token=req.header("Authorization").split(" ")[1]
        //verify token validity
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:"Auth Failed",
                })
            }
            else{
                req.body.userID=decode.userID 
                next()
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            error,
            message:"Auth Failed"
        })
    }
}

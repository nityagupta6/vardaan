const JWT=require("jsonwebtoken")

modules.exports=async(req,res,next)=>{
    try {
        //extract token from header
        const token=req.headers["authorization"].split(" ")[1]
        //verify token validity
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:"Auth Failed",
                    error
                })
            }
            else{
                req.body.userId=decode.id 
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
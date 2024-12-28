const adminMiddleware=async(req,res,next)=>{
    try{
        const adminRole=req.user.isAdmin;

        if(!adminRole)
           return res.status(403).send('Access Denied, User is not admin')

        next()
    }catch(e){
        next(e)
    }
}

module.exports=adminMiddleware;
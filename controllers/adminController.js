const User=require('../models/user-model')

const userDetails=async(req,res)=>{
    try{
        const response=await User.find({},{password:0})

        if(!response){
            res.status(400).send("Can't fetch the details")
        }

        res.status(200).send(response)


    }catch(e){
        console.log(e)
    }
}

module.exports=userDetails
const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    unique:true
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (e) {
    next(e);
  }
});

userSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            name:this.name,
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"7d"
        }
    )
    }catch(e){
        console.log(error);
    }
}

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}

const User = new mongoose.model("users", userSchema);

module.exports = User;

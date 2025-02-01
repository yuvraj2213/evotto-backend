const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  companyName: {
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

vendorSchema.methods.generateToken=async function(){
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

vendorSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}



vendorSchema.methods.generatePasswordResetToken = function () {
  const token = jwt.sign(
    { userId: this._id.toString() },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" } // Token valid for 1 hour
  );

  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
  return token;
};


const Vendor = new mongoose.model("vendors", vendorSchema);

module.exports = Vendor;

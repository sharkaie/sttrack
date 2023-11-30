const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,        
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid');
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:4,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    created_at:{
        type:Date,
        default:Date.now
    }
})

// Generating Token
userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        // console.log(token);
        this.tokens = this.tokens.concat({token});
        return token;
    }catch(error) {
        
    }
}

userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);        
        next();
    }

})

const User = new mongoose.model("User", userSchema);     

module.exports = User
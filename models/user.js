import mongoose from "mongoose";


const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        required:true,
        type:String
    },
    con:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

const User = mongoose.model('User', user);

export default User;
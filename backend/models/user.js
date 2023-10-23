const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        default:null,
    },
    lastname:{
        type: String,
        default:null,
    },
    regNo:{
        type: String,
        default:null,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    token:{
        type:String,
    },
    password:{
        type:String,
    },
    avatar:{
        type:String,
        default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
    }
})

//exports user(converts everything to lowercase and adds s ).
module.exports =mongoose.model('user',userSchema);

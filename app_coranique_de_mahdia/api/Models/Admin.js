const mongoose = require('mongoose'); 
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');
var adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    
    email:{
        type:String,
        required:true,
        // validate:[isEmail],
        lowercase:true,
        unique:true,
        trim: true
    },
    mobile:{
        type:String,
        required:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        max:1024,
        minlength:6
    },
    // picture:{
    //     type:String,
    //     required:true,
    //     default:" ./uploads/profil/user.png"

    // },
    
     role: {
            type: String,
            default: 'Admin',
           },
    //   placeName: {
    //          type: String,
    //         unique: true,
    //         required: true
    //     }
},

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Admin', adminSchema);
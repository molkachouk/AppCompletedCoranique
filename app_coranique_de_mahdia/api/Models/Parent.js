const mongoose = require('mongoose'); 

var parentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    namefrench:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    prename:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    prenamefrench:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim: true
    },
    telephone:{
        type:Number,
        trim: true
    },
    mobile:{
        type:Number,
        required:true,
        trim: true
    },
    address:{
        type:String,
        required:true,
        trim: true
    },
    CIN:{
        type:Number,
        required:true,
        trim: true,
        unique:true,
        minlength:8
    },
    password:{
        type:String,
        required:true,
        max:1024,
        minlength:6
    },
    parent_image: {
        type: String,
        unique: true,

       
      },
    // picture:{
    //     type:String,
    //     required:true,
    //     default:" ./uploads/profil/user.png"

    // },
    
     role: {
            type: String,
            default: 'Parent',
           },
 

},

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Parent', parentSchema);
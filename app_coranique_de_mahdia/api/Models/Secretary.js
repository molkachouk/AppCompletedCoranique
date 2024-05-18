const mongoose = require('mongoose'); 

var secretarySchema = new mongoose.Schema({
    name:{
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
 
    password:{
        type:String,
        required:true,
        max:1024,
        minlength:6
    },
    image: {
        type: "String",
        required: true,
       
      },
  
    //   year:{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref: 'Year',
    //     required: true,
    //  },
  
     role: {
            type: String,
            default: 'Secretary',
           }
},

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Secretary', secretarySchema);
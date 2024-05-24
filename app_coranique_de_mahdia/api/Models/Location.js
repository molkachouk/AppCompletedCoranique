const mongoose = require('mongoose'); 

var locationSchema = new mongoose.Schema({
    name_location:{
        type:String,
        required:true,
        trim: true
    },
   


    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Location', locationSchema);
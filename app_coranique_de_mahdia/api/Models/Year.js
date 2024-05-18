const mongoose = require('mongoose'); 

var yearSchema = new mongoose.Schema({
    yearName:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    
   startDate:{
    type:String,
        required:true,
        index:true,
        trim: true
    
   },
   endDate:{
    type:String,
        required:true,
        index:true,
        trim: true
   },
  

    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Year', yearSchema);
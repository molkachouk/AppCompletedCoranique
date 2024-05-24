const mongoose = require('mongoose'); 

var categorieSchema = new mongoose.Schema({
    name_categorie:{
        type:String,
        required:true,
        index:true,
        unique: true ,
        trim: true
    },
    description:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    image_categorie: {
        type: "String",
        required: true,
       
      },
    

    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Categorie', categorieSchema);
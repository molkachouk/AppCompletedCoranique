const mongoose = require('mongoose'); 

var categorieSchema = new mongoose.Schema({
    name_categorie:{
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

 
 


module.exports = mongoose.model('Categorie', categorieSchema);
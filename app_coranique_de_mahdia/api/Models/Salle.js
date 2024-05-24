const mongoose = require('mongoose'); 

var salleSchema = new mongoose.Schema({
    name_salle:{
        type:String,
        required:true,
        unique:true,
        index:true,
        trim: true,
    },
    numero_salle:{
        type:Number,
        required:true,
        unique:true,
        index:true,
        trim: true,
    },
    capacite:{
        type:Number,
        required:true,
        index:true,
        trim: true,
    },
    numero_etage:{
        type:Number,
        required:true,
        index:true,
        trim: true,
    },
    

    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Salle', salleSchema);
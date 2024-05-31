const mongoose = require('mongoose'); 

var EmploisSchema = new mongoose.Schema({

    emplois_title:{
        type:String,
        required:true,
        index:true,
    },
    numero_salle:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Salle",
            required: true,
            index: true
        
    },
    categorie:{
        type: mongoose.Schema.Types.ObjectId,
       ref: "Categorie",
       required: true,
       index: true
    },
    groupe: {
        type: mongoose.Schema.Types.ObjectId,
       ref: "Group", 
      required: true,
      index: true 
    },
    name_teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher", 
        required: true,
        index: true
   },
    
    start_time:{
        type:Date,
        required:true,
        index:true,



    },
    end_time:{
      type:Date,
      required:true,
      index:true,


    },
    date:{
        type:Date,
        required:true,
        index:true, 
    }




})
module.exports = mongoose.model('Emplois', EmploisSchema);



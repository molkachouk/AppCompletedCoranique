const mongoose = require('mongoose'); 

var examenSchema = new mongoose.Schema({
   NameExam:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    
   DateExam:{
    type:String,
        required:true,
        index:true,
        trim: true
    
   },
   heureDebut:{
    type:String,
        required:true,
        index:true,
        trim: true
   },
   heureFin:{
    type:String,
        required:true,
        index:true,
        trim: true
   },
   typeExam:{
    type:String,
        required:true,
        index:true,
        trim: true,
        enum : ['شفاهي','كتابي'],

   },
   matiereExam:{
    type:String,
        required:true,
        index:true,
        trim: true,
        enum : ['تجويد','تحفيظ'],
   },
   salleExam:{
    type:String,
        required:true,
        index:true,
        trim: true
   },
   groupe: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },

  

    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Examen', examenSchema);
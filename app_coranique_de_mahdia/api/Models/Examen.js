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
    /*date: {
        type: Date,
        required: [true, 'Provide Date'],
        index: { expires: '100d' },
    },*/
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
   matiereExam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
    required: true,
    index: true
},
   salleExam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salle",
    required: true,
    index: true
},
   groupe: {
     type: mongoose.Schema.Types.ObjectId,
    ref: "Group", 
   required: true,
   index: true },

   teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", 
    required: true,
    index: true
}],
period: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 8 // Limiting the maximum length to 8 characters

},

recite:{
    type:String,
    required: function() {
        return this.matiereExam === 'تجويد'; // Only required if matiereExam is 'تجويد'
    },
        index:true,
        trim: true
   }

  

    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Examen', examenSchema);
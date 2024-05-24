const mongoose = require('mongoose'); 

var teacherSchema = new mongoose.Schema({
    name_arabe:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    prenom_arabe:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    name_francais:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    prenom_francais:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    
    email:{
        type:String,
        lowercase:true,
        unique:true,
        trim: true
    },
    mobile_phone:{
        type:Number,
        required:true,
        trim: true,
        minlength: 8,
        maxlength: 8,
        unique:true
    },
    bitumen_phone:{
        type:Number,
        required:true,
        trim: true,
        minlength: 8,
        maxlength: 8,
        unique:true
        
    },
    password:{
        type:String,
        required:true,
        max:1024,
        minlength:6
        
    },
    confirmPassword:{
        type:String,
        required:true,
    
    },
     image:{
        type:String,
        required:true,
      

     },
     adress:{
        type:String,
        required:true,
     },
     date_birth:{
        type:Date,
        required:true,
     },
     place_birth:{
        type:String,
        required:true,
     },
     cin:{
        type:Number,
        required:true,
        unique:true,
        minlength: 8,
        maxlength: 8
    },
       

   
     licence:{
        type:String,
        required:true,
     },
     occupation:{
        type : String,
        required:true,
     },
     memorizing:{
          type:String,
          required:true,
     },

    
     role: {
            type: String,
          default:"Teacher"
           },

 type_etude:{
     type: String,
    enum : ['تجويد و تحفيظ','تجويد','تحفيظ'],
         }
},

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Teacher', teacherSchema);
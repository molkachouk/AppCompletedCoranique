const mongoose = require('mongoose'); 

var teacherSchema = new mongoose.Schema({
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
    mobile:{
        type:String,
        required:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        max:1024,
        minlength:6
    },
    // picture:{
    //     type:String,
    //     required:true,
    //     default:" ./uploads/profil/user.png"

    // },
    
     role: {
            type: String,
            default: 'Teacher',
           },

 type_etude:{
     type: String,
    enum : ['تجويد','تحفيظ'],
         }
},

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Teacher', teacherSchema);
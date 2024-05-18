const mongoose = require('mongoose'); 

var groupSchema = new mongoose.Schema({
    name_group:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Admin',
        required: true,
     },
     type_etude:{
        type: String,
        enum : ['تجويد','تحفيظ'],
},

    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Group', groupSchema);
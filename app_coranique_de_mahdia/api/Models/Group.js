const mongoose = require('mongoose'); 

var groupSchema = new mongoose.Schema({
    name_group:{
        type:String,
        required:true,
        index:true,
        trim: true
    },
    // place: {
    //     type: mongoose.Schema.Types.ObjectId,
    //      ref: 'Admin',
    //     required: true,
    //  },
    name_categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Categorie',
        required: true,
},



    },
 

    {
        timestamps: true,
      }


);

 
 


module.exports = mongoose.model('Group', groupSchema);
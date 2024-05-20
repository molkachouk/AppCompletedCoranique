const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
var studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    prename: {
        type: String,
        required: true,
        trim: true
    },
    date_birth: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    place_birth: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    study_level: {

        type: String,
        required: true,
        index: true,
        trim: true
    },
    establishment: {

        type: String,
        required: true,
        index: true,
        trim: true
    },
   email: {
        type: String,
        required: true,
        // validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
    },

    // },
    
    father_CIN: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: function() {
            // Check if the student is under 18 years old
            const age = calculateAge(this.date_birth); // Assuming you have a function to calculate age
            return age < 18;
        },

        validate: {
            validator: async function(value) {
                // Validate if the parent exists
                const parent = await mongoose.model('Parent').findById(value);
                return !!parent;
            },
            message: 'Invalid parent ID'
        }
    },

    CIN_student: {
        type: String,
        required: function() {
            // Check if the student is 18 years old or older
            const age = calculateAge(this.date_birth);
            return age >= 18;
        },
        unique: true,
        trim: true,
        maxlength: 8 // Limiting the maximum length to 8 characters

    },



   
    gender: {
        type: String,
        required: true,
        enum : ['أنثى','ذكر'],
    },

    name_group: {
    type: mongoose.Schema.Types.ObjectId,
     ref:'Group',
     required: true,
   
    },
    memo_level: {
        type: Number,
        required: true,
        min: 1,
        max: 60
    },
    units:{
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    stud_image: {
        type: String,
        required: true,
        unique: true,

       
      },



    

    
    role:{
        type:String,
        default:'Student',
    },
    
   

},
    {
        timestamps: true,
    }


);

function calculateAge(dateOfBirth) {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

module.exports = mongoose.model('Student', studentSchema);
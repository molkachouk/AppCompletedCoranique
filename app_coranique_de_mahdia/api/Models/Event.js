const mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
    title_event: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    name_event: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    description_event: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    location_event: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    date_event: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    time_event: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    images: {
        type: "String",
        required: true,
       
      },
    




},

    {
        timestamps: true,
    }


);





module.exports = mongoose.model('Event', eventSchema);
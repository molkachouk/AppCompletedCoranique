const Event = require('../Models/Event');

const AddEvent = async (req, res) => {
    console.log('event add:', req.body);
    console.log(' event file request', req.file);
    let image_filename = `${req.file.filename}`;
    try {
        const event = new Event({
            ...req.body,
            images:image_filename,
        });

        

        // Check if an event with the same name and location exists on the same date
        const existingEventByNameAndLocation = await Event.findOne({
            date_event: req.body.date_event,
            name_event: req.body.name_event,
            location_event: req.body.location_event
        });
        if (existingEventByNameAndLocation) {
            return res.status(400).json({ message: 'An event with the same name and location already exists on the same date.' });
        }
       

        // If all conditions are met, save the event
        const result = await event.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getEvents = async (req, res) => {
    try {
        let events;
        if (req.query.title) {
            // Fetch events by name if name query parameter is provided
            events = await Event.find({ title_event: req.query.title });
        } else {
            // Fetch all events if no name query parameter is provided
            events = await Event.find();
        }
        
        if (events.length > 0) {
            // Modify the events data before sending the response
            let modifiedEvents = events.map((event) => {
                return { ...event._doc };
            });
            res.send(modifiedEvents);
        } else {
            res.send({ message: "No events found" });
        }
    } catch (err) {
        console.error("Error:", err); 
        res.status(500).json(err);
    }
};
const getEventDetail = async (req, res) => {
    console.log("event"); 
    try {
        let event = await Event.findById(req.params.id)
       
           
        if (event) {
            res.send(event);
           
        }
        else {
            res.send({ message: "No secretary found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getEventBydate = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Adjust endDate to include the entire day by setting it to the next day
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const events = await Event.find({
            date_event: {
                $gte: new Date(startDate),
                $lt: adjustedEndDate
            }
        });
        if (events.length > 0) {
            // Modify the events data before sending the response
            let modifiedEvents = events.map((event) => {
                return { ...event._doc };
            });
            res.send(modifiedEvents);
        } else {
            res.send({ message: "No events found on the specified date" });
        }
    } catch (err) {
        console.error("Error:", err); 
        res.status(500).json(err);
    }
};
const deleteEvent = async (req, res) => {
    try {
        const result = await Event.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const updateEvent = async (req, res) => {
    console.log('Event update Request:', req.body);
    
    console.log('Event  File:', req.file);
    let image_filename = `${req.file.filename}`;
    try {
        
        
        const result = await Event.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ...req.body,
                    images: image_filename,
                },
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json({
            message: 'Event updated successfully',
            data: {
                event: result,
            },
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = {
    AddEvent,
    getEvents,
    getEventBydate,
    deleteEvent,
    updateEvent,
    getEventDetail
    
   
};
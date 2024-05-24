const Location = require('../Models/Location')


const locationCreate = async (req, res) =>{
    try{
        const location = new Location({
            ...req.body,
          

        });

        const existingLocationByName = await Location.findOne({
            name_location: req.body.name_location,
          


        });
        if (existingLocationByName) {
            res.send({ message: 'Sorry this group name already exists' });
        }
        else {
            const result = await location.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
    
};
const locationList = async (req, res) => {
    try {
        let locations = await Location.find()
        if (locations.length > 0) {
            res.send(locations)
        } else {
            res.send({ message: "No locations found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const getLocationDetail = async (req, res) => {
    try {
        let location = await Location.findById(req.params.id);
        if (location) {
          
            res.send(location);
        }
        else {
            res.send({ message: "No location found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}



const deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.send({ message: "Location not found" });
        }
        const deletedStudents = await Student.deleteMany({ name_group: req.params.id });
        // const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });
        // const deletedTeachers = await Teacher.deleteMany({ teachSclass: req.params.id });
        res.send(deletedLocation);
    } catch (error) {
        res.status(500).json(error);
    }
}


const updateLocation = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Location.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = { locationCreate, locationList, deleteLocation,  getLocationDetail,updateLocation  };
const Emplois=require('../Models/Emplois');
const Teacher = require('../Models/Teacher'); // Adjust the path as necessary
const Salle = require('../Models/Salle'); // Adjust the path as necessary
const Group=require('../Models/Group');
const Categorie = require('../Models/Categorie'); // Adjust the path as necessary


const AddSeance = async (req, res) => {
    console.log('Seance add Request:', req.body);
    try {
        const { emplois_title, numero_salle, name_teacher, start_time, end_time, date, groupe, categorie } = req.body;

        // Find the Categorie by _id
        const categoryDoc = await Categorie.findById(categorie);
        if (!categoryDoc) {
            console.error('Categorie not found:', categorie);
            return res.status(404).send({ error: 'Categorie not found' });
        }

        // Find the Group by _id and ensure it is associated with the found Categorie
        const groupDoc = await Group.findById(groupe);
        if (!groupDoc) {
            console.error('Group not found:', groupe);
            return res.status(404).send({ error: 'Group not found' });
        }

        // Ensure the group is associated with the correct category
        if (groupDoc.name_categorie.toString() !== categorie) {
            console.error('Group is not associated with the specified category:', groupDoc);
            return res.status(404).send({ error: 'Group is not associated with the specified category' });
        }
        console.log('Group Document:', groupDoc);
        console.log('Category Document:', categoryDoc);

        const startTimeDate = new Date(start_time);
        const endTimeDate = new Date(end_time);
        const dateOnly = new Date(date);

        // Validate start_time and end_time
        if (startTimeDate >= endTimeDate) {
            return res.status(400).json({
                status: false,
                message: "Start time must be before end time"
            });
        }

        // Check for existing seance with the same date, start_time, and numero_salle
        const conflictingSeance = await Emplois.findOne({
            date: dateOnly,
            start_time: startTimeDate,
            numero_salle: numero_salle
        });

        if (conflictingSeance) {
            return res.status(400).send({ message: "A seance with the same date, start time, and salle number already exists" });
        }

        // Check for existing seance with the same date and start_time, but different salle number
        const seanceWithSameDateAndTime = await Emplois.findOne({
            date: dateOnly,
            start_time: startTimeDate
        });

        if (seanceWithSameDateAndTime && seanceWithSameDateAndTime.numero_salle.toString() === numero_salle.toString()) {
            return res.status(400).send({ message: "A seance with the same date and start time already exists in the same salle" });
        }

        // Create new seance
        const newSeance = new Emplois({
            emplois_title,
            numero_salle,
            name_teacher,
            start_time: startTimeDate,
            end_time: endTimeDate,
            date: dateOnly,
            categorie,
            groupe
        });

        await newSeance.save();

        const salle = await Salle.findById(numero_salle);
        if (!salle) {
            console.error('Salle not found:', numero_salle);
            return res.status(404).send({ error: 'Salle not found' });
        }

        const teacherDoc = await Teacher.findById(name_teacher);
        if (!teacherDoc) {
            console.error('Teacher not found:', name_teacher);
            return res.status(404).send({ error: 'Teacher not found' });
        }

        res.status(201).json({
            status: true,
            message: 'Seance created successfully.',
            data: {
                seance: {
                    emplois_title: newSeance.emplois_title,
                    date: dateOnly.toISOString().split('T')[0], // Ensure only the date part is included
                    start_time: newSeance.start_time.toISOString(),
                    end_time: newSeance.end_time.toISOString(),
                    numero_salle: {
                        _id: salle._id,
                        name: salle.name_salle // assuming salle has a name field
                    },
                    name_teacher: {
                        _id: teacherDoc._id,
                        name: teacherDoc.name_francais // assuming teacher has a name_francais field
                    },
                    categorie: {
                        _id: categoryDoc._id,
                        name_categorie: categoryDoc.name_categorie
                    },
                    groupe: {
                        _id: groupDoc._id,
                        name_group: groupDoc.name_group
                    }
                }
            }
        });
    } catch (error) {
        console.error('Seance add Error:', error);
        res.status(400).json({
            status: false,
            message: 'An error occurred',
            error: error.message
        });
    }
}




const updateSeance = async (req, res) => {
    console.log('Seance update Request:', req.body);
    try {
        const { id } = req.params;
        const { emplois_title, numero_salle, name_teacher, start_time, end_time, date , categorie, groupe } = req.body;

        const startTimeDate = new Date(start_time);
        const endTimeDate = new Date(end_time);
        const dateOnly = new Date(date);

        // Validate start_time and end_time
        if (startTimeDate >= endTimeDate) {
            return res.status(400).json({
                status: false,
                message: "Start time must be before end time"
            });
        }

         // Find the Categorie by ID
         // Find the Categorie by _id
        const categoryDoc = await Categorie.findById(categorie);
        if (!categoryDoc) {
            console.error('Categorie not found:', categorie);
            return res.status(404).send({ error: 'Categorie not found' });
        }

        // Find the Group by _id and ensure it is associated with the found Categorie
        const groupDoc = await Group.findById(groupe);
        if (!groupDoc) {
            console.error('Group not found:', groupe);
            return res.status(404).send({ error: 'Group not found' });
        }

        // Ensure the group is associated with the correct category
        if (groupDoc.name_categorie.toString() !== categorie) {
            console.error('Group is not associated with the specified category:', groupDoc);
            return res.status(404).send({ error: 'Group is not associated with the specified category' });
        }
        console.log('Group Document:', groupDoc);
        console.log('Category Document:', categoryDoc);
        // Check for existing seance with the same date, start_time, and numero_salle
        const conflictingSeance = await Emplois.findOne({
            _id: { $ne: id },
            date: dateOnly,
            start_time: startTimeDate,
            numero_salle: numero_salle
        });

        if (conflictingSeance) {
            return res.status(400).send({ message: "A seance with the same date, start time, and salle number already exists" });
        }

        // Check for existing seance with the same date and start_time, but different salle number
        const seanceWithSameDateAndTime = await Emplois.findOne({
            _id: { $ne: id },
            date: dateOnly,
            start_time: startTimeDate
        });

        if (seanceWithSameDateAndTime && seanceWithSameDateAndTime.numero_salle.toString() === numero_salle.toString()) {
            return res.status(400).send({ message: "A seance with the same date and start time already exists in the same salle" });
        }

        // Update seance
        const updatedSeance = await Emplois.findByIdAndUpdate(
            id,
            {
                emplois_title,
                numero_salle,
                name_teacher,
                start_time: startTimeDate,
                end_time: endTimeDate,
                date: dateOnly,
                categorie,
                groupe
                
            },
            { new: true }
        );

        if (!updatedSeance) {
            return res.status(404).json({
                status: false,
                message: 'Seance not found'
            });
        }

        // Fetch related documents for response
        const salle = await Salle.findById(numero_salle);
        const teacherDoc = await Teacher.findById(name_teacher);

        res.status(200).json({
            status: true,
            message: 'Seance updated successfully.',
            data: {
                seance: {
                    emplois_title: updatedSeance.emplois_title,
                    date: updatedSeance.date.toISOString().split('T')[0], // Ensure only the date part is included
                    start_time: updatedSeance.start_time.toISOString(),
                    end_time: updatedSeance.end_time.toISOString(),
                    numero_salle: {
                        _id: salle._id,
                        name: salle.name_salle // assuming salle has a name field
                    },
                    name_teacher: {
                        _id: teacherDoc._id,
                        name: teacherDoc.name_francais // assuming teacher has a name_francais field
                    },
                    categorie: {
                        _id: categoryDoc._id,
                        name_categorie: categoryDoc.name_categorie
                    },
                    groupe: {
                        _id: groupDoc._id,
                        name_group: groupDoc.name_group
                    }
                }
            }
        });
    } catch (error) {
        console.error('Seance update Error:', error);
        res.status(400).json({
            status: false,
            message: 'An error occurred',
            error: error.message
        });
    }
};

const deleteSeance=async (req,res)=>{
    try {
        const emplois = await Emplois.findByIdAndDelete(req.params.id);

        if (!emplois) {
            return res.status(404).send();
        }

        res.send({
            message: 'seance deleted successfully',
            emplois: emplois
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
const getEmploisall=async (req,res)=>{
    try {
        const emplois = await Emplois.find().populate("numero_salle")
                                           .populate("categorie")
                                           .populate("groupe")
                                           .populate("name_teacher");

        res.send(emplois);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getEmploiDetail=async (req,res)=>{
    const _id = req.params.id;

    try {
        const emplois = await Emplois.findById(_id).populate("numero_salle")
                                                .populate("categorie")
                                                .populate("groupe")
                                                .populate("name_teacher");

        if (!emplois) {
            return res.status(404).send();
        }

        res.send(emplois);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getEmploisDetailByNameAndDate = async (req, res) => {
    const { emplois_title, date } = req.query;

    try {
        const emplois = await Emplois.findOne({ emplois_title: emplois_title, date: date });

        if (!emplois) {
            return res.status(404).send();
        }

        res.send(emplois);
    } catch (error) {
        res.status(500).send(error);
    }
};
const getEmploiByGroupId = async (req, res) => {
    const groupId = req.params.groupId;

    try {
        // Fetch exams for the group
        const emplois = await Emplois.find({ groupe: groupId })
            .populate("numero_salle")
            .populate("categorie")
            .populate("groupe")
            .populate("name_teacher");

        if (!emplois || emplois.length === 0) {
            return res.status(404).send({ error: 'No exams found for this group' });
        }

        res.send(emplois);
    } catch (error) {
        res.status(500).send(error);
    }
};










module.exports = {
    AddSeance,
    updateSeance,
    deleteSeance,
    getEmploisall,
    getEmploiDetail,
    getEmploisDetailByNameAndDate,
    getEmploiByGroupId,
};
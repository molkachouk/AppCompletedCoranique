const Categorie = require('../Models/Categorie'); // Adjust the path as necessary
const Salle = require('../Models/Salle'); // Adjust the path as necessary
const Teacher = require('../Models/Teacher'); // Adjust the path as necessary
const Examen = require('../Models/Examen');
const Group=require('../Models/Group');

const AddExamen = async (req, res) => {
    console.log('Examen add Request:', req.body);

    try {
        const { NameExam, DateExam, heureDebut, heureFin, typeExam, matiereExam, salleExamId, teachers, groupe } = req.body;

        // Find the Categorie by name_categorie
        const categorie = await Categorie.findOne({ name_categorie: matiereExam });
        if (!categorie) {
            return res.status(404).send({ error: 'Categorie not found' });
        }

        // Find the Group by name_group and ensure it is associated with the found Categorie
        const groupDoc = await Group.findOne({ name_group: groupe, name_categorie: categorie._id });
        if (!groupDoc) {
            return res.status(404).send({ error: 'Group with the specified category not found' });
        }

        // Find the Salle by its ID
        const salle = await Salle.findById(salleExamId);
        if (!salle) {
            return res.status(404).send({ error: 'Salle not found' });
        }

        // Find Teacher documents by their IDs
        const teacherDocs = await Teacher.find({ _id: { $in: teachers } });
        if (teacherDocs.length !== teachers.length) {
            return res.status(404).send({ error: 'One or more teachers not found' });
        }

        // Check if an exam with the same heureDebut already exists
        const existingExamen = await Examen.findOne({ DateExam, heureDebut });

        if (existingExamen) {
            // If an exam with the same heureDebut already exists, check if it has the same teachers, salle, and groupe
            const sameInfoExamen = await Examen.findOne({
                DateExam,
                heureDebut,
                teachers: { $all: teachers },
                salleExam: salle._id,
                groupe: groupDoc._id
            });

            if (sameInfoExamen) {
                // If an exam with the same information exists, return an error response
                return res.status(400).send({ error: 'An exam with the same information already exists.' });
            }
        }

        // Create the Examen document
        const examen = new Examen({
            NameExam,
            DateExam,
            heureDebut,
            heureFin,
            typeExam,
            matiereExam: categorie._id,
            salleExam: salle._id,
            teachers: teacherDocs.map(t => t._id),
            groupe: groupDoc._id
        });

        await examen.save();

        res.status(201).json({
            status: true,
            message: 'Examen created successfully.',
            data: {
                examen: {
                    NameExam: examen.NameExam,
                    DateExam: examen.DateExam,
                    heureDebut: examen.heureDebut,
                    heureFin: examen.heureFin,
                    typeExam: examen.typeExam,
                    matiereExam: {
                        _id: categorie._id,
                        name_categorie: categorie.name_categorie
                    },
                    salleExam: {
                        _id: salle._id,
                        name: salle.name_salle // assuming salle has a name field
                    },
                    teachers: teacherDocs.map(teacher => ({
                        _id: teacher._id,
                        name: teacher.name_francais // assuming teacher has a name field
                    })),
                    groupe: {
                        _id: groupDoc._id,
                        name_group: groupDoc.name_group
                    }
                }
            }
        });

    } catch (error) {
        console.error('Examen add Error:', error);
        res.status(400).send(error);
    }
};


const UpdateExamen = async (req, res) => {
    console.log('Examen update Request:', req.body);

    const updates = Object.keys(req.body);
    const allowedUpdates = ['NameExam', 'DateExam', 'heureDebut', 'heureFin', 'typeExam', 'matiereExam', 'salleExamId', 'teachers', 'groupe'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const { NameExam, DateExam, heureDebut, heureFin, typeExam, matiereExam, salleExamId, teachers, groupe } = req.body;

        // Find the existing examen
        const examen = await Examen.findById(req.params.id);
        if (!examen) {
            return res.status(404).send({ error: 'Examen not found' });
        }

        // Check if the matiereExam needs to be updated and find the Categorie by name_categorie
        let categorie = examen.matiereExam;
        if (updates.includes('matiereExam')) {
            categorie = await Categorie.findOne({ name_categorie: matiereExam });
            if (!categorie) {
                return res.status(404).send({ error: 'Categorie not found' });
            }
        }

        // Check if the group needs to be updated and find the Group by name_group
        let groupDoc = examen.groupe;
        if (updates.includes('groupe')) {
            groupDoc = await Group.findOne({ name_group: groupe, name_categorie: categorie._id });
            if (!groupDoc) {
                return res.status(404).send({ error: 'Group with the specified category not found' });
            }
        }

        // Check if the salle needs to be updated and find the Salle by its ID
        let salle = examen.salleExam;
        if (updates.includes('salleExamId')) {
            salle = await Salle.findById(salleExamId);
            if (!salle) {
                return res.status(404).send({ error: 'Salle not found' });
            }
        }

        // Check if the teachers need to be updated and find Teacher documents by their IDs
        let teacherDocs = examen.teachers;
        if (updates.includes('teachers')) {
            teacherDocs = await Teacher.find({ _id: { $in: teachers } });
            if (teacherDocs.length !== teachers.length) {
                return res.status(404).send({ error: 'One or more teachers not found' });
            }
        }

        // Check for conflicts if heureDebut is being updated or if salle, teachers, or group are being updated
        if (updates.includes('heureDebut') || updates.includes('salleExamId') || updates.includes('teachers') || updates.includes('groupe')) {
            const conflictExamen = await Examen.findOne({
                _id: { $ne: req.params.id }, // Exclude the current exam from the search
                DateExam: DateExam || examen.DateExam,
                heureDebut: heureDebut || examen.heureDebut,
                $or: [
                    { groupe: updates.includes('groupe') ? groupDoc._id : examen.groupe },
                    { salleExam: updates.includes('salleExamId') ? salle._id : examen.salleExam },
                    { teachers: { $in: updates.includes('teachers') ? teacherDocs.map(t => t._id) : examen.teachers } }
                ]
            });

            if (conflictExamen) {
                return res.status(400).send({ error: 'An exam with the same start time and conflicting group, salle, or teachers already exists.' });
            }
        }

        // Apply the updates
        updates.forEach((update) => {
            examen[update] = req.body[update];
        });

        if (updates.includes('matiereExam')) examen.matiereExam = categorie._id;
        if (updates.includes('salleExamId')) examen.salleExam = salle._id;
        if (updates.includes('groupe')) examen.groupe = groupDoc._id;
        if (updates.includes('teachers')) examen.teachers = teacherDocs.map(t => t._id);

        await examen.save();

        res.status(201).json({
            status: true,
            message: 'Examen created successfully.',
            data: {
                examen: {
                    NameExam: examen.NameExam,
                    DateExam: examen.DateExam,
                    heureDebut: examen.heureDebut,
                    heureFin: examen.heureFin,
                    typeExam: examen.typeExam,
                    matiereExam: {
                        _id: categorie._id,
                        name_categorie: categorie.name_categorie
                    },
                    salleExam: {
                        _id: salle._id,
                        name: salle.name_salle // assuming salle has a name field
                    },
                    teachers: teacherDocs.map(teacher => ({
                        _id: teacher._id,
                        name: teacher.name_francais // assuming teacher has a name field
                    })),
                    groupe: {
                        _id: groupDoc._id,
                        name_group: groupDoc.name_group
                    }
                }
            }
        });
    } catch (error) {
        console.error('Examen update Error:', error);
        res.status(400).send(error);
    }
};


const deleteExamen=async (req,res)=>{
    try {
        const examen = await Examen.findByIdAndDelete(req.params.id);

        if (!examen) {
            return res.status(404).send();
        }

        res.send({
            message: 'Exams deleted successfully',
            exams: exams
        });
    } catch (error) {
        res.status(500).send(error);
    }
}
const getExamenall=async (req,res)=>{
    try {
        const examens = await Examen.find().populate("matiereExam")
                                           .populate("salleExam")
                                           .populate("groupe")
                                           .populate("teachers");

        res.send(examens);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getExamenDetail=async (req,res)=>{
    const _id = req.params.id;

    try {
        const examen = await Examen.findById(_id).populate("matiereExam")
                                                    .populate("salleExam")
                                                    .populate("groupe")
                                                    .populate("teachers");

        if (!examen) {
            return res.status(404).send();
        }

        res.send(examen);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getExamenDetailByNameAndDate = async (req, res) => {
    const { name, date } = req.query;

    try {
        const examen = await Examen.findOne({ NameExam: name, DateExam: date });

        if (!examen) {
            return res.status(404).send();
        }

        res.send(examen);
    } catch (error) {
        res.status(500).send(error);
    }
};
const getExamenByGroupName = async (req, res) => {
    const groupName = req.params.groupName;

    try {
        // Find the group by name
        const group = await Group.findOne({ name_group: groupName });
        if (!group) {
            return res.status(404).send({ error: 'Group not found' });
        }

        // Fetch exams for the found group
        const exams = await Examen.find({ groupe: group._id })
                                  .populate("matiereExam")
                                  .populate("salleExam")
                                  .populate("groupe")
                                  .populate("teachers");

        if (!exams || exams.length === 0) {
            return res.status(404).send({ error: 'No exams found for this group' });
        }

        res.send(exams);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    AddExamen,
    UpdateExamen,
    deleteExamen,
    getExamenall,
    getExamenDetail,
    getExamenDetailByNameAndDate,
    getExamenByGroupName
};
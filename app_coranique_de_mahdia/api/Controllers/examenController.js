const Examen = require('../Models/Examen');
const Group=require('../Models/Group');

const AddExamen=async(req,res)=>{
    console.log('Examen add Request:', req.body);

    try {
        const { salleExam, NameExam, heureDebut, heureFin, matiereExam, typeExam } = req.body;

        // Check if an exam with the same criteria already exists
        const existingExamen = await Examen.findOne({ salleExam, NameExam, heureDebut, heureFin, matiereExam, typeExam });

        if (existingExamen) {
            // If an exam with the same criteria already exists, return an error response
            return res.status(400).send({ error: 'An exam with the same criteria already exists.' });vvv
        }

        const examen = new Examen(req.body);
        await examen.save();

        const groupe = await Group.findById(examen.groupe);
        console.log('Group Name:', groupe.name_group);
        examen.groupe = groupe;

        res.status(201).send(examen);
        
    } catch (error) {
        console.error('examen add Error:', error)
        res.status(400).send(error);
    }


}
const UpdateExamen=async (req,res)=>{
    console.log('Examen update Request:', req.body);

    const updates = Object.keys(req.body);
    const allowedUpdates = ['NameExam', 'DateExam', 'heureDebut', 'heureFin', 'typeExam', 'matiereExam', 'salleExam', 'groupe'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const examen = await Examen.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!examen) {
            return res.status(404).send();
        }

        res.send(examen);
    } catch (error) {
        res.status(400).send(error);
    }
}
const deleteExamen=async (req,res)=>{
    try {
        const examen = await Examen.findByIdAndDelete(req.params.id);

        if (!examen) {
            return res.status(404).send();
        }

        res.send(examen);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getExamenall=async (req,res)=>{
    try {
        const examens = await Examen.find();
        res.send(examens);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getExamenDetail=async (req,res)=>{
    const _id = req.params.id;

    try {
        const examen = await Examen.findById(_id);

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
module.exports = {
    AddExamen,
    UpdateExamen,
    deleteExamen,
    getExamenall,
    getExamenDetail,
    getExamenDetailByNameAndDate
};
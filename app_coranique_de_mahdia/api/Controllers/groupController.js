const Group = require('../Models/Group')
const Student = require('../Models/Student')

const groupCreate = async (req, res) =>{
    try{
        const group = new Group({
            name_group:req.body.name_group,
            name_categorie:req.params.id,
          

        });

        const existingGroupByName = await Group.findOne({
            name_group: req.body.name_group,
          


        });
        if (existingGroupByName) {
            res.send({ message: 'Sorry this group name already exists' });
        }
        else {
            const result = await group.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
    
};

const groupList = async (req, res) => {
    try {
        let groups = await Group.find({name_categorie:req.params.id}).populate("name_categorie");
        if (groups.length > 0) {
            res.send(groups)
        } else {
            res.send({ message: "No groups found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getGroupDetail = async (req, res) => {
    try {
        let group = await Group.findById(req.params.id);
        if (group) {
          
            res.send(group);
        }
        else {
            res.send({ message: "No group found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

 const getGroupStudents = async (req, res) => {
     try {
        let students = await Student.find({ name_group: req.params.id })
         if (students.length > 0) {
             let modifiedStudents = students.map((student) => {
                 return { ...student._doc, password: undefined };
             });
             res.send(modifiedStudents);
         } else {
            res.send({ message: "No students found" });
        }
     } catch (err) {
        res.status(500).json(err);
     }
 }

const deleteGroup = async (req, res) => {
    try {
        const deletedGroup = await Group.findByIdAndDelete(req.params.id);
        if (!deletedGroup) {
            return res.send({ message: "Group not found" });
        }
        const deletedStudents = await Student.deleteMany({ name_group: req.params.id });
        // const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });
        // const deletedTeachers = await Teacher.deleteMany({ teachSclass: req.params.id });
        res.send(deletedGroup);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteGroups = async (req, res) => {
    try {
        const deletedGroupes = await Group.deleteMany();
        if (deletedGroupes.deletedCount === 0) {
            return res.send({ message: "No groupes found to delete" });
        }
        const deletedStudents = await Student.deleteMany({ place: req.params.id });
        // const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
        // const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
        res.send(deletedGroupes);
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateGroup = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Group.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}




module.exports = { groupCreate, groupList, deleteGroup, deleteGroups, getGroupDetail, getGroupStudents,updateGroup  };
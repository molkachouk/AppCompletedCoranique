const Student = require('../Models/Student');

 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
const Parent = require('../Models/Parent');
 const maxAge = 3 * 24 * 60 * 60;;
 const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: maxAge
    })
  };
  const studentRegister = async (req, res) => {
    console.log('Secretary Register Request:', req.body);
    console.log('Secretary Register File:', req.file);
    let image_filename = `${req.file.filename}`;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingStudent = await Student.findOne({
            email: req.body.email,
        });

        if (existingStudent) {
            res.send({ message: 'Student already exists' });
        } else {
           
           let parent;
           if (req.body.father_CIN) {
               parent = await Parent.findOne({ CIN: req.body.father_CIN });
               if (!parent) {
                   return res.status(404).json({ message: 'Parent not found' });
               }
           }

            const student = new Student({
                ...req.body,
              //  father_CIN: parent._id, 
                name_group: req.body.name_group,
                stud_image: image_filename,
                password: hashedPass
            });
            if (req.body.father_CIN) {
                student.father_CIN = parent._id;
            }

            let result = await student.save();
            result.password = undefined;

            const token = createToken(result._id);

            return res.status(201).json({
                status: true,
                message: 'Student registered successfully.',
                data: {
                    student: result,
                    parent: parent,
                    token: token
                }
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const studentLogIn = async (req, res) => {
    try {
        const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
           
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("name_group");
           
                student.password = undefined;
            
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const getStudents = async (req, res) => {
    try {
        let students = await Student.find().populate("father_CIN")
        .populate("name_group");
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
};
const getStudentsByGroup = async (req, res) => {
    try {
        let students = await Student.find({name_group:req.params.id}).populate("father_CIN")
                                                                      .populate("name_group");
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
};

const getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id).populate("father_CIN")
                                                           .populate("name_group");
          
        if (student) {
            student.password = undefined;
            res.send(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany()
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}
const updateStudent = async (req, res) => {
    console.log('student update Request:', req.body);
    console.log('student update File:', req.file);
   let image_filename = req.file ? req.file.filename : undefined;
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let parent;
           if (req.body.father_CIN) {
               parent = await Parent.findOne({ CIN: req.body.father_CIN });
               if (!parent) {
                   return res.status(404).json({ message: 'Parent not found' });
               }
           }
           let updateFields = {};
           if (req.body.name) updateFields.name = req.body.name;
           if (req.body.prename) updateFields.prename = req.body.prename;
           if (req.body.date_birth) updateFields.date_birth = req.body.date_birth;
           if (req.body.place_birth) updateFields.place_birth = req.body.place_birth;
           if (req.body.study_level) updateFields.study_level = req.body.study_level;
           if (req.body.establishment) updateFields.establishment = req.body.establishment;
           if (req.body.email) updateFields.email = req.body.email;
           if (req.body.mobile) updateFields.mobile = req.body.mobile;
           if (req.body.name_group) updateFields.name_group = req.body.name_group;
           if (req.body.memo_level) updateFields.memo_level = req.body.memo_level;
           if (req.body.units) updateFields.units = req.body.units;
           if (req.body.stud_image) updateFields.stud_image = req.body.stud_image;
           if (req.body.gender) updateFields.gender = req.body.gender;
           if (parent) {
            updateFields.father_CIN = parent._id;
        } else {
            updateFields.father_CIN = null; // Set father's CIN to null if not provided
        }   
            if (image_filename) {updateFields.stud_image = image_filename;}

        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: updateFields},
            { new: true });
            result.password = undefined;
            return res.status(201).json({
                status: true,
                message: 'student update successfully.',
                data: {
                    student: result,
                    parent: parent,
                }
            });
    } catch (error) {
        res.status(500).json(error);
    }
}
const getStudentParent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            const parent = await Parent.findById({CIN: req.body.father_CIN});
            if (parent) {
                // Omitting password for security reasons
                parent.password = undefined;
                res.json(parent);
            } else {
                res.status(404).json({ message: "Parent not found" });
            }
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
    

module.exports = {studentRegister, studentLogIn,getStudents,deleteStudents,deleteStudent,getStudentsByGroup,updateStudent,getStudentDetail,getStudentParent}
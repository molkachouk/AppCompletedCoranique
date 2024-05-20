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

  const studentRegister = async (req, res) => {
    console.log('Secretary Register Request:', req.body);
    console.log('Secretary Register File:', req.file);
    let image_filename = req.file ? `${req.file.filename}` : null;

    try {
        // Check for existing student by email
        const existingStudent = await Student.findOne({ email: req.body.email });
        if (existingStudent) {
            return res.status(400).send({ message: 'Student already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Prepare the student data
        const studentData = {
            ...req.body,
            stud_image: image_filename,
            password: hashedPass
        };

        // Calculate the student's age
        const age = calculateAge(req.body.date_birth);

        // If the student is under 18, check for father_CIN and parent existence
        if (age < 18) {
            if (!req.body.father_CIN) {
                return res.status(400).json({ message: 'Father CIN is required for students under 18' });
            }
            const parent = await Parent.findOne({ CIN: req.body.father_CIN });
            if (!parent) {
                return res.status(404).json({ message: 'Parent not found' });
            }
            studentData.father_CIN = parent._id;
        } else {
            // If the student is 18 or older, check for CIN_student
            if (!req.body.CIN_student) {
                return res.status(400).json({ message: 'CIN_student is required for students 18 and older' });
            }
            studentData.CIN_student = req.body.CIN_student;
        }

        // Create the student record
        const student = new Student(studentData);
        let result = await student.save();
        result.password = undefined;

        // Create a token for the student
        const token = createToken(result._id);

        // Respond with the created student data
        return res.status(201).json({
            status: true,
            message: 'Student registered successfully.',
            data: {
                student: result,
                token: token
            }
        });
    } catch (err) {
        console.error('Error registering student:', err);
        res.status(500).json({ message: 'Server error', error: err });
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
           /*if (parent) {
            updateFields.father_CIN = parent._id;
        } else {
            updateFields.father_CIN = null; // Set father's CIN to null if not provided
        }  
        if (req.body.CIN_student) {
            updateFields.CIN_student = req.body.CIN_student;
            updateFields.father_CIN = null; // Set father's CIN to null if CIN_student is provided
        } */
        if (req.body.CIN_student) {
            updateFields.CIN_student = req.body.CIN_student;
            updateFields.father_CIN = null; // Set father's CIN to null if CIN_student is provided
        } else if (req.body.father_CIN) {
            updateFields.father_CIN = parent ? parent._id : null; // Update father_CIN if provided
            updateFields.CIN_student = null; // Set CIN_student to null if father_CIN is provided

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
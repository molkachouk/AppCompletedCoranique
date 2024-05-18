const Teacher = require('../Models/Teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};
const TeacherRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const teacher = new Teacher({
            ...req.body,
         
            password: hashedPass,
       });

      const existingTeacherByEmail = await Teacher.findOne({ email: req.body.email  });


       if (existingTeacherByEmail) {
          res.send({ message: 'Email already exists' });
      }
      
      let result = await teacher.save();
      result.password = undefined;
      const token = createToken(result._id);
      res.status(201).json( result);
    } catch (err) {
       res.status(500).json(err);
        // res.status(201).json({ teacher: result, token });
    }
    };

const TeacherLogIn = async (req, res) => {
    try{
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const validated = await bcrypt.compare (req.body.password,teacher.password) 
        if(!validated){
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = createToken(teacher._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            teacher = await teacher.populate("place", "placeName")
            teacher.password = undefined;
                res.send(teacher);
           
   
   
} catch(err){
    res.status(500).json({message: 'server error'});
}
};
const getTeachers = async (req, res) => {
    try {
       
        let teachers = await Teacher.find();
     
        if (teachers.length > 0) {
            let modifiedTeachers = teachers.map((teacher) => {
                return { ...teacher._doc, password: undefined };
            });
            res.send(modifiedTeachers);
            
        } else {
            res.send({ message: "No teachers found" });
        }
    } catch (err) {
        console.error("Error:", err); // Affichez l'erreur
        res.status(500).json(err);
    }
};
const getTeacherDetail = async (req, res) => {
    
    try {
        let teacher = await Teacher.findById(req.params.id)
       
           
        if (teacher) {
            teacher.password = undefined;
            res.send(teacher);
           
        }
        else {
            res.send({ message: "No teacher found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

 
const deleteTeacher = async (req, res) => {
    try {
        const result = await Teacher.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}
const deleteTeachers = async (req, res) => {
    try {
        const result = await Teacher.deleteMany()
        if (result.deletedCount === 0) {
            res.send({ message: "No teachers found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}
const updateTeacher = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Teacher.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}
 

module.exports = {TeacherRegister,TeacherLogIn,getTeachers,deleteTeacher,deleteTeachers,updateTeacher,getTeacherDetail};
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
    console.log('Secretary Register Request:', req.body);
    console.log('Secretary Register File:', req.file);
    let image_filename =`${req.file.filename}`;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingTeacherByCin= await Teacher.findOne({ 
            cin: req.body.cin,
        });

        if (existingTeacherByCin) {
            return res.status(400).json({ message: 'Cin already exists' });
        }

        const teacher = new Teacher({
            name_arabe:req.body.name_arabe,
            name_francais:req.body.name_francais,
            prenom_arabe:req.body.prenom_arabe,
            prenom_francais:req.body.prenom_francais,
           // date_naissance:req.body.date_naissance,
            mobile_phone:req.body.mobile_phone,
            email:req.body.email,
            bitumen_phone:req.body.bitumen_phone,
            adress:req.body.adress,
            date_birth:req.body.date_birth,
            place_birth:req.body.place_birth,
            cin:req.body.cin,
            licence:req.body.licence,
            occupation:req.body.occupation,
            memorizing:req.body.memorizing,
            type_etude:req.body.type_etude,
            confirmPassword:hashedPass,
            password: hashedPass,
            image:image_filename,
            role:req.body.role
          
        });

        // Save the secretary to the database
        const result = await teacher.save();
        result.password = undefined;

        // Generate JWT token
        const token = createToken(result._id);

        // Send success response
        return res.status(201).json({
            status: true,
            message: 'Teacher registered successfully.',
            data: {
                teacher: result,
                token: token
            }
        });
    } catch (err) {
        console.error('Teacher Register Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const TeacherLogIn = async (req, res) => {
    try{
    if (!req.body.cin || !req.body.password) {
        return res.status(400).json({ message: 'Cin and password are required' });
    }
        let teacher = await Teacher.findOne({ email: req.body.cin });
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
                res.json(teacher);
           
   
   
} catch(err){
    res.status(500).json({message: 'server error'});
}
};
const getTeacherByYear = async (req, res) => {
    try {
        const year = parseInt(req.params.year); // Convert year to integer
        const teachers = await Teacher.aggregate([
            {
                $addFields: {
                    createdAtYear: { $year: "$createdAt" } // Extract year from createdAt
                }
            },
            {
                $match: {
                    createdAtYear: year // Filter groups by year
                }
            }
        ]);

        if (teachers.length > 0) {
            res.json(teachers);
        } else {
            res.status(404).json({ message: "Aucun teachers trouvé pour l'année " + year });
        }
    } catch (err) {
        console.error('Erreur lors de la récupération des groupes :', err);
        res.status(500).json({ message: 'Erreur serveur' });
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
   
    let image_filename = `${req.file.filename}`;
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Teacher.findByIdAndUpdate(req.params.id,
            { $set: req.body,
              image:image_filename,
            },
            { new: true })
            result.password = undefined;
           // console.log(result)

        return res.status(201).json({
            status: true,
            message: 'Teacher registered successfully.',
            data: {
                teacher: result,
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
 

module.exports = {TeacherRegister,TeacherLogIn,getTeachers,deleteTeacher,deleteTeachers,updateTeacher,getTeacherDetail,getTeacherByYear};
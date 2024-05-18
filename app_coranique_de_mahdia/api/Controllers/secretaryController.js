const Secretary = require('../Models/Secretary');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const multer  = require('multer');
const upload = require('../Middleware/multer');
const  fs = require("fs");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};

  

const secretaryRegister = async (req, res) => {
    console.log('Secretary Register Request:', req.body);
    console.log('Secretary Register File:', req.file);
    let image_filename = `${req.file.filename}`;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingSecretaryByEmail = await Secretary.findOne({ 
            email: req.body.email,
        });

        if (existingSecretaryByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const secretary = new Secretary({
            name: req.body.name,
            email:req.body.email,
            password: hashedPass,
            image:image_filename,
            role:req.body.role,
        });

        // Save the secretary to the database
        const result = await secretary.save();
        result.password = undefined;

        // Generate JWT token
        const token = createToken(result._id);

        // Send success response
        return res.status(201).json({
            status: true,
            message: 'Secretary registered successfully.',
            data: {
                secretary: result,
                token: token
            }
        });
    } catch (err) {
        console.error('Secretary Register Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const secretaryLogIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        let secretary = await Secretary.findOne({ email: req.body.email });
        if (!secretary) {
            return res.status(404).json({ message: 'Secretary not found' });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, secretary.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = createToken(secretary._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      
        // secretary = await secretary.populate("year", "yearName")

        secretary.password = undefined;
        res.json(secretary );
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
const getSecretarys = async (req, res) => {
    try {
        console.log("Place ID:", req.params.id); 
        let secretarys = await Secretary.find();
     
        if (secretarys.length > 0) {
            let modifiedSecretarys = secretarys.map((secretary) => {
                return { ...secretary._doc, password: undefined };
            });
            res.send(modifiedSecretarys);
            
        } else {
            res.send({ message: "No secretarys found" });
        }
    } catch (err) {
        console.error("Error:", err); 
        res.status(500).json(err);
    }
};
const getSecretarysByYear = async (req, res) => {
    try {
        console.log("Year ID:", req.params.id); 
        let secretarys = await Secretary.find({ year: req.params.id }).populate("year");
     
        if (secretarys.length > 0) {
            let modifiedSecretarys = secretarys.map((secretary) => {
                return { ...secretary._doc, password: undefined };
            });
            res.send(modifiedSecretarys);
            
        } else {
            res.send({ message: "No secretarys found" });
        }
    } catch (err) {
        console.error("Error:", err); // Affichez l'erreur
        res.status(500).json(err);
    }
};
const getSecretaryDetail = async (req, res) => {
    console.log("secretary"); 
    try {
        let secretary = await Secretary.findById(req.params.id)
       
           
        if (secretary) {
            secretary.password = undefined;
            res.send(secretary);
           
        }
        else {
            res.send({ message: "No secretary found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
const deleteSecretary = async (req, res) => {
    try {
        const result = await Secretary.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}
const deleteSecretarys = async (req, res) => {
    try {
        const result = await Secretary.deleteMany()
        if (result.deletedCount === 0) {
            res.send({ message: "No secretarys found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}
const updateSecretary = async (req, res) => {
    console.log('Secretary update Request:', req.body);
    
    console.log('Secretary  File:', req.file);
    let image_filename = `${req.file.filename}`;
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Secretary.findByIdAndUpdate(req.params.id,
            { $set: req.body,
              image:image_filename,
            },
            { new: true })
            result.password = undefined;
           // console.log(result)

        return res.status(201).json({
            status: true,
            message: 'Secretary registered successfully.',
            data: {
                secretary: result,
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
}




// Other functions (getSecretarys, getSecretaryDetail, deleteSecretary, deleteSecretarys, updateSecretary) remain the same

module.exports = { secretaryRegister, getSecretarys,getSecretaryDetail,deleteSecretary,deleteSecretarys, updateSecretary,secretaryLogIn,getSecretarysByYear};
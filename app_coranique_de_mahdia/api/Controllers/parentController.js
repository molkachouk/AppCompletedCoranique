const Parent = require('../Models/Parent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};

const parentRegister = async (req, res) => {
    console.log('parent Register Request:', req.body);
    console.log('Secretary Register File:', req.file);
    let image_filename = `${req.file.filename}`;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const parent = new Parent({
            ...req.body,
            parent_image:image_filename,
            password: hashedPass,
        });

        const existingParentByEmail = await Parent.findOne({ email: req.body.email });

        if (existingParentByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        let result = await parent.save();
        result.password = undefined;
        const token = createToken(result._id);
        return res.status(201).json({
            status: true,
            message: 'parent registered successfully.',
            data: {
                parent: result,
                token: token
            }
        });
       // res.status(201).json({ secretary: result, token });

    } catch (err) {
        res.status(500).json(err);
    }
};

const parentLogIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        let parent = await Parent.findOne({ email: req.body.email });
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, parent.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = createToken(parent._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
       
        parent.password = undefined;
        res.json(parent);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
const getParents = async (req, res) => {
    try {
        
        let parents = await Parent.find();
     
        if (parents.length > 0) {
            let modifiedParents = parents.map((parent) => {
                return { ...parent._doc, password: undefined };
            });
            res.send(modifiedParents);
            
        } else {
            res.send({ message: "No parents found" });
        }
    } catch (err) {
        console.error("Error:", err); // Affichez l'erreur
        res.status(500).json(err);
    }
};
const getParentDetail = async (req, res) => {
    try {
        let parent = await Parent.findById(req.params.id)
           
           
        if (parent) {
            parent.password = undefined;
            res.send(parent);
        }
        else {
            res.send({ message: "No parent found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
const deleteParent = async (req, res) => {
    try {
        const result = await Parent.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}
const deleteParents = async (req, res) => {
    try {
        const result = await Parent.deleteMany()
        if (result.deletedCount === 0) {
            res.send({ message: "No parents found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}
const updateParent = async (req, res) => {
    console.log('Parent update Request:', req.body);
    console.log('Parent  File:', req.file);
    let image_filename = req.file ? req.file.filename : undefined;    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let updateFields = {};
        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.prename) updateFields.prename = req.body.prename;
        if (req.body.namefrench) updateFields.namefrench = req.body.namefrench;
        if (req.body.prenamefrench) updateFields.prenamefrench = req.body.prenamefrench;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.mobile) updateFields.mobile = req.body.mobile;
        if (req.body.telephone) updateFields.telephone = req.body.telephone;
        if (req.body.address) updateFields.address = req.body.address;
        if (req.body.CIN) updateFields.CIN = req.body.CIN;
        if (req.body.parent_image) updateFields.parent_image = req.body.parent_image;
         if (image_filename) {updateFields.parent_image = image_filename;}



        let result = await Parent.findByIdAndUpdate(req.params.id,
            { $set:updateFields},
            { new: true })

        result.password = undefined;
        return res.status(201).json({
            status: true,
            message: 'Parent updated successfully.',
            data: {
                parent: result,
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
}




// Other functions (getSecretarys, getSecretaryDetail, deleteSecretary, deleteSecretarys, updateSecretary) remain the same

module.exports = { parentRegister, getParents,getParentDetail,deleteParent,deleteParents, updateParent,parentLogIn};
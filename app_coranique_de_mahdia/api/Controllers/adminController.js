const Admin = require('../Models/Admin');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};

 const adminRegister = async (req, res) => {
     try {
         const admin = new Admin({
             ...req.body
        });

       const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
    //    const existingPlace = await Admin.findOne({ placeName: req.body.placeName });


        if (existingAdminByEmail) {
           res.send({ message: 'Email already exists' });
       }
    //    else if (existingPlace) {
    //     res.send({ message: 'Place name already exists' });
    // }
        else {
            let result = await admin.save();
            result.password = undefined;
            res.send(result);
        }
     } catch (err) {
        res.status(500).json(err);
     }
     };

 const adminLogIn = async (req, res) => {
     if (req.body.email && req.body.password) {
         let admin = await Admin.findOne({ email: req.body.email });
         if (admin) {
            if (req.body.password === admin.password) {
                admin.password = undefined;
                 res.send(admin);
             } else {
                 res.send({ message: "Invalid password" });
             }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
     }
 };

  
 
 module.exports = {adminRegister, adminLogIn};   
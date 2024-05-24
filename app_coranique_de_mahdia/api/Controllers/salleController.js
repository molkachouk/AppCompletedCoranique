const Salle = require('../Models/Salle')


const salleCreate = async (req, res) =>{
    try{
        const salle = new Salle({
            ...req.body,
          

        });

        const existingSalleByName = await Salle.findOne({
            name_salle: req.body.name_salle,
          


        });
        if (existingSalleByName) {
            res.send({ message: 'Sorry this salle name already exists' });
        }
        else {
            const result = await salle.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
    
};
const salleList = async (req, res) => {
    try {
        let salles = await Salle.find()
        if (salles.length > 0) {
            res.send(salles)
        } else {
            res.send({ message: "No salles found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const getSalleDetail = async (req, res) => {
    try {
        let salle = await Salle.findById(req.params.id);
        if (salle) {
          
            res.send(salle);
        }
        else {
            res.send({ message: "No salle found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}



const deleteSalle = async (req, res) => {
    try {
        const result = await Salle.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}


 const updateSalle = async (req, res) => {
     try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
             req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Salle.findByIdAndUpdate(req.params.id,
            { $set: req.body },
             { new: true })

         result.password = undefined;
        res.send(result)
     } catch (error) {
         res.status(500).json(error);
    }
 }



module.exports = { salleCreate, salleList, getSalleDetail,deleteSalle,updateSalle};
const Categorie = require('../Models/Categorie')
const categorieCreate = async (req, res) =>{
    let image_filename = req.file ? `${req.file.filename}`: null;
    try{
        const categorie = new Categorie({
            ...req.body,
            image_categorie:image_filename
          

        });

        const existingCategorieByName = await Categorie.findOne({
            name_categorie: req.body.name_categorie,
          


        });
        if (existingCategorieByName) {
            res.send({ message: 'Sorry this categorie name already exists' });
        }
        else {
            const result = await categorie.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
    
};
const categorieList = async (req, res) => {
    try {
        let categories = await Categorie.find()
        if (categories.length > 0) {
            res.send(categories)
        } else {
            res.send({ message: "No categories found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const getCategorieDetail = async (req, res) => {
    try {
        let categorie = await Categorie.findById(req.params.id);
        if (categorie) {
          
            res.send(categorie);
        }
        else {
            res.send({ message: "No categorie found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


  



const deleteCategorie = async (req, res) => {
    try {
        const deleteCategorie = await Categorie.findByIdAndDelete(req.params.id);
        if (!deleteCategorie) {
            return res.send({ message: "Categorie not found" });
        }
      
        res.send(deleteCategorie);
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateCategorie = async (req, res) => {
    console.log('categorie update Request:', req.body);
    console.log('categorie update File:', req.file);
   let image_filename = req.file ? req.file.filename : undefined;
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
     
           let updateFields = {};
           if (req.body.name_categorie) updateFields.name_categorie = req.body.name_categorie;
           if (req.body.description) updateFields.description = req.body.description;
          
           if (req.body.image_categorie) updateFields.image_categorie = req.body.image_categorie;
          
           
            if (image_filename) {updateFields.image_categorie = image_filename;}

        let result = await Categorie.findByIdAndUpdate(req.params.id,
            { $set: updateFields},
            { new: true });
            result.password = undefined;
            return res.status(201).json({
                status: true,
                message: 'categorie update successfully.',
                data: {
                    categorie: result,
                   
                }
            });
    } catch (error) {
        res.status(500).json(error);
    }
}






module.exports = { categorieCreate, categorieList, deleteCategorie, getCategorieDetail,updateCategorie };
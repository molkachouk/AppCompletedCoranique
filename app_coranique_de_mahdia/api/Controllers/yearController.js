const Year = require('../Models/Year');

const createYear = async (req, res) => {
    try {
        const year = new Year({
            ...req.body,
            place:req.body.adminID
       });

     
      const existingYear= await Year.findOne({ yearName: req.body.yearName,place: req.body.adminID  });

      if (existingYear) {
       res.send({ message: 'Year name already exists' });
    }
       else {
           let result = await year.save();
           res.send(result);
       }
    } catch (err) {
       res.status(500).json(err);
    }
    };
    const getYears = async (req, res) => {
        try {
            console.log("Place ID:", req.params.id); 
            let years = await Year.find({ place: req.params.id }).populate("place");
         
            if (years.length > 0) {
                let modifiedYears = years.map((year) => {
                    return { ...year._doc, password: undefined };
                });
                res.send(modifiedYears);
                
            } else {
                res.send({ message: "No years found" });
            }
        } catch (err) {
            console.error("Error:", err); 
            res.status(500).json(err);
        }
    };



 

    module.exports = {createYear,getYears};
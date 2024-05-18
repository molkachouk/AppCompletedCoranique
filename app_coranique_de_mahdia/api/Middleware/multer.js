const path = require('path');
const multer  = require('multer')
const { fileURLToPath } = require("url");

const { v4: uuidv4 } = require('uuid');

/*

const Storage = multer.diskStorage({
    destination: 
        './public/images/',
    
    filename: function(req, file, cb) {   
        cb(null,file.fieldname  + '-' + Date.now() + path.extname(file.originalname));
    }
    
});



const upload = multer({ storage:Storage }).single('picture');



const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname  +'-'+ Date.now()+path.extname(file.originalname))
    }
  })
  
  const upload= multer({
    storage:storage
  })
  
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {   
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    console.log('File received:', file);
        cb(null, true);
}

let upload = multer({ storage:storage});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/'); // Specify the destination directory
    },
    filename: function(req, file, cb) {
        // Generate a unique filename using the original filename and current timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).single('picture');
module.exports=upload;*/


// checking for file type
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

// Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
      cb(null, path.join('public/images'));
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split('').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({
    storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } 
    
})

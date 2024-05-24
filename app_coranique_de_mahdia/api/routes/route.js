const router = require('express').Router();
const adminController =require('../Controllers/adminController');
const studentController = require('../Controllers/studentController');
const secretaryController = require('../Controllers/secretaryController');
const teacherController = require('../Controllers/teacherController');
const parentController = require('../Controllers/parentController');
const yearController = require('../Controllers/yearController');
const groupController = require('../Controllers/groupController');
const eventController = require('../Controllers/eventController');
const salleController=require('../Controllers/salleController');
const locationController=require('../Controllers/locationController');
const examenController=require('../Controllers/examenController');

const multer  = require('multer')
const express = require('express');



// configure multer
const storage = multer.diskStorage({
  destination:'public/images', // Specify the destination folder for uploaded files
  
  filename:(req, file, cb)=> {
    return cb(null, `${Date.now()}${file.originalname}`); // Use the original file name for the uploaded file
  }
});
const eventStorage = multer.diskStorage({
  destination: 'public/event_images',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});

const studentStorage = multer.diskStorage({
  destination: 'public/students',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});
const parentStorage = multer.diskStorage({
  destination: 'public/parent',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });
const uploadEvent = multer({ storage: eventStorage });
const uploadStudent = multer({ storage: studentStorage });
const uploadParent = multer({ storage: parentStorage });





router.post("/AdminRegister" , adminController.adminRegister);
router.post("/AdminLogin", adminController.adminLogIn);
router.post("/StudentRegister", uploadStudent.single("stud_image"),studentController.studentRegister);
//router.post("/StudentRegister",studentController.studentRegister);
router.post('/StudentLogin', studentController.studentLogIn);
router.post('/SecretaryRegister', upload.single("image") ,secretaryController.secretaryRegister);
router.post('/SecretaryLogin', secretaryController.secretaryLogIn);
router.post("/TeacherRegister", upload.single("image"), teacherController.TeacherRegister);
router.post("/TeacherLogin", teacherController.TeacherLogIn);
router.post("/ParentRegister", uploadParent.single("parent_image"),parentController.parentRegister);
router.post("/ParentLogin", parentController.parentLogIn);
router.post("/CreateYear", yearController.createYear);
router.post("/GroupCreate", groupController.groupCreate);
router.post("/addEvent",uploadEvent.single("images") ,eventController.AddEvent);
router.post("/SalleCreate",salleController.salleCreate);
router.post("/LocationCreate", locationController.locationCreate);
router.post("/ExamenCreate", examenController.AddExamen);





 
router.get("/Secretarys", secretaryController.getSecretarys);
router.get("/Secretary/:id", secretaryController.getSecretaryDetail);
router.get("/Teachers",teacherController.getTeachers);
router.get("/Teacher/:id",teacherController.getTeacherDetail);
router.get("/Parents",parentController.getParents);
router.get("/Parent/:id",parentController.getParentDetail);
router.get("/Groups",groupController.groupList);
router.get("/SecretaryByYear/:id",secretaryController.getSecretarysByYear);
router.get("/getYears/:id",yearController.getYears);
router.get("/Students/:id",studentController.getStudentsByGroup);
router.get("/Student/:id",studentController.getStudentDetail);
router.get("/Students",studentController.getStudents);
router.get('/Students/:id/parent', studentController.getStudentParent);
router.get("/Events",eventController.getEvents);
router.get("/EventsByDate",eventController.getEventBydate);
router.get("/Events/:id",eventController.getEventDetail);
router.get('/Salles',salleController.salleList);
router.get('/Salle/:id',salleController.getSalleDetail);
router.get('/Locations', locationController.locationList);
router.get('/Examen/:id',examenController.getExamenDetail);
router.get('/Examen/detail',examenController.getExamenDetailByNameAndDate);
router.get('/Examens',examenController.getExamenall);
router.get('/Examen/byGroup/:groupName', examenController.getExamenByGroupName);







router.delete("/Secretarys/:id", secretaryController.deleteSecretarys);
 router.delete("/Secretary/:id", secretaryController.deleteSecretary);
 router.delete("/Teacher/:id",teacherController.deleteTeacher);
 router.delete("/Teachers",teacherController.deleteTeachers);
 router.delete("/Parent/:id",parentController.deleteParent);
 router.delete("/Parents/:id",parentController.deleteParents);
 router.delete("/Student/:id",studentController.deleteStudent);
 router.delete("/Event/:id",eventController.deleteEvent);
 router.delete("/Salle/:id",salleController.deleteSalle);
 router.delete("/Location/:id", locationController.deleteLocation);
 router.delete("/Examen/:id", examenController.deleteExamen);
 

 router.put("/Teacher/:id",teacherController.updateTeacher);
 router.put("/Secretary/:id",upload.single("image") ,secretaryController.updateSecretary);
 router.put("/Parent/:id", uploadParent.single("parent_image"),parentController.updateParent);
 router.put("/Group/:id",groupController.updateGroup);
 router.put("/Student/:id", uploadStudent.single("stud_image"),studentController.updateStudent);
 router.put("/Event/:id",uploadEvent.single("images") ,eventController.updateEvent);
 router.put("/Salle/:id",salleController.updateSalle);
 router.put("/Location/:id", locationController.updateLocation);
 router.put("/Examen/:id", examenController.UpdateExamen);


module.exports=router;
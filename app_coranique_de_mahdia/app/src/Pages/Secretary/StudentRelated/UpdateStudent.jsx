import {React,useEffect,useState} from 'react';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer le fichier CSS de Bootstrap
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { updateUser } from '../../../redux/userRelated/userHandle';
import { getAllGroups } from '../../../redux/groupRelated/groupHandle';
import {getAllParents} from '../../../redux/parentRelated/parentHandle'
import { useParams } from 'react-router-dom';
import axios from 'axios';
function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser  } = useSelector(state => state.user);
  const { parentsList, loading: parentLoading, error: parentError } = useSelector((state) => state.parent);

  //const { groupsList, loading: groupLoading, error: groupError } = useSelector((state) => state.group);
  const address = "Student";
 // console.log("groupsList:", groupsList);

  const [showGuardianIDField, setShowGuardianIDField] = useState(false);
  const [guardianExists, setGuardianExists] = useState(false); // Moved declaration here
  const [loader, setLoader] = useState(false);

  const [name, setName] = useState('');
  const [prename, setPrename] = useState('');
  const [namefrench, setNamefrench] = useState("");
  const [prenamefrench, setPrenamefrench] = useState("");
  const [date_birth, setDateOfBirth] = useState('');
  const [place_birth, setPlaceOfBirth] = useState('');  
  const [study_level, setStudyLevel] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [name_group, setgroupName] = useState('');
  const [memo_level, setMemoLevel] = useState('');
  const [units, setUnits] = useState('');
  const [stud_image, setStudImage] = useState(''); 
  const [father_CIN, setFatherCin] = useState(''); 
  const [CIN_student, setCINstudent] = useState(''); 

  const [previewImage, setPreviewImage] = useState(false);
  const [groupsList, setGroupsList] = useState([]);
  const [groupLoading, setGroupLoading] = useState(true);
  const [groupError, setGroupError] = useState(null);

  const url = "http://localhost:5000";
  useEffect(() => {
    const fetchGroupsList = async () => {
      try {
        const response = await axios.get(`${url}/api/Groups`);
        setGroupsList(response.data);
        setGroupLoading(false);
      } catch (error) {
        setGroupError(error.message);
        setGroupLoading(false);
      }
    };

    fetchGroupsList();
  }, []);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await axios.get(`${url}/api/Student/${id}`);
        const studentData = response.data;
         // Find the group object that matches the student's group
      const selectedGroup = groupsList.find(group => group._id === studentData.name_group);

      // Set name_group to the entire group object, if found
        setgroupName(selectedGroup || '');
        setName(studentData.name);
        setPrename(studentData.prename);
        setNamefrench(studentData.namefrench);
        setPrenamefrench(studentData.prenamefrench);
        setDateOfBirth(studentData.date_birth);
        setPlaceOfBirth(studentData.place_birth);
        setStudyLevel(studentData.study_level);
        setEstablishment(studentData.establishment);
        setEmail(studentData.email);
        setMobile(studentData.mobile);
        setFatherCin(studentData.father_CIN ? studentData.father_CIN.CIN : '');
        setCINstudent(studentData.CIN_student);
        setGender(studentData.gender);
        setMemoLevel(studentData.memo_level);
        setUnits(studentData.units);
        setStudImage(studentData.stud_image);
        console.log(studentData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
    fetchStudent();
  }, [id]);

 /* useEffect(() => {
    console.log("groupsList:", groupsList);

    dispatch(getAllParents(currentUser._id));
    dispatch(getAllGroups(id));
}, [dispatch, currentUser._id, id]);*/

  

/*const [showGuardianIDField, setShowGuardianIDField] = useState(false);
    const [guardianExists, setGuardianExists] = useState(false); // Moved declaration here

    useEffect(() => {
        dispatch(getAllParents(currentUser._id));
        dispatch(getAllGroups(id));
    }, [dispatch, currentUser._id, id]);

    useEffect(() => {
        dispatch(getAllGroups(id));
    }, [dispatch, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, stud_image: e.target.files[0] });

    };

        const handleDateOfBirthChange = (e) => {
            const value = e.target.value;
            setDateOfBirth(value);
            const age = calculateAge(value);
            setShowGuardianIDField(age < 18);
        };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }; */

    useEffect(() => {
      dispatch(getAllParents(currentUser._id));
      dispatch(getAllGroups(id));
  }, [dispatch, currentUser._id, id]);

  useEffect(() => {
      dispatch(getAllGroups(id));
  }, [dispatch, id]);

    const handleDateOfBirthChange = (e) => {
      const value = e.target.value;
      setDateOfBirth(value);
      const age = calculateAge(value);
      setShowGuardianIDField(age < 18);
      if (age >= 18) {
        setFatherCin(''); // Clear the father's CIN when age is 18 or older
    }else{
      if (age < 18) {
        setFatherCin(''); // Clear the father's CIN when age is less than 18
      }
    }
  };

const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setStudImage(selectedFile);
    
    // Check if there's a selected file
    if (selectedFile) {
      // Create a FileReader instance
      const reader = new FileReader();
  
      // Listen for the FileReader to load and set the preview image
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
  
      // Read the selected file as a data URL
      reader.readAsDataURL(selectedFile);
    } else {
      // If no file is selected, reset the preview image
      setPreviewImage(null);
    }
  };
 /*
  const studentRows = Array.isArray(studentsList) && studentsList.length > 0 && studentsList.map((student) => {
        

    return {
        name: student.name,
        prename: student.prename,
        date_birth: student.date_birth,
        place_birth: student.place_birth,
        study_level: student.study_level,
        establishment: student.establishment,
        email: student.email,
        mobile: student.mobile,
        father_CIN: student.father_CIN ? student.father_CIN.CIN : 'N/A',
        gender: student.gender,
        memo_level: student.memo_level,
        units: student.units,
        id: student._id,
    };
});*/

  /*studentsList && studentsList.length > 0 && studentsList.map((student) => {
    return {
        name: student.name,
        email: student.email,
        mobile: student.mobile,
        date_birth: student.date_birth,
        father_name: student.father_name,
        gender: student.gender,
        study_level: student.study_level,
        establishment: student.establishment,
        id: student._id,
    };
  });*/

  const submitHandler = async(event) => {
    event.preventDefault()
    setLoader(true);

    try{
      const formData = new FormData(); // Create a new FormData object

      // Append form data fields to FormData object
      formData.append('name', name);
      formData.append('prename', prename);
      formData.append('namefrench', namefrench);
      formData.append('prenamefrench', prenamefrench);
      formData.append('date_birth', date_birth);
      formData.append('place_birth', place_birth);

      formData.append('study_level', study_level);
      formData.append('establishment', establishment);
      formData.append('email', email);
      formData.append('mobile', mobile);
      
      formData.append('gender', gender);
      formData.append('name_group', name_group);
      formData.append('memo_level', memo_level);
      formData.append('units', units);
      formData.append('stud_image', stud_image);
      if (calculateAge(date_birth) < 18) {
          formData.append('father_CIN', father_CIN);
      }  
      if (calculateAge(date_birth) >= 18) {
            formData.append('CIN_student', CIN_student);
            console.log(CIN_student)
        }       
       
       console.log('Selected image file:', stud_image);

      console.log('Selected image file:', stud_image); // Append the file to the FormData object
      console.log('Form Data:', formData);
     const response= await dispatch(updateUser(formData, id, address));
      toast.success('Student registered successfully.');
      setLoader(false);
      navigate(-1);
    
    }catch (error) {
      console.error('updating failed:', error);
    setLoader(false);
    if (error.response && error.response.data && error.response.data.message === "Parent not found") {
      toast.error(`الوالد/الوالدة برقم البطاقة ${father_CIN} غير موجود في النظام. يرجى إضافة الوالد/الوالدة إلى النظام`);
      window.scrollTo(0, 0);
    } 
  }
  
    
  }

   

  return (
    <Container fluid className="px-4 mt-4">
    <Form onSubmit={submitHandler} encType='multipart/form-data'>

              <Nav className="nav nav-borders">
              <Nav.Link className='titre'>الملف الشخصي</Nav.Link>
              </Nav>
              <hr className="mt-0 mb-4" />
              <Row className='all-row'>
                <Col xl={4}>

                <Card className="mb-4 mb-xl-0">
                <Card.Header className='photo-text'>صورة الملف الشخصي</Card.Header>
                <Card.Body className="text-center">

                {previewImage ? (
                <img className="img-account-profile rounded-circle mb-2  img-fluid" src={previewImage} alt="Preview" />
                ) : (
                <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/students/${stud_image}`} alt="Current" />
                )}              <div className="small font-italic text-muted mb-4">JPG أو PNG بحجم لا يتجاوز 5 ميجابايت</div>
                <Form.Group className="mb-3">
                <Form.Label className="input-text small">تحميل صورة جديدة</Form.Label>
                <Form.Control type="file" name="stud_image" id="stud_image" accept=".png, .jpg, .jpeg" style={{ backgroundColor: '#124a44' }} onChange={handleImageChange} />
                </Form.Group>
                </Card.Body>
                </Card>
                </Col>


                <Col xl={8}>
                <Card className="mb-4">
                <Card.Header className='photo-text'>تفاصيل الحساب</Card.Header>
                <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="small mb-1"> الإسم </Form.Label>
                                <Form.Control type="text" placeholder="ادخل اسمك الكامل" name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}>  nom </Form.Label>
                        <Form.Control type="text" placeholder="  enter le nom" value={namefrench} onChange={(e) => setNamefrench(e.target.value)} />
                                <Form.Label className="small mb-1"> اللقب </Form.Label>
                                <Form.Control type="text" placeholder="ادخل اللقب " name='prename' value={prename} onChange={(e)=>setPrename(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}> prenom </Form.Label>
                        <Form.Control type="text" placeholder="enter le prenom" value={prenamefrench} onChange={(e) => setPrenamefrench(e.target.value)} />
                                <Form.Label className="small mb-1"> تاريخ الولادة </Form.Label>
                                <Form.Control type="date" placeholder="ادخل  تاريخ الولادة" name='date_birth' value={date_birth}  onChange={handleDateOfBirthChange} />
                               
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                 
                                    <>
                                        <Form.Label className="small mb-1"> رقم بطاقة التعريف الولي </Form.Label>
                                        <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" name='father_CIN' value={father_CIN} onChange={(e)=>setFatherCin(e.target.value)}      style={{ display: calculateAge(date_birth) < 18 ? 'block' : 'none' }}   />
                                        {calculateAge(date_birth) >= 18 && (
                                            <>
                                            <Form.Label className="small mb-1"> رقم بطاقة التعريف الخاص بك </Form.Label>
                                            <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" name='CIN_student' value={CIN_student} onChange={(e)=>setCINstudent(e.target.value)}   />
                    
                                        </>
                                          )}
                                           {/*  <div className="add-parent-button" style={{ }}>
                                            <Button style={{ width: '100%' , backgroundColor: !guardianExists ? '#124a44' : 'red' }} className="scrolltoTop" disabled={!guardianExists}  onClick={() => {navigate("/AddParent");handleScrollToTop(); }}>إضافة ولي أمرك</Button>
                                             </div>*/}
                                        
                                        
                                    </>
                                
                           
                                <Form.Label className="small mb-1"> مكان الولادة </Form.Label>
                                <Form.Control type="text" placeholder="ادخل  تاريخ الولادة" name='place_birth' value={place_birth} onChange={(e)=>setPlaceOfBirth(e.target.value)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                  <Form.Label className="small mb-1" > مستوى الدراسي </Form.Label>
                                <Form.Select aria-label="مستوى الدراسي" name='study_level' value={study_level} onChange={(e)=>setStudyLevel(e.target.value)}>
                                    <option value=''>اختر مستوى الدراسة</option>
                                    <option value="1">مستوى واحد</option>
                                    <option value="2">مستوى اثنين</option>
                                    <option value="3">مستوى ثلاثة</option>
                                </Form.Select>
                                <Form.Label className="small mb-1"> المؤسسة التعليمية </Form.Label>
                                <Form.Select aria-label="المؤسسة التعليمية" name='establishment' value={establishment} onChange={(e)=>setEstablishment(e.target.value)}>
                                    <option>اختر المؤسسة التعليمية</option>
                                    <option value="1">مؤسسة واحدة</option>
                                    <option value="2">مؤسسة اثنين</option>
                                    <option value="3">مؤسسة ثلاثة</option>
                                </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                  <Form.Label className="small mb-1"> البريد الالكتروني</Form.Label>
                                <Form.Control type="email" placeholder="ادخل البريد الالكتروني" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  />

                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> الهاتف الجوال</Form.Label>
                                <Form.Control type="tel" id="phone"  pattern="[0-9]{2}[0-9]{3}[0-9]{3}" placeholder="ادخل أدخل رقم الهاتف" name='mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)} /> 

                               

                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                  <Form.Label className="small mb-1">  الجنس</Form.Label>
                                <div  className="mb-3">
                                    <Form.Check
                                        inline
                                        label="أنثى"
                                        name="gender"
                                        type="radio"
                                        id={`inline-radio-1`}
                                        checked={gender === "أنثى"} onChange={() => setGender("أنثى")}
                                    />
                                    <Form.Check
                                        inline
                                        label="ذكر"
                                        name="gender"
                                        type="radio"
                                        id={`inline-radio-2`}
                                        checked={gender === "ذكر"} onChange={() => setGender("ذكر")}
                                    />
                                    
                                    </div>    
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                  <Form.Label className="small mb-1"> مستوى الحفظ </Form.Label>
                                <Form.Select aria-label="مستوى الحفظ" name='memo_level' value={memo_level} onChange={(e)=>setMemoLevel(e.target.value)}>
                                    <option>إختر مستوى الحفظ</option>
                                    {[...Array(60)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </Form.Select>
                                <Form.Label className="small mb-1">الوحدات </Form.Label>
                                <Form.Select aria-label="الوحدات" name='units' value={units} onChange={(e)=>setUnits(e.target.value)}>
                                    <option>إختر الوحدات المناسبة</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>

                                </Form.Select> 
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                  <Form.Label className="small mb-1">إضافة الى مجموعة</Form.Label>
                  <Form.Select name='name_group' value={name_group ? name_group._id : ''} onChange={(e) => setgroupName(groupsList.find(group => group._id === e.target.value))}>
  {groupLoading ? (
    <option>Loading...</option>
  ) : groupError ? (
    <option>Error: {groupError}</option>
  ) : (
    groupsList.map((group) => (
      <option key={group._id} value={group._id}>
        {group.name_group}
      </option>
    ))
  )}
</Form.Select>
                  </Col>
                </Row>
                <Button className='input-text' disabled={loader} style={{ backgroundColor: '#124a44' }} type="submit">
                {loader ? <CircularProgress size={24} color="inherit" /> : 'حفظ التغييرات '}
                </Button>
                
                </Card.Body>
                </Card>
                </Col>
                </Row>
                </Form>
                <div className="toast-container" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: '9999' }}>
                <ToastContainer  position="bottom-left" />
                </div>
                </Container>
  );
}

export default UpdateStudent;
const styles = {
  attendanceButton: {
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    }
  }
}
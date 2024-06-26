import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Col, Row, Card, Form, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { updateUser } from '../../../redux/userRelated/userHandle';
import { getAllGroups } from '../../../redux/groupRelated/groupHandle';
import {getAllParents} from '../../../redux/parentRelated/parentHandle'
import { MdRemoveRedEye } from "react-icons/md";
import '../../../Styles/studentprofile.css';

const StudentProfile = () => {
  const { currentUser  } = useSelector(state => state.user);
  const { parentsList, loading: parentLoading, error: parentError } = useSelector((state) => state.parent);
 const { id } = useParams();
const[error,setError]=useState('');
const [loading,setLoading]= useState(true);
 const p = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const address = "Student";

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
  const [fatherId, setFatherId] = useState('');
  const [showParentModal, setShowParentModal] = useState(false);
  const [parentData, setParentData] = useState({});


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

  const fetchParentData = async () => {
    try {
      
        const response = await axios.get(`${url}/api/Student/${id}`);
        const studentData = response.data;
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
        setGender(studentData.gender);
        setgroupName(studentData.name_group);
        setMemoLevel(studentData.memo_level);
        setUnits(studentData.units);
        setStudImage(studentData.stud_image);
        console.log(studentData);
  
        const parentCIN = studentData.father_CIN;
        console.log(parentCIN._id);
        // Fetch the parent data based on the CIN
      const parentResponse = await axios.get(`${url}/api/Parent/${parentCIN._id}`);
      setParentData(parentResponse.data);
      console.log(father_CIN);
      const parentData = parentResponse.data;
      console.log(parentData)
      // Extract the parent ID from the parent data
      const parentId = parentData._id;

      // Set the parent ID in the component state
      setFatherId(parentId);
      setParentData(parentData);

      // Show the modal
      setShowParentModal(true);
    } catch (error) {
      console.error('Error fetching parent data:', error);
      setError('Error fetching parent data');
    }
  };
  const handleNavigateToParentProfile = async () => {
    try {
      const studentResponse = await axios.get(`${url}/api/Student/${id}`);
      const studentData = studentResponse.data;
      setFatherCin(studentData.father_CIN ? studentData.father_CIN.CIN : '');

      if (studentData.father_CIN && studentData.father_CIN.CIN) {
        await fetchParentData(studentData.father_CIN.CIN);
        setShowParentModal(true);
      } else {
        setError('Father CIN not found for this student');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setError('Error fetching student data');
    }
  };

  /*const handleNavigateToParentProfile = async () => {
    try {
      const response = await axios.get(`${url}/api/Student/${id}`);
      const studentData = response.data;
      setName(studentData.name);
      setPrename(studentData.prename);
      setDateOfBirth(studentData.date_birth);
      setPlaceOfBirth(studentData.place_birth);
      setStudyLevel(studentData.study_level);
      setEstablishment(studentData.establishment);
      setEmail(studentData.email);
      setMobile(studentData.mobile);
      setFatherCin(studentData.father_CIN ? studentData.father_CIN.CIN : '');
      setGender(studentData.gender);
      setgroupName(studentData.name_group);
      setMemoLevel(studentData.memo_level);
      setUnits(studentData.units);
      setStudImage(studentData.stud_image);
      console.log(studentData);

      const parentCIN = studentData.father_CIN;
      console.log(parentCIN._id);
      // Fetch the parent data based on the CIN
      const parentResponse = await axios.get(`${url}/api/Parent/${parentCIN._id}`);
       console.log(father_CIN);
      const parentData = parentResponse.data;

      // Extract the parent ID from the parent data
      const parentId = parentData._id;

      // Set the parent ID in the component state
      setFatherId(parentId);

      // Navigate to the parent profile using the retrieved parent ID
      navigate(`/ParentProfile/${parentId}`);
      setParentData(parentData);

    // Show the modal
    setShowParentModal(true);
    } catch (error) {
      console.error('Error fetching parent data:', error);
      setError('Error fetching parent data');
    }
  };
 */
useEffect(() => {
  async function fetchStudent() {
    try {
      const response = await axios.get(`${url}/api/Student/${id}`);
      const studentData = response.data;
      setName(studentData.name);
      setPrename(studentData.prename);
      setDateOfBirth(studentData.date_birth);
      setPlaceOfBirth(studentData.place_birth);
      setStudyLevel(studentData.study_level);
      setEstablishment(studentData.establishment);
      setEmail(studentData.email);
      setMobile(studentData.mobile);
      setFatherCin(studentData.father_CIN ? studentData.father_CIN.CIN : '');
      setCINstudent(studentData.CIN_student);
      setGender(studentData.gender);
      setgroupName(studentData.name_group);
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

const goBack = () => {
  navigate(-1); // Go back to the previous page
};


  

  return (
    <Container fluid className="px-4 mt-4">
   <Nav className="nav nav-borders">
     <Nav.Link className='titre'>الملف الشخصي للتلميذ</Nav.Link>
   </Nav>
   <hr className="mt-0 mb-4" />
   <Row>
     <Col xl={4}>
       <Card className="mb-4 mb-xl-0">
         <Card.Header className='titre-1'>صورة التلميذ </Card.Header>
         <Card.Body className="text-center">
           <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/students/${stud_image}`} alt="" />
           <div className="small font-italic text-muted mb-4">JPG أو PNG بحجم لا يتجاوز 5 ميجابايت</div>
           <Button style={{ backgroundColor: '#124a44' }}>تحميل صورة جديدة</Button>
         </Card.Body>
       </Card>
     </Col>
     <Col xl={8}>
       <Card className="mb-4">
         <Card.Header className='titre-1'>تفاصيل الحساب</Card.Header>
         <Card.Body>
           <Form >
             <Row className="mb-3">
               <Col md={6}>
               <Form.Label className=" input-text small mb-1"> الإسم </Form.Label>
                                                    <Form.Control type="text" placeholder="ادخل اسمك الكامل" name='name' value={name} onChange={(e)=>setName(e.target.value)} readOnly />
                                                    <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}>  nom </Form.Label>
                        <Form.Control type="text" placeholder="  enter le nom" value={namefrench} onChange={(e) => setNamefrench(e.target.value)} readOnly/>
                                                    
               </Col>
               <Col md={6}>
               <Form.Label className="input-text small mb-1"> اللقب </Form.Label>
                                                    <Form.Control type="text" placeholder="ادخل اللقب " name='prename' value={prename} onChange={(e)=>setPrename(e.target.value)} readOnly/>
                                                    <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}> prenom </Form.Label>
                        <Form.Control type="text" placeholder="enter le prenom" value={prenamefrench} onChange={(e) => setPrenamefrench(e.target.value)} readOnly/>
               </Col>
             </Row>  
             <Row className="mb-3">
             <Col md={6}>
             <Form.Label className="input-text small mb-1"> تاريخ الولادة </Form.Label>
              <Form.Control type="date"  name='date_birth' value={date_birth}  onChange={handleDateOfBirthChange}  readOnly />
                    </Col>
                    <Col md={6}>
                    <Form.Label className=" input-text small mb-1"> مكان الولادة </Form.Label>
                    <Form.Control type="text"  name='place_birth' value={place_birth} onChange={(e)=>setPlaceOfBirth(e.target.value)} readOnly />
                    </Col>
                   
              
             </Row>
             <Row className="mb-3">
             <Col  className='text-center'>
                    <Form.Label className=" input-text small mb-1">  الجنس</Form.Label>
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
             <Form.Label className="input-text small mb-1"> المستوى الدراسي </Form.Label>
                    <Form.Control type="text" placeholder="ادخل مستواك الدراسي" name='study_level' value={study_level} onChange={(e)=>setStudyLevel(e.target.value)} readOnly />
                    </Col>
                    <Col md={6}>
                    <Form.Label className="input-text small mb-1"> المؤسسة التعليمية </Form.Label>
                    <Form.Control type="text" placeholder="ادخل اسم مؤسستك" name='establishment' value={establishment} onChange={(e)=>setEstablishment(e.target.value)} readOnly />
                    </Col>
                   
              
             </Row>
             <Row className="mb-3">
             <Col md={6}>
             <Form.Label className=" input-text small mb-1"> البريد الالكتروني</Form.Label>
                  <Form.Control type="email" placeholder="ادخل البريد الالكتروني" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    
                    </Col>
                    <Col md={6}>
                    <Form.Label className="input-text small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> الهاتف الجوال</Form.Label>
                                <Form.Control type="tel" id="phone"  pattern="[0-9]{2}[0-9]{3}[0-9]{3}" placeholder="ادخل أدخل رقم الهاتف" name='mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)} /> 
                    </Col>
                   
              
             </Row>
             <Row className="mb-3">
             <Col md={6}>
             <Form.Label className="input-text small mb-1"> مستوى الحفظ </Form.Label>
             <Form.Control type="text" placeholder="ادخل المستوى التعليمي" name='memo_level' value={memo_level} onChange={(e)=>setMemoLevel(e.target.value)} readOnly />

                    
                    </Col>
                    <Col md={6}>
                    <Form.Label className="input-text small mb-1">الوحدات </Form.Label>
                    <Form.Control type="text" placeholder="ادخل عدد الوحدات" name='units' value={units} onChange={(e)=>setUnits(e.target.value)} readOnly />

                    </Col>
                   
              
             </Row>
             <Row className="mb-3">
             <Col className=' text-center'>
             <Form.Label className="input-text small mb-1">إضافة الى مجموعة </Form.Label>
<Form.Control type="text" value={name_group.name_group} readOnly />
                    
                    </Col>
                    
                   
              
             </Row>
      {/*       <ParentModal
  show={showParentModal}
  handleClose={() => setShowParentModal(false)}
  parentData={parentData}
  id={fatherId}
/>*/} 
             <Row className="mb-3">
             <Col  >
             <>
                                        <Form.Label className=" input-text small mb-1"  style={{ display: father_CIN  ? 'block' : 'none' }}> رقم بطاقة التعريف الولي </Form.Label>
                                        <Row>
                                          <Col md={8}>
                                        <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" name='father_CIN' value={father_CIN} onChange={(e)=>setFatherCin(e.target.value)}      style={{ display: father_CIN  ? 'block' : 'none' }}   />
                                        </Col>
                                        <Col md={4}>
                                        <Button style={{ width: '100%' , backgroundColor: '#124a44',fontFamily:'Cairo',fontSize:'15px', display: father_CIN  ? 'block' : 'none'  }}   onClick={handleNavigateToParentProfile} ><MdRemoveRedEye /> مشاهدة الملف الشخصي للوالد</Button>

                                        </Col>
                                        </Row>
                                        <Form.Label className="input-text small mb-1" style={{ display:  CIN_student ? 'block' : 'none' }}> رقم بطاقة التعريف الطالب </Form.Label>
                                        <Col md={8}>
                                          <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" name='CIN_student' value={CIN_student} onChange={(e) => setCINstudent(e.target.value)} style={{ display:  CIN_student ? 'block' : 'none' }} />
                                        </Col>
                                       {/* {calculateAge(date_birth) >= 18 && (
                                            <div style={{ color: 'red', marginTop: '5px' }}>
                                              يجب أن يكون الطالب أقل من 18 عامًا لإضافة رقم بطاقة التعريف للوالد.
                                            </div>
                                          )}
                                           {/  <div className="add-parent-button" style={{ }}>
                                            <Button style={{ width: '100%' , backgroundColor: !guardianExists ? '#124a44' : 'red' }} className="scrolltoTop" disabled={!guardianExists}  onClick={() => {navigate("/AddParent");handleScrollToTop(); }}>إضافة ولي أمرك</Button>
                                             </div>*/}
                                        
                                        
                                    </>
                                
                    
                    </Col>
                    
                   
              
             </Row>
             
           </Form>
         </Card.Body>
       </Card>
     </Col>
     <Row>
     <Button variant="secondary" style={{ width: '100px' ,height:'50px', backgroundColor: '#EFAC41',fontFamily:'Cairo',fontSize:'15px',fontWeight:'700',marginBottom:'15px',borderRadius:'20px',borderColor:'#B8BDBB' }}  onClick={goBack}><MdArrowForwardIos />رجوع</Button>
     </Row>
   </Row>
   <Modal show={showParentModal} onHide={() => setShowParentModal(false)} style={{padding:'50px '}}>
        <Modal.Header closeButton>
          <Modal.Title className='titre-1'>ملف الوالد</Modal.Title>
        </Modal.Header>
      <Modal.Body >
      {parentLoading ? (
            <div>Loading...</div>
          ) : parentError ? (
            <div>Error fetching parent data: {parentError}</div>
          ) : (
            <div >
        <p style={{ fontFamily: 'Cairo, sans-serif' }}><span style={{ fontWeight: 'bold', color:'black'}}>الإسم: </span>{parentData.name}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif',float: 'left' }}><span style={{ fontWeight: 'bold', color:'black'}}>nom (French):</span> {parentData.namefrench}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif' }}><span style={{ fontWeight: 'bold', color:'black'}}>اللقب: </span>{parentData.prename}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif',float: 'left' }}><span style={{ fontWeight: 'bold', color:'black'}}>prenom (French):</span> {parentData.prenamefrench}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif' }}><span style={{ fontWeight: 'bold', color:'black'}}>البريد الالكتروني:</span> {parentData.email}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif' }}> <span style={{ fontWeight: 'bold', color:'black'}}>الهاتف القار:</span> {parentData.telephone}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif' }}><span style={{ fontWeight: 'bold', color:'black'}}>الهاتف الجوال: </span>{parentData.mobile}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif' }}><span style={{ fontWeight: 'bold', color:'black'}}>العنوان: </span>{parentData.address}</p>
        <p style={{ fontFamily: 'Cairo, sans-serif' }}><span style={{ fontWeight: 'bold', color:'black'}}>رقم بطاقة التعريف: </span>{parentData.CIN}</p>
       
        
        <Col xl={4}>
       <Card className="mb-4 mb-xl-0">
         <Card.Header className='input-text' style={{ fontFamily: 'Cairo, sans-serif' }}>صورة الولي </Card.Header>
         <Card.Body className="text-center">
           <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/parent/${parentData.parent_image}`} alt="" />
         </Card.Body>
       </Card>
     </Col>
        
     </div>
          )}

      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" style={{ fontFamily: 'Cairo, sans-serif' }} onClick={() => setShowParentModal(false)}>
            إغلاق
          </Button>
      </Modal.Footer>
    </Modal>
 </Container> 
  );
};

export default StudentProfile;
const styles = {
    attendanceButton: {
      backgroundColor: "#270843",
      "&:hover": {
        backgroundColor: "#3f1068",
      }
    }
  }
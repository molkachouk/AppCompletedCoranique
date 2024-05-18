import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { registerStudent } from '../../../redux/studentRelated/studentHandle';
import { useParams } from 'react-router-dom';
import Background from '../../../assets/signin.jpg';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { getAllGroups } from '../../../redux/groupRelated/groupHandle';
import {getAllParents} from '../../../redux/parentRelated/parentHandle'
import imageUpload from '../../../assets/upload_area.png';

import { underStudentControl } from '../../../redux/studentRelated/studentSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';



function AddStudent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { parentsList, loading: parentLoading, error: parentError } = useSelector((state) => state.parent);
    const { status, currentUser, error } = useSelector(state => state.user);
    const { groupsList, loading: groupLoading, error: groupError } = useSelector((state) => state.group);
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [prename, setPrename] = useState('');
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
    const [stud_image, setStudImage] = useState(false); 
    const [father_CIN, setFatherCin] = useState(''); 
    const role = "Student";



   /* const [formData, setFormData] = useState({
        name: '',
        prename: '',
        date_birth: '',
        place_birth: '',
        study_level: '',
        establishment: '',
        email: '',
        mobile: '',
        password: '',
        gender: '',
        name_group: '',
        memo_level: '',
        units: '',
        stud_image:false,
        father_CIN: '',
    });*/
    const [showGuardianIDField, setShowGuardianIDField] = useState(false);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const formData = new FormData();
    
        formData.append('name', name);
        formData.append('prename', prename);
        formData.append('date_birth', date_birth);
        formData.append('place_birth', place_birth);
        formData.append('study_level', study_level);
        formData.append('establishment', establishment);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('password', password);
        formData.append('gender', gender);
        formData.append('name_group', name_group);
        formData.append('memo_level', memo_level);
        formData.append('units', units);
        formData.append('stud_image', stud_image);
        if (calculateAge(date_birth) < 18) {
            formData.append('father_CIN', father_CIN);
        }       
         formData.append('role', role);
        console.log('Selected image file:', stud_image);

        try {
            console.log('Selected image file:', stud_image);

            const response = await axios.post('/api/StudentRegister', formData);
            console.log('Selected image file:', stud_image);

            console.log(response.data);
            console.log('Selected image file:', stud_image);

            toast.success('Student registered successfully.');
            setLoader(false);
            navigate('/ShowGroups');
        } catch (error) {
            console.error('Registration failed:', error);
        setLoader(false);
        if (error.response && error.response.data && error.response.data.message === "Parent not found") {
            setGuardianExists(true);
            toast.error(`الوالد/الوالدة برقم البطاقة ${father_CIN} غير موجود في النظام. يرجى إضافة الوالد/الوالدة إلى النظام`);
            window.scrollTo(0, 0);
                } else {
            toast.error('Registration failed. Please try again.');
        }
        }
    };
   
        const handleScrollToTop = () => {
            window.scrollTo({top:0, left: 0, behaviour: 'smooth'});
        };

  /*     
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [prename, setPrename] = useState('');
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
    const [stud_image, setStudImage] = useState(false); 
    const [father_CIN, setFatherCin] = useState('');  
    const [guardianExists, setGuardianExists] = useState(false);
    const [showGuardianIDField, setShowGuardianIDField] = useState(false);    
    const role = "Student";
    const handleGuardianIDChange = (e) => {
        // Assuming e.target.value contains the CIN provided by the user
        const enteredCIN = e.target.value;

        console.log("Entered CIN:", enteredCIN);
        console.log("Parents List:", parentsList);
    


        // Check if the entered CIN exists in the parent list
        //const guardianCINs = Array.isArray(parentsList) ? parentsList.map(parent => parent.CIN) : [];
       // console.log(guardianCINs)
       // const exists = guardianCINs.includes(enteredCIN);
        const exists = parentsList.some(parent => parent.CIN === enteredCIN);
        console.log("Exists:", exists);
        console.log(exists);
        setGuardianExists(exists);
        console.log(exists);
        setFatherCin(enteredCIN);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!father_CIN) {
            toast.error('Please enter the parent CIN.');
            return;
        }

        // Check if the entered parent CIN exists
        if (!guardianExists) {
            toast.error('Parent does not exist. Please add the parent first.');
            return;
        }



        if (!name_group) {
            toast.error('Please select a group.');
            return;
        }
    
        setLoader(true);
    
        try {
            const formData = new FormData();
    
            formData.append('name', name);
            formData.append('prename', prename);
            formData.append('date_birth', date_birth);
            formData.append('place_birth', place_birth);
            formData.append('study_level', study_level);
            formData.append('establishment', establishment);
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('password', password);
            formData.append('gender', gender);
            formData.append('name_group', name_group);
            formData.append('memo_level', memo_level);
            formData.append('units', units);
            formData.append('stud_image', stud_image);
            formData.append('father_CIN', father_CIN);
            formData.append('role', role);

    
    
            await dispatch(registerUser(formData, role));
           /// toast.success('Student registered successfully.');
            //navigate('/GroupDetails/' + id);
        } catch (error) {
            console.error('Registration failed:', error);
            setLoader(false);
            toast.error('Registration failed. Please try again.');
        }
    };
    
    
    useEffect(() => {
        if (status === 'added' ) {
            toast.success('Student registered successfully.');
            dispatch(underControl())
            navigate('/ShowGroups');
        } else if (status === 'failed') {
            setLoader(false);
            toast.error('Registration failed. Please try again.');

        } else if (status === 'error') {
            console.log(error);
            toast.error('An error occurred. Please try again later.');

        }
    }, [status, navigate, error]);



    const handleGroupChange = (e) => {
        setgroupName(e.target.value);
    };
    const [date_birth, setDateOfBirth] = useState("");
    const [showGuardianIDField, setShowGuardianIDField] = useState(false); 
    const handleDateOfBirthChange = (e) => {
        setDateOfBirth(e.target.value);
        const age = calculateAge(e.target.value);
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
    };

    

    
    
/*
   
   // const guardianCINs = Array.isArray(parentsList) ? parentsList.map(parent => parent.CIN) : [];
   // const guardianExists = guardianCINs.includes(father_CIN);
//console.log(guardianCINs)

/*const handleAddParent = () => {

    //const guardianExists = guardianCINs.includes(father_CIN);
    if (!guardianExists) {
        toast.error('Parent does not exist. Please add the parent first.');
        navigate("/AddParent");
    }


};*/

//console.log(guardianExists)*/

    return (
        <Container fluid className="px-4 mt-4">
            <Row className='d-flex justify-content-center align-items-center' >

                <Col xl={4}>
                    <Card className='mb-4 mb-xl-0' >
                        <Card.Body className='text-center'>

                            <h2 className="fw-bold mb-2 text-center" style={{ color: "#AF4E09" }}>إضافة تلميذ</h2>
                            <Form onSubmit={handleSubmit} encType='multipart/form-data'>

                            <Form.Label className="small mb-1"> الإسم </Form.Label>
                                <Form.Control type="text" placeholder="ادخل اسمك الكامل" name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                                <Form.Label className="small mb-1"> اللقب </Form.Label>
                                <Form.Control type="text" placeholder="ادخل اللقب " name='prename' value={prename} onChange={(e)=>setPrename(e.target.value)} />
                                <Form.Label className="small mb-1"> تاريخ الولادة </Form.Label>
                                <Form.Control type="date" placeholder="ادخل  تاريخ الولادة" name='date_birth' value={date_birth}  onChange={handleDateOfBirthChange} />
                               
                                {showGuardianIDField  && (
                                    <>
                                        <Form.Label className="small mb-1"> رقم بطاقة التعريف الولي </Form.Label>
                                        <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" name='father_CIN' value={father_CIN} onChange={(e)=>setFatherCin(e.target.value)}   />
                                        
                                            <div className="add-parent-button" style={{ }}>
                                            <Button style={{ width: '100%' , backgroundColor: !guardianExists ? '#124a44' : 'red' }} className="scrolltoTop" disabled={!guardianExists}  onClick={() => {navigate("/AddParent");handleScrollToTop(); }}>إضافة ولي أمرك</Button>
                                             </div>
                                        
                                        
                                    </>
                                )}
                                
                                <Form.Label className="small mb-1"> مكان الولادة </Form.Label>
                                <Form.Control type="text" placeholder="ادخل  مكان الولادة" name='place_birth' value={place_birth} onChange={(e)=>setPlaceOfBirth(e.target.value)} />
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

                                <Form.Label className="small mb-1"> البريد الالكتروني</Form.Label>
                                <Form.Control type="email" placeholder="ادخل البريد الالكتروني" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  />

                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> الهاتف الجوال</Form.Label>
                                <Form.Control type="tel" id="phone"  pattern="[0-9]{2}[0-9]{3}[0-9]{3}" placeholder="ادخل أدخل رقم الهاتف" name='mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)} /> 

                                <Form.Label className="small mb-1">كلمة العبور</Form.Label>
                                <Form.Control type="password" placeholder="ادخل كلمة العبور" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  />


                                
    
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
                                <Form.Label className="small mb-1">إضافة الى مجموعة </Form.Label>
                                <Form.Select name='name_group' value={name_group} onChange={(e)=>setgroupName(e.target.value)}>
    <option></option>
    {groupLoading ? (
        <option>Loading...</option>
    ) : groupError ? (
        <option>Error: {groupError.message}</option>
    ) : (
        Array.isArray(groupsList) ? (
            groupsList.map((group) => (
                <option key={group._id} value={group._id}>
                    {group.name_group}
                </option>
            ))
        ) : (
            <option>Error: Invalid data</option>
        )
    )}
</Form.Select>
                                <Form.Label  className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> صورة الشخصية</Form.Label>
                                <Form.Control  onChange={(e) => setStudImage(e.target.files[0])} type="file" placeholder="قم بتحميل صورتك" name="stud_image" id="stud_image" accept=".png, .jpg, .jpeg"  />
                                <img src={stud_image?URL.createObjectURL(stud_image):imageUpload} alt='' style={{width:'120px',padding:'10px 0px 0px 0px'}}/>
                                
                            

                                <Button type="submit" disabled={loader} style={{ width: '100%', backgroundColor: '#124a44' }}>

                                    {loader ? <CircularProgress size={24} color="inherit" /> : 'إضافة '}
                                </Button>
                                <div className="toast-container" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: '9999' }}>
                                 <ToastContainer  position="bottom-left" />
                                 </div>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>



            </Row>
        </Container>
    )
}


export default AddStudent
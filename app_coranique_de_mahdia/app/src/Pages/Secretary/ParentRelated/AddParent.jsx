import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/userRelated/userHandle';

import Background from '../../../assets/signin.jpg';
import { CircularProgress } from '@mui/material';
import { ToastContainer,toast } from 'react-toastify';
import { underControl } from '../../../redux/userRelated/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button,Card } from 'react-bootstrap';
import imageUpload from '../../../assets/upload_area.png';

import axios from 'axios';

function AddParent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, error } = useSelector(state => state.user);

   
    const [loader, setLoader] = useState(false);
   
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [prename, setPrename] = useState("");
    const [namefrench, setNamefrench] = useState("");
    const [prenamefrench, setPrenamefrench] = useState("");
    const [email, setEmail] = useState("");
    const[telephone,setTelephone]  = useState("");
    const[mobile,setMobile]  = useState("");
    const[address,setAddress]  = useState("");
    const[CIN,setCIN]  = useState("");
    const [password, setPassword] = useState("");
    const [parent_image, setParentImage] = useState(false); 


    const role = "Parent";
 
   /* const handleSubmit = async(e) => {
     
        e.preventDefault();
        try {
            setLoader(true);

            const response = await axios.post('/api/ParentRegister', {
                name,
                prename,
                namefrench,
                prenamefrench,
                email,
                telephone,
                mobile,
                address,
                CIN,
                password,
                parent_image,
                role
            });

            if (response.status === 200) {
                toast.success("👌تم التسجيل بنجاح", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            navigate(-1);

            setLoader(false);
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error("فشل التسجيل. يرجى المحاولة مرة أخرى.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoader(false);
        }
    };*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const formData = new FormData();

        formData.append('name', name);
        formData.append('prename', prename);
        formData.append('namefrench', namefrench);
        formData.append('prenamefrench', prenamefrench);
        formData.append('email', email);
        formData.append('telephone', telephone);
        formData.append('mobile', mobile);
        formData.append('address', address);
        formData.append('CIN', CIN);
        formData.append('password', password);
        formData.append('parent_image', parent_image);
        formData.append('role', role);

        try {
            const response = await axios.post('/api/ParentRegister', formData);

            if (response.status === 200) {
                toast.success("👌تم التسجيل بنجاح", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            navigate(-1);
            setLoader(false);
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error("فشل التسجيل. يرجى المحاولة مرة أخرى.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoader(false);
        }
    };

  return (
    <Container fluid className="px-4 mt-4">
    <Row className='d-flex justify-content-center align-items-center' >
    
        <Col xl={4}>
        <Card className='mb-4 mb-xl-0' >
    <Card.Body className='text-center'>

    <h2 className="fw-bold mb-2 text-center" style={{ color: "#AF4E09", fontFamily: 'Cairo, sans-serif', fontSize: '40px' }}>إضافة ولي</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  الإسم </Form.Label>
                        <Form.Control type="text" placeholder="ادخل  الإسم" value={name} onChange={(e) => setName(e.target.value)} />
                        </Col>
                        <Col>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}>  nom </Form.Label>
                        <Form.Control type="text" placeholder="  enter le nom" value={namefrench} onChange={(e) => setNamefrench(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> اللقب </Form.Label>
                        <Form.Control type="text" placeholder="ادخل  اللقب" value={prename} onChange={(e) => setPrename(e.target.value)} />
                        </Col>
                        <Col>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}> prenom </Form.Label>
                        <Form.Control type="text" placeholder="enter le prenom" value={prenamefrench} onChange={(e) => setPrenamefrench(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  الهاتف القار</Form.Label>
                        <Form.Control type="tel" id="phone" name="phone"  pattern="7[0-9]{7}" placeholder=" أدخل رقم الهاتف القار" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </Col>
                        <Col>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> الهاتف الجوال</Form.Label>
                        <Form.Control type="tel" id="phone" name="phone" pattern="[0-9]{2}[0-9]{3}[0-9]{3}"  placeholder="ادخل  رقم الهاتف الجوال" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </Col>
                    </Row>
                    <Form.Label className="small mb-1"> البريد الالكتروني</Form.Label>
                    <Form.Control type="email" placeholder="ادخل البريد الالكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  العنوان</Form.Label>
                        <Form.Control type="text" placeholder=" ادخل  العنوان الكامل المتكون من الشارع-المعتمدية-الولاية-رقم البريدي" value={address} onChange={(e) => setAddress(e.target.value)} /> 
                        
        
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  رقم بطاقة التعريف</Form.Label>
                        <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" maxLength="8" value={CIN} onChange={(e) => setCIN(e.target.value)} /> 
                    
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>كلمة العبور</Form.Label>
                        <Form.Control type="password" placeholder="ادخل كلمة العبور" value={password} onChange={(e) => setPassword(e.target.value)} />
                         
                        <Form.Label  className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> صورة الشخصية</Form.Label>
                        <Form.Control  onChange={(e) => setParentImage(e.target.files[0])} type="file" placeholder="قم بتحميل صورتك" name="parent_image" id="parent_image" accept=".png, .jpg, .jpeg"  />
                        <img src={parent_image?URL.createObjectURL(parent_image):imageUpload} alt='' style={{width:'120px',padding:'10px 0px 0px 0px'}}/>
                                
                    
                         

                       
                    



                    
                    <Button  type="submit" disabled={loader} style={{ width: '100%',backgroundColor: '#124a44', marginTop: '25px'  }}>

                        {loader ? <CircularProgress size={24} color="inherit" /> : 'إضافة '}
                    </Button>
                    <ToastContainer />
                </Form>
                </Card.Body>
  </Card>

</Col>

       
      
    </Row>
</Container>
  )
}


export default AddParent
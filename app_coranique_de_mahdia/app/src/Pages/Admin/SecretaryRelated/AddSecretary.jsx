import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Background from '../../../assets/signin.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageUpload from '../../../assets/upload_area.png';

const AddSecretaire = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(false); 
    

    const role = 'Secretary';

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoader(true);

        try {
            const formData = new FormData(); // Create a new FormData object

            // Append form data fields to FormData object
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image); // Append the file to the FormData object
            formData.append('role', role);
            console.log('Form Data:', formData); // Debugging console log

            await dispatch(registerUser(formData, role));
           
        } catch (error) {
            console.error('Registration failed:', error);
            setLoader(false);
        }
    };
    

    useEffect(() => {
        if (status === 'added' ) {
            dispatch(underControl())
            navigate('/ShowSecretary');
        } else if (status === 'failed') {
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, navigate, error]);
   

    return (
        <Container fluid className="px-4 mt-4">
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xl={4}>
                    <Card className='mb-4 mb-xl-0'>
                        <Card.Body className='text-center'>
                            <h2 className="fw-bold mb-2 text-center" style={{ color: "#AF4E09", fontFamily: 'Cairo, sans-serif', fontSize: '40px' }}>إضافة سكرتير</h2>
                            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> البريد الالكتروني</Form.Label>
                                <Form.Control type="email" placeholder="ادخل البريد الالكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>اسمك الكامل</Form.Label>
                                <Form.Control type="text" placeholder="ادخل اسمك الكامل" value={name} onChange={(e) => setName(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>كلمة العبور</Form.Label>
                                <Form.Control type="password" placeholder="ادخل كلمة العبور" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Form.Label htmlFor="image" className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> صورة الشخصية</Form.Label>
                                <Form.Control onChange={(e) => setImage(e.target.files[0])} type="file" placeholder="قم بتحميل صورتك" name="image" id="image" accept=".png, .jpg, .jpeg"  />
                                <img src={image?URL.createObjectURL(image):imageUpload} alt='' style={{width:'120px',padding:'10px 0px 0px 0px'}}/>

                                <Button type="submit" disabled={loader} style={{ width: '100%', backgroundColor: '#124a44', marginTop: '25px' }}>
                                    {loader ? <CircularProgress size={24} color="inherit" /> : 'إضافة '}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddSecretaire;

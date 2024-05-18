import React from 'react'
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { underEventControl } from '../../../redux/eventRelated/eventSlice';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import imageUpload from '../../../assets/upload_area.png';
import { addEvent } from '../../../redux/eventRelated/eventHandle';
export default function AddEvent() {
  const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, error } = useSelector(state => state.event);

    const [loader, setLoader] = useState(false);
    const [title_event, setTitle] = useState('');
    const [description_event, setDescription] = useState('');
    const [name_event, setName] = useState('');
    const [location_event, setLocation] = useState('');
    const [date_event, setDate] = useState('');
    const [time_event, setTime] = useState('');
    const [images, setImages] = useState(false); 
   // console.log(status)
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoader(true);

        try {
            
            const formData = new FormData(); // Create a new FormData object

            // Append form data fields to FormData object
            formData.append('name_event', name_event);
            formData.append('title_event', title_event);
            formData.append('description_event', description_event);
            formData.append('location_event', location_event);
            formData.append('date_event', date_event);
            formData.append('time_event', time_event);
            formData.append('images', images); // Append the file to the FormData object
            console.log('Form Data:', formData); // Debugging console log

            await dispatch(addEvent(formData, "Event"));
            navigate('/EventList');
        } catch (error) {
            console.error('add event failed:', error);
            setLoader(false);
        }
    };
    
    console.log(status)
    useEffect(() => {
       
        if (status === 'added' ) {
            dispatch(underEventControl())
            navigate('/EventList');
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
                            <h2 className="fw-bold mb-2 text-center" style={{ color: "#AF4E09", fontFamily: 'Cairo, sans-serif', fontSize: '40px' }}>إضافة تظاهرة</h2>
                            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>    إسم التظاهرة     </Form.Label>
                                <Form.Control type="text" placeholder="    أدخل إسم التظاهرة             " value={name_event} onChange={(e) => setName(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>    عنوان التظاهرة    </Form.Label>
                                <Form.Control type="text" placeholder="ادخل عنوان التظاهرة" value={title_event} onChange={(e) => setTitle(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>    وصف    </Form.Label>
                                <Form.Control type="text" placeholder="ادخل وصف" value={description_event} onChange={(e) => setDescription(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>        المكان          </Form.Label>
                                <Form.Control type="text" placeholder="ادخل المكان" value={location_event} onChange={(e) => setLocation(e.target.value)} />
                                <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>    تاريخ التظاهرة     </Form.Label>
                                <Col md={6} style={{margin:'0px 130px 0px 0px '}}>
                <Form.Label className=" small mb-1">تاريخ الحدث</Form.Label>
                <Form.Control className='text-center'
                    type="date" 
                    value={date_event } 
                    onChange={(e) => setDate(e.target.value)}
                    autoComplete="date" 
                    required 
                />
            </Col>
            <Col md={6} style={{margin:'0px 130px 0px 0px '}}>
                <Form.Label className=" small mb-1">زمن الحدث</Form.Label>
                <Form.Control 
                    type="time" 
                    value={time_event} 
                    onChange={(e) => setTime(e.target.value)}
                    autoComplete="time" 
                    required 
                />
            </Col>                                <Form.Label htmlFor="images" className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>        أضف صورة التظاهرة</Form.Label>
                                <Form.Control onChange={(e) => setImages(e.target.files[0])} type="file" placeholder="قم بتحميل الصورة" name="images" id="images" accept=".png, .jpg, .jpeg"  />
                                <img src={images?URL.createObjectURL(images):imageUpload} alt='' style={{width:'120px',padding:'10px 0px 0px 0px'}}/>

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
}

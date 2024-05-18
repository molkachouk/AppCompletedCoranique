import React from 'react'
import  { useState, useEffect } from 'react';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../../../redux/eventRelated/eventHandle';
import axios from 'axios';
import '../../../Styles/seretaryProfile.css';
export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { secretarysList } = useSelector((state) => state.event);
  const [title_event, setTitle] = useState('');
    const [description_event, setDescription] = useState('');
    const [name_event, setName] = useState('');
    const [location_event, setLocation] = useState('');
    const [date_event, setDate] = useState('');
    const [time_event, setTime] = useState('');
    const [images, setImages] = useState(''); 
  const [previewImage, setPreviewImage] = useState(false);

  const url = "http://localhost:5000";

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`${url}/api/Events/${id}`);
        const eventData = response.data;
        setName(eventData.name_event);
        setTitle(eventData.title_event);
        setDescription(eventData.description_event);
        setLocation(eventData.location_event);
        setDate(eventData.date_event);
        setTime(eventData.time_event);

        setImages(eventData.images);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    }
    fetchEvent();
  }, [id]);


  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImages(selectedFile);
    
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

  const submitHandler = async(event) => {
    event.preventDefault();
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

      await  dispatch(updateEvent(formData, id, "Event"));
      
      navigate(-1);
  } catch (error) {
      console.error('update Secretary failed:', error);
      setLoader(false);
  }
    /*
    const fields = { name, email, image };
    dispatch(updateUser(fields, id, "Secretary"));
    navigate(-1);*/
  }
  
  

  return (
    <Container fluid className="px-4 mt-4">
                    <Form onSubmit={submitHandler} encType='multipart/form-data'>

      <Nav className="nav nav-borders">
        <Nav.Link className='titre'>تغيير معطيات الحدث</Nav.Link>
      </Nav>
      <hr className="mt-0 mb-4" />
      <Row className='all-row'>
        <Col xl={4}>
          
          <Card className="mb-4 mb-xl-0">
            <Card.Header className='photo-text'>تغيير صورة التظاهرة</Card.Header>
            <Card.Body className="text-center">
              
            {previewImage ? (
    <img className="img-account-profile  mb-2  img-fluid" src={previewImage} alt="Preview" />
  ) : (
    <img className="img-account-profile  mb-2 img-fluid" src={`${url}/event_images/${images}`} alt="Current" />
  )}              <div className="small font-italic text-muted mb-4">JPG أو PNG بحجم لا يتجاوز 5 ميجابايت</div>
              <Form.Group className="mb-3">
              <Form.Label className="input-text small">تحميل صورة جديدة</Form.Label>
              <Form.Control type="file" name="images" id="images" accept=".png, .jpg, .jpeg" style={{ backgroundColor: '#124a44' }} onChange={handleImageChange} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="mb-4">
            <Card.Header className='photo-text'>تفاصيل التظاهرة</Card.Header>
            <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1">الاسم التظاهرة</Form.Label>
                    <Form.Control type="text"  value={name_event}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1">عنوان التظاهرة </Form.Label>
                    <Form.Control type="text"  value={title_event}
                      onChange={(event) => setTitle(event.target.value)}
                      autoComplete="text" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1">وصف</Form.Label>
                    <Form.Control type="text"  value={description_event}
                      onChange={(event) => setDescription(event.target.value)}
                      autoComplete="text" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1">المكان</Form.Label>
                    <Form.Control type="text"  value={location_event}
                      onChange={(event) => setLocation(event.target.value)}
                      autoComplete="text" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                <Col md={6}>
    <Form.Label className="input-text small mb-1" >تاريخ الحدث</Form.Label>
    <Form.Control 
        type="date" 
        value={date_event } 
        onChange={(event) => setDate(event.target.value)}
        autoComplete="date" 
        required 
    />
</Col>
<Col md={6}>
    <Form.Label className="input-text small mb-1">زمن الحدث</Form.Label>
    <Form.Control 
        type="time" 
        value={time_event } 
        onChange={(event) => setTime(event.target.value)}
        autoComplete="time" 
        required 
    />
</Col>
                </Row>
                
                <Button className='' style={{ fontSize:'17px',fontFamily:'Cairo',fontWeight:'600',backgroundColor: '#124a44' }} type="submit">حفظ التغييرات</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Form>

    </Container>
  );
}

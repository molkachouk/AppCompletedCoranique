import React, { useState, useEffect } from 'react';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/userRelated/userHandle';
import axios from 'axios';
import '../../../Styles/seretaryProfile.css';


function UpdateSecretary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { secretarysList } = useSelector((state) => state.secretary);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(false);

  const url = "http://localhost:5000";

  useEffect(() => {
    async function fetchSecretary() {
      try {
        const response = await axios.get(`${url}/api/Secretary/${id}`);
        const secretaryData = response.data;
        setName(secretaryData.name);
        setEmail(secretaryData.email);
        setImage(secretaryData.image);
      } catch (error) {
        console.error('Error fetching secretary data:', error);
      }
    }
    fetchSecretary();
  }, [id]);


  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    
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
      formData.append('name', name);
      formData.append('email', email);
      formData.append('image', image); // Append the file to the FormData object
      console.log('Form Data:', formData); // Debugging console log

      await  dispatch(updateUser(formData, id, "Secretary"));
      
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
    <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/images/${image}`} alt="Current" />
  )}              <div className="small font-italic text-muted mb-4">JPG أو PNG بحجم لا يتجاوز 5 ميجابايت</div>
              <Form.Group className="mb-3">
              <Form.Label className="input-text small">تحميل صورة جديدة</Form.Label>
              <Form.Control type="file" name="image" id="image" accept=".png, .jpg, .jpeg" style={{ backgroundColor: '#124a44' }} onChange={handleImageChange} />
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
                    <Form.Label className="input-text small mb-1">الاسم الأول</Form.Label>
                    <Form.Control type="text" placeholder="أدخل الاسم الأول" value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1">عنوان البريد الإلكتروني</Form.Label>
                    <Form.Control type="email" placeholder="أدخل عنوان بريدك الإلكتروني" value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email" required />
                  </Col>
                </Row>
                <Button className='input-text' style={{ backgroundColor: '#124a44' }} type="submit">حفظ التغييرات</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Form>

    </Container>
  );
}

export default UpdateSecretary;

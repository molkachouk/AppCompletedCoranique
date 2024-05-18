import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../../../Styles/seretaryProfile.css';


const SecretaryProfile = () => {
  const url="http://localhost:5000";
 const { id } = useParams();
const[error,setError]=useState('');
const [loading,setLoading]= useState(true);
 const p = useParams();
  const dispatch = useDispatch();
 

const [secretary,setSecretary] = useState(null);
  useEffect(() => {
  (async()=> {
    try {
     
      const result = await axios.get(`${url}/api/Secretary/${id}`);
      if(result)
      {
        setLoading(false);
        setSecretary(result.data);
        
      }
      else 
      {
        setLoading(false);
        setError("error");
      }
  } catch (error) {
    console.log(error);
  }

  })()
   
    
  }, [id, dispatch]);
  if(error)return 'Error'
  

  return (
    (loading &&  'loading' ||       <Container fluid className="px-4 mt-4">
    <Nav className="nav nav-borders">
      <Nav.Link className='titre'>الملف الشخصي</Nav.Link>
    </Nav>
    <hr className="mt-0 mb-4" />
   
      <Row className='all-row'>
        <Col xl={4}>
          <Card className="mb-4 mb-xl-0">
            <Card.Header className='photo-text' >صورة الملف الشخصي</Card.Header>
            <Card.Body className="text-center">
              <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/images/${secretary.image}`} alt="" />
              <div className="small font-italic text-muted mb-4" > </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="mb-4 ">
            <Card.Header className='photo-text'>تفاصيل الحساب</Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1" >الاسم الأول</Form.Label>
                    <Form.Control type="text" value={secretary.name} readOnly />
                
                    <Form.Label className="input-text small mb-1">عنوان البريد الإلكتروني</Form.Label>
                    <Form.Control type="text" value={secretary.email} readOnly />
                  </Col>
                  
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  
  </Container> )
  
  );
};

export default SecretaryProfile;
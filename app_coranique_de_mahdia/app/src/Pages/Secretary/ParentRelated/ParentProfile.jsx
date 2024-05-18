import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function ParentProfile() {
  const { id } = useParams();
const[error,setError]=useState('');
const [loading,setLoading]= useState(true);
 
  const dispatch = useDispatch();

const [parent,setParent] = useState(null);
  useEffect(() => {
  (async()=> {
    try {
        
      const result = await axios.get(`http://localhost:5000/api/Parent/${id}`);
      if(result)
      {
        setLoading(false);
        setParent(result.data);
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
      <Nav.Link>الملف الشخصي</Nav.Link>
    </Nav>
    <hr className="mt-0 mb-4" />
   
      <Row>
        <Col xl={4}>
          <Card className="mb-4 mb-xl-0">
            <Card.Header>صورة الملف الشخصي</Card.Header>
            <Card.Body className="text-center">
              <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
              <div className="small font-italic text-muted mb-4"> </div>
              <Button style={{ backgroundColor: '#124a44' }}>تحميل صورة جديدة</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="mb-4 ">
            <Card.Header>تفاصيل الحساب</Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="small mb-1">الاسم الأول</Form.Label>
                    <Form.Control type="text" value={parent.name} readOnly />
                    </Col>
                    <Col md={6}>
                    <Form.Label className="small mb-1">عنوان البريد الإلكتروني</Form.Label>
                    <Form.Control type="text" value={parent.email} readOnly />
                   
                  </Col>
                  
                </Row>
                <Row>
                <Col md={6}>
                <Form.Label className="small mb-1">رقم الهاتف</Form.Label>
                    <Form.Control type="tel" placeholder="أدخل رقم هاتفك" value={parent.mobile} readOnly />
                    </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  
  </Container> )
  );
}

export default ParentProfile;
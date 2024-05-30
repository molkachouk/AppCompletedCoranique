import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ParentProfile() {
  const navigate = useNavigate();

  const { id } = useParams();
const[error,setError]=useState('');
const [loading,setLoading]= useState(true);
 
  const dispatch = useDispatch();
  const url = "http://localhost:5000";
  const [parent_image, setParentImage] = useState(false); 

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
  useEffect(() => {
    async function fetchParent() {
      try {
        const response = await axios.get(`${url}/api/Parent/${id}`);
        const parentData = response.data;
        
        setParentImage(parentData.parent_image );
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
    fetchParent();
  }, [id]);
  const goBack = () => {
    navigate(-1); // Go back to the previous page
};
  
  return (
    (loading &&  'loading' ||       <Container fluid className="px-4 mt-4">
    <Nav className="nav nav-borders">
      <Nav.Link className='titre'>الملف الشخصي للولي</Nav.Link>
    </Nav>
    <hr className="mt-0 mb-4" />
   
      <Row>
        <Col xl={4}>
          <Card className="mb-4 mb-xl-0">
            <Card.Header className='titre-1'>صورة الولي </Card.Header>
            <Card.Body className="text-center">
            <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/parent/${parent_image}`} alt="" />
              <div className="small font-italic text-muted mb-4"> </div>
              <Button style={{ backgroundColor: '#124a44' }}>تحميل صورة جديدة</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="mb-4">
            <Card.Header className='titre-1'>تفاصيل الحساب</Card.Header>
            <Card.Body>
             
                <Row className="mb-3">
                  <Col md={6}>
                  <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  الإسم </Form.Label>
                        <Form.Control type="text" placeholder="ادخل  الإسم" value={parent.name} onChange={(e) => setName(e.target.value)} />
                        
                  </Col>
                  <Col md={6}>
                  <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}>  nom </Form.Label>
                        <Form.Control type="text" placeholder="  enter le nom" value={parent.namefrench} onChange={(e) => setNamefrench(e.target.value)} />
                  </Col>
                </Row>  
                <Row className="mb-3">
                <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> اللقب </Form.Label>
                        <Form.Control type="text" placeholder="ادخل  اللقب" value={parent.prename} onChange={(e) => setPrename(e.target.value)} />
                        </Col>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}> prenom </Form.Label>
                        <Form.Control type="text" placeholder="enter le prenom" value={parent.prenamefrench} onChange={(e) => setPrenamefrench(e.target.value)} />
                        </Col>
                      
                 
                </Row>
                <Row>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  الهاتف القار</Form.Label>
                        <Form.Control type="tel" id="phone" name="phone"  pattern="7[0-9]{7}" placeholder=" أدخل رقم الهاتف القار" value={parent.telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </Col>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> الهاتف الجوال</Form.Label>
                        <Form.Control type="tel" id="phone" name="phone" pattern="[0-9]{2}[0-9]{3}[0-9]{3}"  placeholder="ادخل  رقم الهاتف الجوال" value={parent.mobile} onChange={(e) => setMobile(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> البريد الالكتروني</Form.Label>
                    <Form.Control type="email" placeholder="ادخل البريد الالكتروني" value={parent.email} onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  العنوان</Form.Label>
                        <Form.Control type="text" placeholder=" ادخل  العنوان الكامل المتكون من الشارع-المعتمدية-الولاية-رقم البريدي" value={parent.address} onChange={(e) => setAddress(e.target.value)} /> 
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  رقم بطاقة التعريف</Form.Label>
                        <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" maxLength="8" value={parent.CIN} onChange={(e) => setCIN(e.target.value)} /> 
                    
                        </Col>
                        
                    </Row>
                
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button variant="secondary" style={{ width: '100px' ,height:'50px', backgroundColor: '#EFAC41',fontFamily:'Cairo',fontSize:'15px',fontWeight:'700',marginBottom:'15px',borderRadius:'20px',borderColor:'#B8BDBB' }}  onClick={goBack}><MdArrowForwardIos />رجوع</Button>

  </Container> )
  );
}

export default ParentProfile;
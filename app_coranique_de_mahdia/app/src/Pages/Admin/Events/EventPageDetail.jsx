import React from 'react'
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../../../Styles/seretaryProfile.css';




export default function EventPageDetail() {
  const url="http://localhost:5000";
  const { id } = useParams();
 const[error,setError]=useState('');
 const [loading,setLoading]= useState(true);
  const p = useParams();
   const dispatch = useDispatch();
  
 
 const [event,setEvent] = useState(null);
   useEffect(() => {
   (async()=> {
     try {
      
       const result = await axios.get(`${url}/api/Events/${id}`);
       if(result)
       {
         setLoading(false);
         setEvent(result.data);
         
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
       <Nav.Link className='titre'>  معطيات الحدث </Nav.Link>
     </Nav>
     <hr className="mt-0 mb-4" />
    
       <Row className='all-row'>
         <Col xl={4}>
           <Card className="mb-4 mb-xl-0">
             <Card.Header className='photo-text' > صورة التظاهرة   </Card.Header>
             <Card.Body className="text-center">
               <img className="img-account-profile  mb-2 img-fluid" src={`${url}/event_images/${event.images}`} alt="" />
               <div className="small font-italic text-muted mb-4" > </div>
             </Card.Body>
           </Card>
         </Col>
         <Col xl={8}>
           <Card className="mb-4 ">
             <Card.Header className='photo-text'> </Card.Header>
             <Card.Body>
               <Form>
                 <Row className="mb-3">
                   <Col md={6}>
                     <Form.Label className="input-text small mb-1" > إسم التظاهرة</Form.Label>
                     <Form.Control type="text" value={event.name_event} readOnly />
                 
                     <Form.Label className="input-text small mb-1">عنوان التظاهرة</Form.Label>
                     <Form.Control type="text" value={event.title_event} readOnly />
                     <Form.Label className="input-text small mb-1">وصف </Form.Label>
                     <Form.Control type="text" value={event.description_event} readOnly />
                     <Form.Label className="input-text small mb-1">المكان </Form.Label>
                     <Form.Control type="text" value={event.location_event} readOnly />
                     <Row className="mb-3">
                     <Col md={6}>
                        <Form.Label className="input-text small mb-1" >تاريخ الحدث</Form.Label>
                        <Form.Control 
                       type="date" 
                       value={event.date_event} 
                       onChange={(event) => setDate(event.target.value)}
                       readOnly 
                        />
                      </Col>
<Col md={6}>
    <Form.Label className="input-text small mb-1" style={{fontSize:'13px',fontFamily:'Cairo',fontWeight:'600',color:'#AF4E09'}}>زمن الحدث</Form.Label>
    <Form.Control 
        type="time" 
        value={event.time_event } 
        onChange={(event) => setTime(event.target.value)}
        autoComplete="time" 
        readOnly 
    />
</Col>
</Row>
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

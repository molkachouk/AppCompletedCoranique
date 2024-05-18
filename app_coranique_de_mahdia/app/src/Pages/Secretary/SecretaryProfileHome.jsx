import React,{useState} from 'react';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer le fichier CSS de Bootstrap
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userRelated/userHandle';

import '../../Styles/seretaryProfile.css';
import { Avatar } from '@mui/material';

   

     

     

    // const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

    // const submitHandler = (event) => {
    //     event.preventDefault()
    //     dispatch(updateUser(fields, currentUser._id, address))
    // }

    // const deleteHandler = () => {
    //     try {
    //         dispatch(deleteUser(currentUser._id, "Students"));
    //         dispatch(deleteUser(currentUser._id, address));
    //         dispatch(authLogout());
    //         navigate('/');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
function SecretaryProfileHome() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url="http://localhost:5000";
  const { currentUser, response, error } = useSelector((state) => state.user);
    

     if (response) { console.log(response) }
     else if (error) { console.log(error) }

     const [name, setName] = useState(currentUser.name);
     const [email, setEmail] = useState(currentUser.email);
     
    // const [mobile, setMobile] = useState(currentUser.mobile);

     const submitHandler = async(event) => {
      event.preventDefault();
      try {
        const formData = new FormData(); // Create a new FormData object
  
        // Append form data fields to FormData object
        formData.append('name', name);
        formData.append('email', email);
      //  formData.append('mobile', mobile); // Append the file to the FormData object
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
      <Nav className="nav nav-borders">
        <Nav.Link className='titre'>الملف الشخصي</Nav.Link>
      </Nav>
      <hr className="mt-0 mb-4" />
      <Row className='all-row'>
      <Col xl={4}>
          <Card className="mb-4 mb-xl-0">
            <Card.Header className='photo-text' >صورة الملف الشخصي</Card.Header>
            <Card.Body className="text-center">
            <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/images/${currentUser.image}`} alt="" />              <div className="small font-italic text-muted mb-4" > </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="mb-4">
            <Card.Header className='photo-text'>تفاصيل الحساب</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1">الاسم الأول</Form.Label>
                    <Form.Control type="text" placeholder="أدخل الاسم الأول" value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="input-text small mb-1">عنوان البريد الإلكتروني</Form.Label>
                    <Form.Control type="email" placeholder="أدخل عنوان بريدك الإلكتروني"   value={email}
                            onChange={(event) => setEmail(event.target.value)}  
                            autoComplete="email" required />
                  </Col>
                </Row>
                {/* <Row className="mb-3">
                 
                 
               
                  <Col md={6}>
                    <Form.Label className="small mb-1">رقم الهاتف</Form.Label>
                    <Form.Control type="tel" placeholder="أدخل رقم هاتفك"   value={mobile}
                            onChange={(event) => setMobile(event.target.value)}  
                            autoComplete="email" required  />
                  </Col>
                </Row> */}
                <Button className='input-text' style={{ backgroundColor: '#124a44' }} type="submit">حفظ التغييرات</Button>

                {/* <Button style={{backgroundColor:'#124a44'}} type="button">حفظ التغييرات</Button> */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SecretaryProfileHome;

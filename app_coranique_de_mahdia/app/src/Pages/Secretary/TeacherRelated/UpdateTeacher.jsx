import {React,useState} from 'react';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer le fichier CSS de Bootstrap
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { updateUser } from '../../../redux/userRelated/userHandle';

import { useParams } from 'react-router-dom';
function UpdateTeacher() {
  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? 'Cancel' : 'Edit profile';
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { response, error,teachersList } = useSelector((state) => state.teacher);
  const address = "Teacher";

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [type_etude , setTypeEtude] = useState("");


  teachersList && teachersList.length > 0 && teachersList.map((teacher) => {
    return {
      name: teacher.name,
      email: teacher.email,
      mobile: teacher.mobile,
      type_etude: teacher.type_etude,
      id: teacher._id,
    };
  });
  const fields = { name, email,mobile,type_etude};

  const submitHandler = (event) => {
    event.preventDefault()
  
    dispatch(updateUser(fields, id, address));
    navigate('/ShowTeachers');
  }

   

  return (
    <Container fluid className="px-4 mt-4">
   

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
              <div className="small font-italic text-muted mb-4">JPG أو PNG بحجم لا يتجاوز 5 ميجابايت</div>
              <Button style={{ backgroundColor: '#124a44' }}>تحميل صورة جديدة</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="mb-4">
            <Card.Header>تفاصيل الحساب</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="small mb-1">الاسم الأول</Form.Label>
                    <Form.Control type="text" placeholder="أدخل الاسم الأول" value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name" required />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="small mb-1">عنوان البريد الإلكتروني</Form.Label>
                    <Form.Control type="email" placeholder="أدخل عنوان بريدك الإلكتروني" value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                <Col md={6}>
                    <Form.Label className="small mb-1">رقم الهاتف</Form.Label>
                    <Form.Control type="tel" placeholder="أدخل رقم هاتفك" value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                      autoComplete="new-password" />
                       </Col>
                       <Col md={6}>
                       <Form.Label className="small mb-1">الاختصاص </Form.Label>
                        <Form.Control as="select" value={type_etude} onChange={(e) => setTypeEtude(e.target.value) }>
                        <option value="تجويد">  اختر لاختصاص </option>
                      
                        <option value="تجويد">تجويد</option>
                        <option value="تحفيظ">تحفيظ</option>
                    


</Form.Control>
                  </Col>
                 
                </Row>
                
                <Button style={{ backgroundColor: '#124a44' }} type="submit">حفظ التغييرات</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateTeacher;
const styles = {
  attendanceButton: {
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    }
  }
}
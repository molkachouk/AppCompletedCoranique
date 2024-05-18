import {React,useEffect,useState} from 'react';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer le fichier CSS de Bootstrap
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { updateUser } from '../../../redux/userRelated/userHandle';

import { useParams } from 'react-router-dom';
import axios from 'axios';
function UpdateParent() {
  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? 'Cancel' : 'Edit profile';
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { response, error,parentsList } = useSelector((state) => state.parent);

  const [loader, setLoader] = useState(false);
   
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [prename, setPrename] = useState("");
  const [namefrench, setNamefrench] = useState("");
  const [prenamefrench, setPrenamefrench] = useState("");
  const [email, setEmail] = useState("");
  const[telephone,setTelephone]  = useState("");
  const[mobile,setMobile]  = useState("");
  const[Address,setAddress]  = useState("");
  const[CIN,setCIN]  = useState("");
  const [password, setPassword] = useState("");
  const [parent_image, setParentImage] = useState(false); 
  const [previewImage, setPreviewImage] = useState(false);

  const address = "Parent";
  const url = "http://localhost:5000";


  if (response) { console.log(response) }
  else if (error) { console.log(error) }


//   const [password, setPassword] = useState("");

 /* parentsList && parentsList.length > 0 && parentsList.map((parent) => {
    return {
      name: parent.name,
      email: parent.email,
      mobile: parent.mobile,
      type_etude: parent.type_etude,
      id: parent._id,
    };9  });
  const fields = { name, email,mobile,type_etude};*/

  useEffect(() => {
    async function fetchParent() {
      try {
        const response = await axios.get(`${url}/api/Parent/${id}`);
        const parentData = response.data;
        setName(parentData.name);
        setPrename(parentData.prename);
        setNamefrench(parentData.namefrench);
        setPrenamefrench(parentData.prenamefrench);
        setEmail(parentData.email);
        setTelephone(parentData.telephone);
        setMobile(parentData.mobile);
        setAddress(parentData.Address);
        setCIN(parentData.CIN);
        setParentImage(parentData.parent_image );
        console.log(parentData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }
    fetchParent();
  }, [id]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setStudImage(selectedFile);
    
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

  const submitHandler = (event) => {
    event.preventDefault()
  
    dispatch(updateUser(fields, id, address));
    navigate('/ShowParents');
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
                <Card.Header className='photo-text'>صورة الملف الشخصي</Card.Header>
                <Card.Body className="text-center">

                {previewImage ? (
                <img className="img-account-profile rounded-circle mb-2  img-fluid" src={previewImage} alt="Preview" />
                ) : (
                  <img className="img-account-profile rounded-circle mb-2 img-fluid" src={`${url}/parent/${parent_image}`} alt="" />
                )}              <div className="small font-italic text-muted mb-4">JPG أو PNG بحجم لا يتجاوز 5 ميجابايت</div>
                <Form.Group className="mb-3">
                <Form.Label className="input-text small">تحميل صورة جديدة</Form.Label>
                <Form.Control type="file" name="stud_image" id="stud_image" accept=".png, .jpg, .jpeg" style={{ backgroundColor: '#124a44' }} onChange={handleImageChange} />
                </Form.Group>
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
                  <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  الإسم </Form.Label>
                        <Form.Control type="text" placeholder="ادخل  الإسم" value={name} onChange={(e) => setName(e.target.value)} />
                        
                  </Col>
                  <Col md={6}>
                  <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}>  nom </Form.Label>
                        <Form.Control type="text" placeholder="  enter le nom" value={namefrench} onChange={(e) => setNamefrench(e.target.value)} />
                  </Col>
                </Row>  
                <Row className="mb-3">
                <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> اللقب </Form.Label>
                        <Form.Control type="text" placeholder="ادخل  اللقب" value={prename} onChange={(e) => setPrename(e.target.value)} />
                        </Col>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '19px', marginTop: '25px' }}> prenom </Form.Label>
                        <Form.Control type="text" placeholder="enter le prenom" value={prenamefrench} onChange={(e) => setPrenamefrench(e.target.value)} />
                        </Col>
                      
                 
                </Row>
                <Row>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  الهاتف القار</Form.Label>
                        <Form.Control type="tel" id="phone" name="phone"  pattern="7[0-9]{7}" placeholder=" أدخل رقم الهاتف القار" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </Col>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> الهاتف الجوال</Form.Label>
                        <Form.Control type="tel" id="phone" name="phone" pattern="[0-9]{2}[0-9]{3}[0-9]{3}"  placeholder="ادخل  رقم الهاتف الجوال" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}> البريد الالكتروني</Form.Label>
                    <Form.Control type="email" placeholder="ادخل البريد الالكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  العنوان</Form.Label>
                        <Form.Control type="text" placeholder=" ادخل  العنوان الكامل المتكون من الشارع-المعتمدية-الولاية-رقم البريدي" value={address} onChange={(e) => setAddress(e.target.value)} /> 
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                        <Form.Label className="small mb-1" style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', marginTop: '25px' }}>  رقم بطاقة التعريف</Form.Label>
                        <Form.Control type="number" placeholder="ادخل رقم بطاقة التعريف" maxLength="8" value={CIN} onChange={(e) => setCIN(e.target.value)} /> 
                    
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

export default UpdateParent;
const styles = {
  attendanceButton: {
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    }
  }
}
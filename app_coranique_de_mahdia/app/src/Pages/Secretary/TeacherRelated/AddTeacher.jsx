import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Background from '../../../assets/signin.jpg';
import { CircularProgress } from '@mui/material';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Form, Button,Card } from 'react-bootstrap';

function AddTeacher() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

   
    const [loader, setLoader] = useState(false);
   


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const[mobile,setMobile]  = useState("");
    const[type_etude,setTypeEtude] = useState("");
    const role = "Teacher";
    
    
   
    const handleSubmit = (e) => {
     
        e.preventDefault();
        console.log("type_etude:" ,type_etude)
        const fields = { name, mobile, email, password, role, type_etude }
       
        setLoader(true)
        dispatch(registerUser(fields, role))
        toast.success("👌تم التسجيل بنجاح", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
   useEffect(() => {
        if (status === 'added' ) {
            dispatch(underControl())
            navigate('/ShowTeachers');
        }
        else if (status === 'failed') {
           
            setLoader(false)
        }
        else if (status === 'error') {
            console.log(error)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    


  return (
    <Container fluid className="px-4 mt-4">
    <Row className='d-flex justify-content-center align-items-center' >
    
        <Col xl={4}>
        <Card className='mb-4 mb-xl-0' >
    <Card.Body className='text-center'>

    <h2 className="fw-bold mb-2 text-center" style={{ color: "#AF4E09"}}>إضافة مدرس</h2>
                <Form onSubmit={handleSubmit}>
                    
                        <Form.Label className="small mb-1"> البريد الالكتروني</Form.Label>
                        <Form.Control type="email" placeholder="ادخل البريد الالكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
                  
                        <Form.Label className="small mb-1">اسمك الكامل</Form.Label>
                        <Form.Control type="text" placeholder="ادخل اسمك الكامل" value={name} onChange={(e) => setName(e.target.value)} />
                    
                        <Form.Label className="small mb-1">كلمة العبور</Form.Label>
                        <Form.Control type="password" placeholder="ادخل كلمة العبور" value={password} onChange={(e) => setPassword(e.target.value)} />
                   
                    
                         <Form.Label className="small mb-1"> هاتف الولي</Form.Label>
                        <Form.Control type="text" placeholder="ادخل هاتف الولي" value={mobile} onChange={(e) => setMobile(e.target.value)} /> 

                        <Form.Label className="small mb-1">الاختصاص </Form.Label>
                        <Form.Control as="select" value={type_etude} onChange={(e) => setTypeEtude(e.target.value) }>
                        <option value="تجويد">  اختر لاختصاص </option>
                      
                        <option value="تجويد">تجويد</option>
                        <option value="تحفيظ">تحفيظ</option>
                    


</Form.Control>
                    
                    <Button  type="submit" disabled={loader} style={{ width: '100%',backgroundColor: '#124a44' }}>

                        {loader ? <CircularProgress size={24} color="inherit" /> : 'إضافة '}
                    </Button>
                    <ToastContainer />
                </Form>
                </Card.Body>
  </Card>

</Col>

       
      
    </Row>
</Container>
  );
};


export default AddTeacher;
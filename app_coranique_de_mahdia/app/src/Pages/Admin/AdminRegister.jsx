import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/userRelated/userHandle'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Background from '../../assets/signin.jpg'
import { CircularProgress } from '@mui/material';
import emoji from '../../assets/login-modal-v.svg';
import '../../Styles/adminModam.css';

function AdminRegister(props) {
   /* const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

   
    const [loader, setLoader] = useState(false);
   
    const [message, setMessage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const[mobile,setMobile]  = useState("");*/
    const [show, setShow] = useState(false);
 
    const role = "Admin"

   /* const handleSubmit = (e) => {
     
        e.preventDefault();

        const fields = { name, mobile, email, password, role }
       
        setLoader(true)
        dispatch(registerUser(fields, role))
    };
    
   useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage("error network")
            setLoader(false)
        }
        else if (status === 'error') {
            console.log(error)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);
*/
const handleClose = () => setShow(false);

  return (
    <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="static"
                                    keyboard={false}
                                    {...props}
                                    size="lg"
                                    aria-labelledby="example-custom-modal-styling-title"

                                    centered
                                    dialogClassName="modal-90w"
                                >
                                    <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                        <Modal.Title style={{fontFamily:'Cairo',fontWeight:'700',fontSize:'30px',color:'#2a5551'}} >كلمة العبور</Modal.Title>
                                        </div>
                                    </Modal.Header >
                                    <Modal.Body className="text-center">
                                        <div className="div">
                                            <img src={emoji} alt="emoji" style={{width:'300px',height:'300px'}} />
                                        </div>
                                        <Form>
                                            <h4 style={{fontFamily:'Cairo',fontWeight:'700',fontSize:'30px',color:'#2a5551'}}>استعادة كلمة المرور  </h4>
                                            <p style={{fontFamily:'Cairo',fontWeight:'500',fontSize:'15px',color:'black'}}>أدخل بريدك الإلكتروني أدناه لتلقي كلمة المرور الخاصة بك  </p>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                
                                                <Form.Control
                                                style={{fontFamily:'Cairo',fontWeight:'500',fontSize:'15px',color:'black',borderRadius:'20px',padding:'25px 10px 25px 0px'}}
                                                    type="email"
                                                    placeholder="البريد"
                                                    autoFocus
                                                />
                                            </Form.Group>

                                        </Form>
                                        
                                    </Modal.Body>
                                    <Modal.Footer className="d-flex justify-content-center">
                                    <Button className='button-38'  onClick={props.onHide}>
                                          إغلاق
                                    </Button>
                                        <Button className='button-38' onClick={handleClose}>
                                        ارسال
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
  )
}



export default AdminRegister

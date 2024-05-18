import React, { useState, useEffect } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../assets/login.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../redux/userRelated/userHandle';
import {CircularProgress} from '@mui/material';
import { Button } from 'react-bootstrap';
import AdminRegister from './Admin/AdminRegister';


const Login = ({role}) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [modalShow, setModalShow] = React.useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);
 function handleSubmit(e) {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { email, password };
        setLoader(true)
        dispatch(loginUser(fields, role));

    }
    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
       
    };
    const handleShow = () => setShow(true);
    
  
    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/AdminDashboard');
            } else if (currentRole === 'Student') {
                navigate('/StudentDashboard');
            }else if (currentRole === 'Secretary') {
                navigate('/SecretaryDashboard');
            }else if (currentRole === 'Teacher') {
                navigate('/TeacherDashboard');
            }else if (currentRole === 'Parent') {
                navigate('/ParentDashboard');
            }
        } else if (status === 'failed') {
            setLoader(false)
            // Handle failed login
        } else if (status === 'error') {
            
             setLoader(false)
            // Handle network error
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <div style={{ height: 900 }}>
            <div style={{ backgroundColor: "#ffffff" }}>
                <div className="limiter">
                    <div className="wrap-login100" style={{justifyContent:'center',padding:'50px'}} >
                        <form className="login100-form validate-form" style={{boxShadow:'6px 6px 20px 0px '}} onSubmit={handleSubmit}>
                            <div className="d-flex flex-column align-items-center justify-content-start" style={{ marginBottom: 24 }}>
                                <span className="login100-form-title p-b-43">
                                    <h2 className="text-5xl" style={{ marginTop: -160 ,fontFamily:'Cairo ',fontWeight:'800',fontSize:'40px' }}>تسجيل الدخول</h2>
                                </span>
                                <p className="text-xl" style={{ marginTop: -160 ,fontFamily:'Cairo ',fontWeight:'400',fontSize:'20px'}}>مرحبا بكم</p>
                            </div>
                            <div className="form-group">
                                <div className="form-wrapper" >
                                    <label style={{fontFamily:'Cairo ' }}>ادخل البريد الالكتروني</label>
                                    <input type="email"  name="email" style={{width:'100%'}} onChange={handleInputChange} className="form-control"  error={emailError}
                                    helperText={emailError && 'Email is required'} />
                                </div>
                            </div>
                            <div className="form-group mb-3" controlid="formPlaintextPassword">
                                <div className="form-wrapper"  >
                                    <label style={{fontFamily:'Cairo '}}>كلمة العبور</label>
                                    <input type={show ? "text" : "password"}name="password"  onChange={handleInputChange} className="form-control"  error={passwordError}/>
                                    
                                     <Button h="1.75rem" size="sm" onClick={handleClick}>
                                       {show ? "مخفية" : "ظاهرة"}
                                      </Button>
          
                                </div>
                            </div>
                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn" style={{fontFamily:'Cairo ',fontSize:'20px'}}>
                                {loader ?
                                    <CircularProgress size={24}  color="inherit" />
                                    : " تسجيل الدخول"}
                                   
                                </button >
                                <ToastContainer />
                                <button style={{fontFamily:'Cairo ',fontWeight:'500',fontSize:'15px'}} onClick={() => setModalShow(true)}>نسيت كلمة المرور</button>
                                <AdminRegister
                                show={modalShow}
                                onHide={() => setModalShow(false)}  
                                />
                                
                               
                            </div>
                          
                        </form>
                        <div className="login100-more" style={sectionStyle}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const sectionStyle = {
    height: "620px",
    width: "600px",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    boxShadow:"6px 6px 20px 0px ",
    fontFamily:"Cairo",
    fontWeight:'800',
};

export default Login;

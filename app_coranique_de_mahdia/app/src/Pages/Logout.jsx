import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import '../Styles/Logout.css'; 



function Logout() {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="logout-container">
            <h1>{currentUser.name}</h1>
            <p className="logout-message">هل أنت متأكد أنك تريد تسجيل الخروج?</p>
            <button className="logout-button logout-button-logout" onClick={handleLogout}>تسجيل خروج</button>
            <button className="logout-button logout-button-cancel" onClick={handleCancel}>الغاء</button>
           
     </div>

    );
}

export default Logout;

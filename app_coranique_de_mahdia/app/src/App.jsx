import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Home from './Pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';

import Logout from './Pages/Logout'

import AdminRegister from './Pages/Admin/AdminRegister'


import { useSelector } from 'react-redux'

import AdminDashboard from './Pages/Admin/AdminDashboard'
import SecretaryDashboard from './Pages/Secretary/SecretaryDashboard'





import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Contact from './Pages/Contact'
import TeacherDashboard from './Pages/Secretary/TeacherRelated/TeacherDashboard'

function App() {

  const { currentRole } = useSelector(state => state.user);
  console.log(currentRole)
  return (
  
    
      <Router>
      <div>
       
      {currentRole === null &&
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path="/contact" element={<Contact/>} />

            <Route  path="/LoginAdmin" element={<Login role="Admin" />} />
            <Route  path="/LoginStudent" element={<Login role="Student"/>} />
            <Route  path="/LoginSecretary" element={<Login role="Secretary"/>} />
            <Route path="/LoginTeacher" element={<Login role="Teacher"/>}/>
            <Route path="/LoginParent" element={<Login role="Parent"/>}/>
            <Route  path="/registerStudent" element={<SignUp role="Student" />} />
            <Route  path="/logout" element={<Logout />} />

          
          
          
            <Route  path="/AdminRegister" element={<AdminRegister />} />
          
           
            


          </Routes>}
          {currentRole === "Admin" &&
        <>
           <AdminDashboard /> 
         
          
        </>
      }
        {currentRole === "Secretary" &&
        <>
          <SecretaryDashboard />
        

        </>
      }
        {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        
        </>
      }
       {currentRole === "Parent" &&
        <>
        <Routes>
         <Route  path="/logout" element={<Logout />} />
         </Routes>
        
        </>
      }
       
      </div>
    </Router>
 
  )
}

export default App

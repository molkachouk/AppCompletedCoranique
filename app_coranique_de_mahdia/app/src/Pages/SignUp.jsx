import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios'; // Make sure axios is installed and imported

import Background from '../assets/signin.jpg';
import '../Styles/SignIn.css';



function SignUp() {

 const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [mobile, setMobile] = useState("");
  const[nom_pere,setNomPere] = useState("");
  const[ date_naissance,setDateNaissance] = useState("");
  const[lieu,setLieu] = useState("");
  const[genre,setGenre] = useState("");
  const[group,setGroup] = useState("");
  const[niveau_etude,setNiveauEtude] = useState("");
  const[etablissement,setEtablissement] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const {data } = await axios.post("/api/eleve/Registere", {
        name,
        email,
        password,
        mobile,
        nom_pere,
        date_naissance,
        lieu,
        genre,
        group,
        niveau_etude,
        etablissement


      });

      if (data) {
        navigate("/login");
        console.log("Register successful:", data);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Error signing up");
    }
  };



  return (
    <div style={{ height: 900 }}>
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className="limiter">
       
            <div className="wrap-login100">
              <form className="login100-form validate-form" onSubmit={handleRegister} >
                <div className="d-flex flex-column align-items-center justify-content-start" style={{marginBottom: 24}}>
                  <span className="login100-form-title p-b-43">
                    <h2 className="text-5xl"  style={{marginTop:-160}}>تسجيل الدخول</h2>
                  </span>
                  <p className="text-xl" style={{marginTop:-160}}>مرحبا بكم</p>
                </div>

                <div class="form-group">
						<div class="form-wrapper">
							<label  style={{marginLeft:147}} >ادخل اسم الولي الكامل</label>
							<input type="text" value={nom_pere}  onChange={(e) => setNomPere(e.target.value)} className="form-control"/>
              
						</div>
						<div classNAme="form-wrapper">
							<label  style={{marginLeft:160}}>ادخل اسمك الكامل</label>
							<input type="text" value={name}  onChange={(e) => setName(e.target.value)} className="form-control"/>
						</div>
					</div>

          <div className="form-group">
					<div className="form-wrapper">
						<label  style={{marginLeft:147}}>ادخل البريد الالكتروني</label>
						<input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} className="form-control"/>
				
          </div>
					<div className="form-wrapper">
						<label style={{marginLeft:158}}>ادخل تاريخ ولادتك</label>
						<input type="text"value={date_naissance}  onChange={(e) => setDateNaissance(e.target.value)}  className="form-control"/>
					</div>
          </div>

          <div className="form-group">
					<div className="form-wrapper">
						<label  style={{marginLeft:171}}>مقر تحفيظ القران</label>
						<input type="text" value={lieu}  onChange={(e) => setLieu(e.target.value)} className="form-control"/>
				
          </div>
					<div className="form-wrapper">
						<label  style={{marginLeft:166}}>ادخل  هاتف الولي</label>
						<input type="text" value={mobile}  onChange={(e) => setMobile(e.target.value)} className="form-control"/>
					</div>
          </div>

          <div className="form-group">
					<div className="form-wrapper">
						<label  style={{marginLeft:147}} >الحزب الذي سيرسم به</label>
						<input type="text" value={group}  onChange={(e) => setGroup(e.target.value)} className="form-control"/>
				
          </div>
					<div className="form-wrapper">
						<label  style={{marginLeft:224}}>الجنس</label>
						<input type="text" value={genre}  onChange={(e) => setGenre(e.target.value)} className="form-control"/>
					</div>
          </div>

          <div className="form-group">
					<div className="form-wrapper">
						<label  style={{marginLeft:147}} >المؤسسة التربوية</label>
						<input type="text" value={etablissement}  onChange={(e) => setEtablissement(e.target.value)} className="form-control"/>
				
          </div>
					<div className="form-wrapper">
						<label  style={{marginLeft:105}} >المستوى التعليمي للسنة الحالية</label>
						<input type="text" value={niveau_etude}  onChange={(e) => setNiveauEtude(e.target.value)} className="form-control"/>
					</div>
          </div>
         
					
          <div className="form-group">
					
					<div className="form-wrapper">
						<label  style={{marginLeft:195}}>كلمة العبور</label>
						<input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="form-control"/>
					</div>
          </div>
          <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    تسجيل الدخول
                  </button>
                  <p>هل أنت جديد في الشعار؟ سجل هنا</p>
                </div>
              </form>

              <div className="login100-more" style={sectionStyle}></div>
            </div>
          </div>
        </div>
      </div>
   
  );
              };
              
var sectionStyle = {
    height: "620px",
    width: "600px",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
};

export default SignUp;

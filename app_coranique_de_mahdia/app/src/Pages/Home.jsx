import React from 'react';
import Navi from '../Components/Navi';
import Banner from '../Components/Banner';
import Mission from '../Components/Mission';
import "../App.css";
import Discover from '../Components/Discover';
import Stat from '../Components/Stat';
import Eventes from '../Components/Eventes';
import Comp from '../Components/Comp';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='acceuil'>

      <Navi/>
      <Banner/>
      <Mission/>
      <Discover/>
      <Stat/>
      <Eventes/>
      <Comp/>
      <Footer/>
     {/* */} 
     
  
  
  
    
      {/* <Link to="/LoginAdmin">
        <button>Login</button>
      </Link> */}
  </div>

  );
};


export default Home;

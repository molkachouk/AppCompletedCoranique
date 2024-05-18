import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from  '../assets/logo.png'
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Eventes from './Eventes';
import Comp from './Comp';
import Mission from './Mission';
import { FiMapPin } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";
import '../Styles/Footer.css'
import Contact from '../Pages/Contact';




export default function Footer() {
  return (
    <section className='footer '>
        <Container>
            <Row className='align-item-center'>
                <Col sm={4} >
                    <img src={logo} className='img-logo'/>
                    <p className='p-col-1'> تحفيظ القرآن الكريم بمختلف الوسائل الممكنة، مع فهم المعاني والمقاصد وحسن
    الأداء وذلك باستعمال الطرق البيداغوجية والوسائل العصرية والوسائط كالإعلامية</p>
                    <FaWhatsapp className='col-1-icon ' />
                    <FaFacebook className='col-1-icon '/>
                    <FaInstagram className='col-1-icon '/>
                    
                </Col>
                <Col sm={4} style={{ paddingRight:'90px' }}>
                    <h4 className='h4'>روابط مفيدة</h4>
                    <a href='#mission'>مهمتنا</a>
                    <br/>
                    <a href='#event'>تظاهراتنا</a>
                    <br/>
                    <a href='#comp'>مسابقاتنا</a>
                    <br/>
                    <Link to={Contact}>اتصل بنا</Link>
                    <br/>
                    <Link >بيان الخصوصية</Link>

                </Col>
                <Col sm={4} style={{ paddingRight:'0px' }}>
                <h4 className='h4'>اتصل</h4>
                <p className='p-col-3'>نسعد باقتراحاتكم وآرائكم دائما ونأخذها بعين الاعتبار في تطوير خططنا القادمة</p>
                <p className='p-col-3'><FiMapPin />عدد 23 نهج سيدي بن عروس 1008 تونس</p>                
                <p className='p-col-3'><FiPhone />+216 66 666 666</p>
                <p className='p-col-3'><BsEnvelope />quran@gmail.com</p>



                </Col>
            </Row>
        </Container>
    </section>
  )
}

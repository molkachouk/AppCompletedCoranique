import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import {ArrowLeft} from 'react-bootstrap-icons';
import rectangle6 from '../assets/rectangle-26.png';
import deco from '../assets/deco.png'
import  '../Styles/Banner.css';



function Banner() {
  return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-item-center">
                    <Col xs={12} md={6} xl={7}>    
                                <svg className='path' width="174" height="28" viewBox="0 0 174 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 14C9.53333 0.666667 15.0667 0.666667 20.6 14C26.1333 27.3333 31.6667 27.3333 37.2 14C42.7333 0.666667 48.2667 0.666667 53.8 14C59.3333 27.3333 64.8667 27.3333 70.4 14C75.9333 0.666667 81.4667 0.666667 87 14C92.5333 27.3333 98.0667 27.3333 103.6 14C109.133 0.666667 114.667 0.666667 120.2 14C125.733 27.3333 131.267 27.3333 136.8 14C142.333 0.666667 147.867 0.666667 153.4 14C158.933 27.3333 164.467 27.3333 170 14" stroke="#1EA599" strokeWidth="7"/>
                                </svg>

                                <h1><span className="wrap">الرابطة الوطنية<br />للقرآن الكريم بالمهدية</span></h1>

                                <p>    رابطة تعمل على خدمة القرآن و تحفيظهاعبر فروعها الموجودة في المهدية</p>
                                <div className='buttons'>
                                <button className='btn1'><span>تعرف أكثر</span></button><button className='btn2'><ArrowLeft className='vector' size={25}/><span> تعرف عن الفروع</span></button>
                                </div>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                         <img src={rectangle6} alt="banner" className='img1' />
                         <img src={deco} alt='deco' className='img2'/>
                         <div className="frame-8">
                            <div className="div">
                                <span>
                                    <span className="div-span2">المكان:</span>
                                    <span className="div-span3"></span>
                                    <span className="div-span4">دار القرآن</span>
                                </span>
                            </div>
                            <div className="div2">
                                <span>
                                    <span className="div-2-span">العنوان:</span>
                                    <span className="div-2-span3">شارع الحرية</span>
                                </span>
                            </div>
                            <div className="line-3"></div>
                          </div>

                        
                        
                    </Col>
                    
                    
                    
                </Row>
            </Container>
            

        </section>
  )
}

export default Banner;
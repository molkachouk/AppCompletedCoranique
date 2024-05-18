import React from 'react';
import{ Col, Container, Row } from 'react-bootstrap';
import '../Styles/Discover.css';
import muslim from '../assets/muslim.png';
import { BsPersonCircle, BsAlarm } from "react-icons/bs";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Discover() {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <section className='discover' id='discover'>
            <Container>
                <Row className='align-item-center'>
                    <Col>
                        <div className="discover-bx">
                            <h1>تعرف على رؤساء الرابطة</h1>
                            <Carousel responsive={responsive} infinite={true} >
                                <div className="item">
                                    <div className='image'>
                                        <img src={muslim} alt="Image" />
                                    </div>
                                    <div className="text-box">
                                        <h2>فولان بن فولان</h2>
                                        <Row>
                                            <Col>
                                                <p><BsPersonCircle />مدير الجمعية</p>
                                            </Col>
                                            <Col>
                                                <p><BsAlarm />2022-03-28</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className='image'>
                                        <img src={muslim} alt="Image" />
                                    </div>
                                    <div className="text-box">
                                        <h2>فولان بن فولان</h2>
                                        <Row>
                                            <Col>
                                                <p><BsPersonCircle />مدير الجمعية</p>
                                            </Col>
                                            <Col>
                                                <p><BsAlarm />2022-03-28</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className='image'>
                                        <img src={muslim} alt="Image" />
                                    </div>
                                    <div className="text-box">
                                        <h2>فولان بن فولان</h2>
                                        <Row>
                                            <Col>
                                                <p><BsPersonCircle />مدير الجمعية</p>
                                            </Col>
                                            <Col>
                                                <p><BsAlarm />2022-03-28</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

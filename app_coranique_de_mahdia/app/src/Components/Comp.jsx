import React from 'react'
import { Col, Container, Row ,Card} from 'react-bootstrap'
import '../Styles/Comp.css';
import rectangle6 from '../assets/rectangle-26.png'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Comp() {
    const pagination = {
        clickable: true,
       
      };
  return (
    <section className='comp' id='comp' >
        <Container >
            <Row className='align-item-center'>
                <Col className='text-center'>
                    <h1>
                    أحدث مسابقاتنا
                    </h1>
                    <Row className='align-item-center'>
                    <Swiper
        pagination={ pagination}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView="auto"
        className="mySwiper"
      >
         <SwiperSlide className="res-slide">
                    <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='date'>
                        12-02-2024              
                        </Card.Text>
                        <Card.Title className='card-title'>
                        مسابقة حفظ القرآن
                        </Card.Title>
                        <Card.Text className='text'>
                        <img class="ellipse-15" src="ellipse-16.png" />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                            <p className='title' style={{ marginBottom: '0' }}> فرع المحلي بالمهدية</p>
                            <p className='sub-text' style={{ marginBottom: '0' }}>دار القرآن المهدية</p>
                        </div>
                        </Card.Text>
                    </Card.Body>
                 </Card>
        </SwiperSlide>
        <SwiperSlide className="res-slide">
                 <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='date'>
                        12-02-2024              
                        </Card.Text>
                        <Card.Title className='card-title'>
                        مسابقة حفظ القرآن
                        </Card.Title>
                        <Card.Text className='text'>
                        <img class="ellipse-15" src="ellipse-16.png" />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <p className='title' style={{ marginBottom: '0' }}> فرع المحلي بالمهدية</p>
                        <p className='sub-text' style={{ marginBottom: '0' }}>دار القرآن المهدية</p>
                        </div>
                        </Card.Text>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>
                 <SwiperSlide className="res-slide">
                 <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='date'>
                        12-02-2024              
                        </Card.Text>
                        <Card.Title className='card-title'>
                        مسابقة حفظ القرآن
                        </Card.Title>
                        <Card.Text className='text'>
                        <img class="ellipse-15" src="ellipse-16.png" />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <p className='title' style={{ marginBottom: '0' }}> فرع المحلي بالمهدية</p>
                        <p className='sub-text' style={{ marginBottom: '0' }}>دار القرآن المهدية</p>
                        </div>
                        </Card.Text>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>
                 <SwiperSlide className="res-slide">
                 <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='date'>
                        12-02-2024              
                        </Card.Text>
                        <Card.Title className='card-title'>
                        مسابقة حفظ القرآن
                        </Card.Title>
                        <Card.Text className='text'>
                        <img class="ellipse-15" src="ellipse-16.png" />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                        <p className='title' style={{ marginBottom: '0' }}> فرع المحلي بالمهدية</p>
                        <p className='sub-text' style={{ marginBottom: '0' }}>دار القرآن المهدية</p>
                        </div>
                        </Card.Text>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>
                 </Swiper>

                 </Row>
                 

                </Col>
            </Row>
        </Container>
    </section>
  )
}

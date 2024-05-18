import { Button,Container, Card, Col,  Row } from 'react-bootstrap'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../Styles/Events.css'
import rectangle6 from '../assets/rectangle-26.png';
import logo from '../assets/logo.png'
import EventSlider from './EventSlider';
let events = 
[{event_name:"الفرع المحلي بالمهدية",event_date:"8/26/2022",location:"دار القرآن بالمهدية",event_description:"حتفال بالمولد النبوي الشريف",img_url:rectangle6,img_icon:logo},
{event_name:"الفرع المحلي بالمهدية",event_date:"7/14/2022",location:"دار القرآن بالمهدية",event_description:"حتفال بالمولد النبوي الشريف",img_url:rectangle6,img_icon:logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"6/15/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف","img_url":rectangle6,"img_icon":logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"7/1/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف","img_url":rectangle6,"img_icon":logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"8/1/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف","img_url":rectangle6,"img_icon":logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"8/22/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف.","img_url":rectangle6,"img_icon":logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"12/17/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف","img_url":rectangle6,"img_icon":logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"10/6/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف","img_url":rectangle6,"img_icon":logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"7/30/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف","img_url":rectangle6,"img_icon":logo},
{"event_name":"الفرع المحلي بالمهدية","event_date":"7/23/2022","location":"دار القرآن بالمهدية","event_description":"حتفال بالمولد النبوي الشريف","img_url":rectangle6,"img_icon":logo}]


export default function Eventes() {
  
  return (
    <section className='event' id='event'>
        <Container>
            <Row className='align-item-center'>
                <Col className='text-center'>
                <h5>أهم و أحدث</h5>
                <h1>تظاهراتنا</h1>
               
                <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView="auto"
        >
          <SwiperSlide className="res-slide" >
          <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>


          <SwiperSlide className="res-slide" >
          <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>


                 <SwiperSlide className="res-slide" >
          <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>
                 
                 <SwiperSlide className="res-slide" >
                  <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>

                 <SwiperSlide className="res-slide" >
                  <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>
                 <SwiperSlide className="res-slide" >
                  <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>

                 <SwiperSlide className="res-slide" >
                  <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>

                 <SwiperSlide className="res-slide" >
                  <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>
                 </SwiperSlide>

          
          <EventSlider />
        </Swiper>
               {/*    <Card className='card' >
                    <Card.Img variant="top" src={rectangle6} className='imgCard' />
                    <Card.Body>
                        <Card.Text className='txt1'>
                        الفرع المحلي بالمهدية
                        </Card.Text>
                        <Card.Text className='txt2'>
                        إحتفال بالمولد النبوي الشريف

                        </Card.Text>
                        <Card.Title className='card-title'>
                        <img class="ellipse-16" src="ellipse-16.png" />
                        <p className='title'>دار القرآن بالمهدية
                        </p></Card.Title>
                    </Card.Body>
                 </Card>*/} 
                 
                </Col>

            </Row>
        </Container>

    </section>
  )
}

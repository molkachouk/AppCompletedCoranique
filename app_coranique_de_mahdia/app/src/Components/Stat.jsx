import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../Styles/Stat.css'
import deco2 from '../assets/deco2.png'
import form from '../assets/form.png'
import { FaBookQuran } from "react-icons/fa6";
import { BsPersonVideo3 } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { PiBookOpenText } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";



export default function Stat() {
  return (
    <section className="stat" id="stat">
        <Container>
        <div className='deco2'>
          <img src={deco2} alt='' className='image-fluid'/>
        </div>
        <div className='deco3'>
          <img src={deco2} alt='' className='image-fluid'/>
        </div>
            <Row className='align-item-center' >
                <Col>
                <h1>إحصائيات</h1>
                <Row className='align-item-center'>
                    <Col className='text-center'>
                      <div className='imageForm'>
                        <img src={form} alt='' className='imageFormImg'/>
                        <FaBookQuran className='icon-svg'/>
                      </div>
                      <p className='text1'>عدد المناهج</p>
                      <p className='text2'>2</p>
                    </Col>
                    <Col className='text-center'>
                      <div className='imageForm'>
                        <img src={form} alt='' className='imageForm'/>
                        <BsPersonVideo3 className='icon-svg' />
                      </div>
                      <p className='text1'>عدد المعلمين</p>
                      <p className='text2'>22</p>
                    </Col>
                    <Col className='text-center'>
                      <div className='imageForm'>
                    <img src={form} alt='' className='imageForm'/>
                    <BsFileEarmarkText className='icon-svg' />
                    </div>
                    <p className='text1'>عدد الأحزاب</p>
                      <p className='text2'>50</p>
                    </Col>
                    <Col className='text-center'>
                      <div className='imageForm'>
                    <img src={form} alt='' className='imageForm'/>
                    <PiBookOpenText className='icon-svg' />
                    </div>
                    <p className='text1'>عدد الأقسام</p>
                      <p className='text2'>20</p>
                    </Col>
                    <Col className='text-center'>
                      <div className='imageForm'>
                    <img src={form} alt='' className='imageForm'/>
                    <BsPeopleFill className='icon-svg'/>

                    
                    </div>
                    <p className='text1'>عدد الطلاب</p>
                      <p className='text2'>1200</p>
                    </Col>
                </Row>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

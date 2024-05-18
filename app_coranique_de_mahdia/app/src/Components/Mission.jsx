import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../Styles/Mission.css"
import mission1 from '../assets/man.png'
import deco1 from '../assets/deco1.png'


export default function Mission() {
  return (
    <section className='mission' id='mission'>
        <Container>
          <div className='deco1'>
          <img src={deco1} alt='' className='image-fluid'/>
          </div>
            <Row className="align-item-center">
                <Col>
                <h1>مهمتنا</h1>
                <p>من كثير مميزاتنا التجويد و مساعدة الطالب على الحفظ في نفس الحلقة والمراجعةالدائمة</p>
                <Row className="align-item-center">
                <Col className='text-center'>
                <img src={mission1} alt='mission1' className='mission11'/>
                <h5>تحفيظ</h5>
                <p className='mission1'> يمكنك الآن الإنضمام لتبدأ في حفظ كتاب الله بأساليب سهلة وميسّرة على أيد متخصصين</p>
   
                </Col>
                <Col className='text-center'>
                <img src={mission1} alt='mission1' className='mission11'/>
                <h5>تجويد</h5>
                <p className='mission2'>    تعلّم كيف تقرأ القرآن بطريقة صحيحة ، وتعرّف على قواعد التجويد بأسلوب مبسط ومناسب.</p>
                </Col>
                </Row>
                </Col> 
            </Row>
        </Container>

    </section>
  )
}

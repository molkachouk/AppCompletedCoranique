import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/logo.png';
import { Link, BrowserRouter as Router} from "react-router-dom";
import icon1 from "../assets/ic--baseline-search (1).svg";
import '../Styles/navigate.css';

 function Navi() {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>الصفحة الرئيسية</Nav.Link>
              <Nav.Link href="" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>تعرف علينا</Nav.Link>
              <Nav.Link href="" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>الفروع</Nav.Link>
              <Nav.Link href="" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>التظاهرات</Nav.Link>
              <Nav.Link href="" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>المسابقات</Nav.Link>

            </Nav>
            <span className="dropdown">
             
                <button className="dropbtn"><span>تسجيل الدخول</span></button>
                <div class="dropdown-content">
                  <Link className="links" to='/LoginAdmin'>  فضاءالمشرف</Link>
                  <Link className="links" to='/LoginStudent'>فضاءالتلميذ</Link>
                  <Link className="links" to='/LoginSecretary'>فضاء السكريتار</Link>
                  <Link className="links" to='/LoginTeacher'>فضاءالأستاذ</Link>
                  <Link className="links" to='/LoginParent'>فضاءالولي</Link>

                </div>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
export default Navi;
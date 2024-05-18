import {React,useState} from 'react';
import { Container, Nav, Col, Row, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer le fichier CSS de Bootstrap
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { updateUser } from '../../../redux/userRelated/userHandle';

import { useParams } from 'react-router-dom';
function UpdateGroup() {
  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? 'Cancel' : 'Edit profile';
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { response, error,groupsList } = useSelector((state) => state.group);
  const address = "Group";

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const [name_group, setNameGroup] = useState("");

  const [type_etude , setTypeEtude] = useState("");
//   const [password, setPassword] = useState("");

  groupsList && groupsList.length > 0 && groupsList.map((group) => {
    return {
      name_group: group.name_group,
      type_etude: group.type_etude,

      id: group._id,
    };
  });
  const fields = { name_group,type_etude};

  const submitHandler = (event) => {
    event.preventDefault()
  
    dispatch(updateUser(fields, id, address));
    navigate('/ShowGroups');
  }

   

  return (
    <Container fluid className="px-4 mt-4">
   

     
      <Row>
       <Col xl={8}>
          <Card className="mb-4">
           
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="small mb-1">الاسم الأول</Form.Label>
                    <Form.Control type="text" placeholder="أدخل الاسم الأول" value={name_group}
                      onChange={(event) => setNameGroup(event.target.value)}
                      autoComplete="name" required />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="small mb-1">عنوان البريد الإلكتروني</Form.Label>
                    <Form.Control type="text" placeholder="أدخل عنوان بريدك الإلكتروني" value={type_etude}
                      onChange={(event) => setTypeEtude(event.target.value)}
                      autoComplete="email" required />
                  </Col>
                </Row>  
                
                
                <Button style={{ backgroundColor: '#124a44' }} type="submit">حفظ التغييرات</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateGroup;
const styles = {
  attendanceButton: {
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    }
  }
}
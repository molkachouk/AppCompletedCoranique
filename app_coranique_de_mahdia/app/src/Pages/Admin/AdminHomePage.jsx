import { Container, Grid, Paper } from '@mui/material'
//import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Groups from "../../assets/img2.png";
 import Teachers from "../../assets/img3.png";
 import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllGroups } from '../../redux/groupRelated/groupHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { getAllSecretarys } from '../../redux/secretaryRelated/secretaryHandle';
import { getAllParents } from '../../redux/parentRelated/parentHandle';
const AdminHomePage = () => {
    const dispatch = useDispatch();
   // const {studentsList} = useSelector((state) => state.student);
   const { groupsList } = useSelector((state) => state.group);
    const { teachersList } = useSelector((state) => state.teacher);
    const { secretarysList } = useSelector((state) => state.secretary);
    const { parentsList } = useSelector((state) => state.parent);

    const { currentUser } = useSelector(state => state.user)

   

    useEffect(() => {
       // dispatch(getAllStudents());
        dispatch(getAllGroups());
        dispatch(getAllTeachers());
        dispatch(getAllSecretarys());
        dispatch(getAllParents());
    }, [ dispatch]);

   // const numberOfStudents = studentsList && studentsList.length;
    const numberOfGroups = groupsList && groupsList.length;
    const numberOfTeachers = teachersList && teachersList.length;
    const numberOfSecretarys = secretarysList && secretarysList.length;
    const numberOfParents = parentsList && parentsList.length;

    const Data = styled(CountUp)`
    font-size: calc(1.3rem + .6vw);
    color: green;
  `;
   const Title = styled.p`
  font-size: 1.25rem;
 `;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper style={{padding:'16px',
  display:'flex',
  flexDirection:'column',
  height:'200px',
  justifyContent:'space-between',
  alignItems:'center',
  textAlign:'center'}}>
                            <img src={Students} alt="Students" />
                            <Title >
                            إجمالي الطلاب
                            </Title>
                            {/*  <Data start={0} end={numberOfStudents} duration={2.5}  />*/}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper style={{padding:'16px',
  display:'flex',
  flexDirection:'column',
  height:'200px',
  justifyContent:'space-between',
  alignItems:'center',
  textAlign:'center'}}>
                            <img src={Groups} alt="Groups" />
                            <Title style={{fontSize:'1.25rem'}}>
                            مجموع الفصول
                            </Title>
                            <Data start={0} end={numberOfGroups} duration={5}  style={{ color:'green'}}/>
                        </Paper>
                    </Grid> 
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper style={{padding:'16px',
  display:'flex',
  flexDirection:'column',
  height:'200px',
  justifyContent:'space-between',
  alignItems:'center',
  textAlign:'center'}}>
                            <img src={Teachers} alt="Teachers" />
                            <Title >
                            إجمالي المعلمين
                            </Title>
                            <Data start={0} end={numberOfTeachers} duration={2.5}  />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper style={{padding:'16px',
  display:'flex',
  flexDirection:'column',
  height:'200px',
  justifyContent:'space-between',
  alignItems:'center',
  textAlign:'center'}}>
                            <img src={Fees} alt="Fees" />
                            <Title >
                            تحصيل الرسوم
                            </Title>
                            <Data start={0} end={23000} duration={2.5} prefix="$" />                        </Paper>
                    </Grid>
                    {/* <Grid item xs={12} md={12} lg={12}>
                        {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper> 
                    </Grid> */}
                </Grid>
                </Container>
                <Container>
                <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                        <Paper style={{padding:'16px',
  display:'flex',
  flexDirection:'column', 
  height:'200px',
  justifyContent:'space-between',
  alignItems:'center',
  textAlign:'center'}}>
                            <img src='' alt="Secretarys" />
                            <Title >
                            مجموع السكرتيرات

                            </Title>
                            <Data start={0} end={numberOfSecretarys} duration={2.5}  />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper style={{padding:'16px',
  display:'flex',
  flexDirection:'column',
  height:'200px',
  justifyContent:'space-between',
  alignItems:'center',
  textAlign:'center'}}>
                            <img src='' alt="Parents" />
                            <Title >
                            مجموع الوالدين
                            </Title>
                            <Data start={0} end={numberOfParents} duration={2.5}  />
                        </Paper>
                    </Grid>
                    </Grid>
            </Container>
        </>
    );
};


// const StyledPaper = styled(Paper)`
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   height: 200px;
//   justify-content: space-between;
//   align-items: center;
//   text-align: center;
// `;





export default AdminHomePage
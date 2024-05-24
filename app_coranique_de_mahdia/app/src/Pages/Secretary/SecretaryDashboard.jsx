import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import { AppBar, Drawer } from '../../Components/styles';


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Navigate, Route, Routes } from 'react-router-dom';
import AccountMenu from '../../Components/AccountMenu';
import SideBar from '../Secretary/SideBar';

import Logout from '../Logout';
import AddGroup from './groupRelated/AddGroup';

import ShowTeachers from './TeacherRelated/ShowTeachers';
import AddTeacher from './TeacherRelated/AddTeacher';
import ShowParent from './ParentRelated/ShowParents.jsx';
import AddParent from './ParentRelated/AddParent';
import ParentProfile from './ParentRelated/ParentProfile';
import ShowGroups from './groupRelated/ShowGroups.jsx';
import UpdateTeacher from './TeacherRelated/UpdateTeacher.jsx';
import TeacherProfile from './TeacherRelated/TeacherProfile.jsx';
import UpdateParent from './ParentRelated/UpdateParent.jsx';
import UpdateGroup from './groupRelated/UpdateGroup.jsx';
import GroupDetails from './groupRelated/GroupDetails.jsx';
import AddStudent from './StudentRelated/AddStudent.jsx';
import UpdateStudent from './StudentRelated/UpdateStudent.jsx';
import StudentProfile from './StudentRelated/StudentProfile.jsx';

import SecretaryProfileHome from './SecretaryProfileHome.jsx';
import ShowAllStudent from './StudentRelated/ShowAllStudent.jsx';
import ExamDashboard from './Examenrelated/ExamDashboard.jsx';


function SecretaryDashboard() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{ backgroundColor: '#2a5551' }} position='absolute'>
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',

                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        لوحة تحكم المشرف
                    </Typography>

                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                <Toolbar sx={styles.toolBarStyled} >
                    <IconButton onClick={toggleDrawer}   >
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <SideBar />
                </List>
            </Drawer>
            <Box component="main" sx={{ ...styles.boxStyled }}>
                <Toolbar />
                <Routes>
                    <Route path="/ExamDashboard" element={<ExamDashboard/>} />


                    <Route path="/AddTeacher" element={<AddTeacher />} />
                    <Route path="/AddParent" element={<AddParent />} />
                    <Route path="/addGroup" element={<AddGroup />} />
                    <Route path="/addStudent" element={<AddStudent />} />
                     <Route path="/ShowAllStudent" element={<ShowAllStudent />}/>


                    <Route path="/ShowTeachers" element={<ShowTeachers />} />
                    <Route path="/ShowParents" element={<ShowParent />} />
                    <Route path="/ShowGroups" element={<ShowGroups />} />
                    <Route path="/Secretary/Profile" element={<SecretaryProfileHome />} />
                    

                    <Route path="/TeacherProfile/:id" element={<TeacherProfile />} />
                    <Route path="/StudentProfile/:id" element={<StudentProfile />} />
                    <Route path="/ParentProfile/:id" element={<ParentProfile />} />
                    <Route path="/GroupDetails/:id" element={<GroupDetails />} />

                    <Route path="/UpdateTeacher/:id" element={<UpdateTeacher />} />
                    <Route path="/UpdateParent/:id" element={<UpdateParent />} />
                    <Route path="/UpdateGroup/:id" element={<UpdateGroup />} />
                    <Route path="/UpdateStudent/:id" element={<UpdateStudent />} />
                    <Route path="/logout" element={<Logout />} />


                </Routes>
            </Box>
        </Box>

    )
}

export default SecretaryDashboard
const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',

    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],

    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },

}
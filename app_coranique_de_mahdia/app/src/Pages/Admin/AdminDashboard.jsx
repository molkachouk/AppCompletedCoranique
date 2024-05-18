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
import SideBar from './SideBar';
import AddSecretary from './SecretaryRelated/AddSecretary';
import Logout from '../Logout';
import AdminProfile from './AdminProfile';
import ShowSecretary from './SecretaryRelated/ShowSecretary';
import SecretaryProfile from './SecretaryRelated/SecretaryProfile';
import UpdateSecretary from './SecretaryRelated/UpdateSecretary';
import ShowTeachers from '../Secretary/TeacherRelated/ShowTeachers';
import ShowParent from '../Secretary/ParentRelated/ShowParents';
import ShowGroups from '../Secretary/groupRelated/ShowGroups';
import AddTeacher from '../Secretary/TeacherRelated/AddTeacher'
import UpdateTeacher from '../Secretary/TeacherRelated/UpdateTeacher';
import AddGroup from '../Secretary/groupRelated/AddGroup';
import AddStudent from '../Secretary/StudentRelated/AddStudent';
import TeacherProfile from '../Secretary/TeacherRelated/TeacherProfile';
import StudentProfile from '../Secretary/StudentRelated/StudentProfile';
import ParentProfile from '../Secretary/ParentRelated/ParentProfile';
import GroupDetails from '../Secretary/groupRelated/GroupDetails';
import UpdateParent from '../Secretary/ParentRelated/UpdateParent';
import UpdateGroup from '../Secretary/groupRelated/UpdateGroup';
import UpdateStudent from '../Secretary/StudentRelated/UpdateStudent';
import Eventes from '../../Components/Eventes';
import AdminHomePage from './AdminHomePage';
import AddEvent from './Events/AddEvent';
import EventList from './Events/EventList';
import EventPageDetail from './Events/EventPageDetail';
import UpdateEvent from './Events/UpdateEvent';
function AdminDashboard() {
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
                    <Route path="/" element={<AdminHomePage/>}/>
                    <Route path="/AddTeacher" element={<AddTeacher />} />
                    <Route path="/addSecretary" element={<AddSecretary />} />
                    <Route path="/addGroup" element={<AddGroup/>}/>
                    <Route path="/addStudent/:id" element={<AddStudent/>}/>
                    <Route path="/AddEvent" element={<AddEvent/>}/>

                    


                    <Route path="/ShowSecretary" element={<ShowSecretary />} />
                    <Route path="/ShowTeachers" element={<ShowTeachers />} />
                    <Route path="/ShowParents" element={<ShowParent />} />
                    <Route path="/ShowGroups" element={<ShowGroups />} />
                    <Route path="/EventList" element={<EventList />} />



                    <Route path="/Admin/Profile" element={<AdminProfile />} />
                    <Route path="/SecretaryProfile/:id" element={<SecretaryProfile />} />
                    <Route path="/TeacherProfile/:id" element={<TeacherProfile/>} />
                    <Route path="/StudentProfile/:id" element={<StudentProfile />} />
                    <Route path="ParentProfile/:id" element={<ParentProfile />} />
                    <Route path="/GroupDetails/:id" element={<GroupDetails/>} />
                    <Route path="/EventPageDetail/:id" element={<EventPageDetail/>} />


                    <Route path="/UpdateSecretary/:id" element={<UpdateSecretary />} />
                    <Route path="/UpdateTeacher/:id" element={<UpdateTeacher />} />
                    <Route path="/UpdateParent/:id" element={<UpdateParent />} />
                    <Route path="/UpdateGroup/:id" element={<UpdateGroup />} />
                    <Route path="/UpdateStudent/:id" element={<UpdateStudent/>} />
                    <Route path="/UpdateEvent/:id" element={<UpdateEvent/>} />

                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </Box>

    )
}

export default AdminDashboard
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
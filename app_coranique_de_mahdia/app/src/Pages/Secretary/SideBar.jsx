import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
const SideBar = () => {
    const location = useLocation();
    return (
     
         <>
                <React.Fragment>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon color={location.pathname === ("/" || "/dashboard") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الرئيسية" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ShowGroups">
                        <ListItemIcon>
                            <ClassOutlinedIcon color={location.pathname.startsWith('/groups') ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الأحزاب" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ShowAllStudent">
                        <ListItemIcon>
                            <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="المواد" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ShowTeachers">
                        <ListItemIcon>
                            <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Secretary/teacher") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="المعلمين" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ShowSecretary">
                        <ListItemIcon>
                            <PersonOutlineIcon color={location.pathname.startsWith("/Admin/secretaire") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الاولياء" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ShowParents">
                        <ListItemIcon>
                            <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Secretary/parent") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الإعلانات" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ExamDashboard">
                        <ListItemIcon>
                            <MenuBookSharpIcon color={location.pathname.startsWith("/ExamDashboard") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الإمتحانات" />
                    </ListItemButton>
                </React.Fragment>
                <Divider sx={{ my: 1 }} />
                <React.Fragment>
                    <ListSubheader component="div" inset>
                        المستخدم
                    </ListSubheader>
                    <ListItemButton component={Link} to="/Secretary/profile">
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Secretary/profile") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الملف الشخصي" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/logout">
                        <ListItemIcon>
                            <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="تسجيل الخروج" />
                    </ListItemButton>
                </React.Fragment>
          </>
       
    )
}

export default SideBar;

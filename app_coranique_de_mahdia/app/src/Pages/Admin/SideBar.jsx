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
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssistantIcon from '@mui/icons-material/Assistant';
const SideBar = () => {
    const location = useLocation();
    return (
     
         <>
                <React.Fragment>
                    <ListItemButton  component={Link} to="/" style={{fontFamily:'Cairo ' }} >
                        <ListItemIcon>
                            <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الرئيسية"  />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/classes">
                        <ListItemIcon>
                            <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الأحزاب" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/subjects">
                        <ListItemIcon>
                            <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="المواد" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/teachers">
                        <ListItemIcon>
                            <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="المعلمين" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ShowSecretary">
                        <ListItemIcon>
                            <PersonOutlineIcon color={location.pathname.startsWith("/ShowSecretary") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="السكرتارية" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/Admin/notices">
                        <ListItemIcon>
                            <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="جدولة الإمتحانات" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/ExamenPlanning">
                        <ListItemIcon>
                            <ContentPasteIcon color={location.pathname.startsWith("/ExamenPlaning") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="الشكاوى" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/EventList">
                        <ListItemIcon>
                            <AssistantIcon  color={location.pathname.startsWith("/EventList") ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="التظاهرات" />
                    </ListItemButton>
                </React.Fragment>
                <Divider sx={{ my: 1, fontFamily: 'Arial, sans-serif' }} />
                <React.Fragment>
                    <ListSubheader component="div" inset>
                        المستخدم
                    </ListSubheader>
                    <ListItemButton component={Link} to="/Admin/profile">
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
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

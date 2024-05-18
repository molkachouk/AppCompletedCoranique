import React, { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AccountMenu() {
    const url="http://localhost:5000";

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { currentRole, currentUser } = useSelector(state => state.user);
    console.log(currentUser)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} >
            <Tooltip title="إعدادات الحساب" >
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar className='img-account-profile' >
                        {String (currentUser.name).charAt(0)}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar />
                    <Link to={`/${currentRole}/profile`}style={{fontFamily:'Cairo ' }}>
                        الملف الشخصي
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} style={{fontFamily:'Cairo ' }}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    الإعدادات
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Link to="/logout" style={{fontFamily:'Cairo ' }}>
                        تسجيل الخروج
                    </Link>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default AccountMenu

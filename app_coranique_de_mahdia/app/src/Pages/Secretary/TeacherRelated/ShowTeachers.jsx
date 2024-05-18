import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {getAllTeachers} from '../../../redux/teacherRelated/teacherHandle';
import {TableTemplate} from '../../../Components/TableTemplate';
import {Button} from 'react-bootstrap';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box,IconButton
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../Components/SpeedDialTemplate';
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';


const ShowTeacher = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {teachersList, loading, error, response } = useSelector((state) => state.teacher);
    //console.log('secretarysList:', secretarysList);
    const { currentUser } = useSelector(state => state.user);
    // console.log('currentUser.place:', currentUser.place._id);

   // console.log(placeId);

    useEffect(() => {
        dispatch({ type: 'GET_REQUEST' });
     
        dispatch(getAllTeachers());
    }, [ dispatch]);
    

    if (error) {
        console.log(error);
    }

    

    const deleteHandler = (deleteID, address) => {
//          console.log(deleteID);
//          console.log(address);
         

 dispatch(deleteUser(deleteID, address))
        .then(() => {
            dispatch(getAllTeachers());
        })
      }

    const teacherColumns = [
        { id: 'name', label: 'الاسم', minWidth: 100 },
        { id: 'email', label: 'البريد الالكتروني', minWidth: 100 },
         {id:'mobile', label: 'الهاتف' , minWidth:100},
         {id: 'type_etude' , label : 'الاختصاص'}
       
    ]

    const teacherRows = teachersList && teachersList.length > 0 && teachersList.map((teacher) => {
        return {
            name: teacher.name,
            email: teacher.email,
            mobile: teacher.mobile,
            type_etude: teacher.type_etude,
            id: teacher._id,
          
        };
        
    })

    const TeacherButtonHaver = ({ row }) => {
      

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        // const [selectedIndex, setSelectedIndex] = React.useState(0);

    

       

        

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };
        return (
            <>
               <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                    <PersonRemoveIcon color="error" />
                </IconButton> 
                <Button variant="contained" style={{backgroundColor:'#080a43',
    color:'#fff',
    '&:hover' :{
      backgroundColor:'#0a1e82'
    }}}
                    onClick={() => navigate("/TeacherProfile/" + row.id)}
                   >
                          عرض البيانات
                </Button> 
                 <Button variant="contained" style={{backgroundColor:'#080a43',
    color:'#fff',
    '&:hover' :{
      backgroundColor:'#0a1e82'
    }}}
                    onClick={() => navigate("/UpdateTeacher/" + row.id)}
                   >
                   تغيير البيانات 
                </Button> 
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                       
                        {/* <Button style={{ backgroundColor:'#000000',
    color:'white',
    marginLeft:'4px',
    '&:hover ':{
      backgroundColor:'#212020',
      borderColor:'#212020',
      boxShadow:'none'}}}
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </Button> */}
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                      
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
            </>
        );
    };

     const actions = [
         {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'إضافة مدرس جديد',
             action: () => navigate("/AddTeacher")
         },
       
     ];

    return (
        <div style={{padding:'25px'}}>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                         <Button
  variant="contained"
  onClick={() => navigate("/AddTeacher")}
  style={{
    backgroundColor: '#133104',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#266810'
    }
  }}
>
أضف مدرس  
           
                            </Button>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(teachersList) && teachersList.length > 0 &&
                                <TableTemplate buttonHaver={TeacherButtonHaver} columns={teacherColumns} rows={teacherRows} />
                            }
                             <SpeedDialTemplate actions={actions} /> 
                        </Paper>
                    }
                </>
            }
            
        </div>
    );
};

export default ShowTeacher;
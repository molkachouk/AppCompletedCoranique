import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudentsByGroup } from '../../../redux/studentRelated/studentHandle'
import TableTemplate from '../../../Components/TableTemplate'
import { Button } from 'react-bootstrap'
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box, IconButton
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../Components/SpeedDialTemplate'

import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import '../../../Styles/list.css';

const GroupDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    console.log('Students List:', studentsList);
    //console.log("studentsList",studentsList);



    useEffect(() => {
        dispatch({ type: 'GET_REQUEST' });
        dispatch(getAllStudentsByGroup(id))
    }, [dispatch]);

    if (error) {
        console.log(error);
    }
   


    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);


        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllStudentsByGroup(id));
            })
        toast.success("👌تم مسح الاولياء بنجاح", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    const studentColumns = [
        { id: 'name', label: 'الاسم', minWidth: 100 },
        { id: 'prename', label: 'اللقب', minWidth: 100 },
        { id: 'date_birth', label: 'تاريخ الولادة', minWidth: 100 },
        { id: 'place_birth', label: 'مكان الولادة', minWidth: 100 },
        { id: 'study_level', label: 'المستوى الدراسي', minWidth: 100 },
        { id: 'establishment', label: 'المؤسسة التربوية ', minWidth: 100 },
        { id: 'email', label: 'البريد الالكتروني', minWidth: 100 },
        { id: 'mobile', label: 'الهاتف', minWidth: 100 },
        { id: 'father_CIN', label: 'اسم الأب ', minWidth: 100 },
        { id: 'gender', label: 'الجنس', minWidth: 100 },
        { id: 'memo_level', label: 'مستوى الحفظ', minWidth: 100 },
        { id: 'units', label: 'الوحدات', minWidth: 100 },


    ]
    
        

    const studentRows = Array.isArray(studentsList) && studentsList.length > 0 && studentsList.map((student) => {
        

        return {
            name: student.name,
            prename: student.prename,
            date_birth: student.date_birth,
            place_birth: student.place_birth,
            study_level: student.study_level,
            establishment: student.establishment,
            email: student.email,
            mobile: student.mobile,
            father_CIN: student.father_CIN ? student.father_CIN.CIN : 'N/A',
            gender: student.gender,
            memo_level: student.memo_level,
            units: student.units,
            id: student._id,
        };
    });

    const StudentButtonHaver = ({ row }) => {


        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        // const [selectedIndex, setSelectedIndex] = React.useState(0);





        // console.log(row.id);

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
               <IconButton onClick={() => deleteHandler(row.id,"Student")} >
                    <PersonRemoveIcon color="error"/>
                </IconButton>
                {/* <ToastContainer />  */}

                <IconButton variant="contained" style={{
                    color: '#EFAC41',
                    
                }}
                    onClick={() => navigate("/StudentProfile/" + row.id)}
                >
                    <MdRemoveRedEye />
                </IconButton>
                <IconButton variant="contained" style={{
                    color: '#EFAC41',
                    
                }}
                    onClick={() => navigate("/UpdateStudent/" + row.id)}
                >
                    <MdEditDocument />
                </IconButton>
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
            icon: <PersonAddAlt1Icon color="primary" />, name: 'إضافة ولي جديد',
            action: () => navigate("/addStudent" )
        },

    ];

    return (
        <div className='group-details-container' style={{ padding: '25px',fontFamily: 'Changa, sans-serif', fontSize: '12px', fontWeight: '500' }}>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' ,fontFamily: 'Changa, sans-serif', fontSize: '12px', fontWeight: '500'}}>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/addStudent")}
                                style={{
                                    backgroundColor: '#133104',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#266810'
                                    }
                                }}
                            >
                                َأضف أحد الوالدين
                            </Button>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden', fontFamily: 'Changa, sans-serif', fontSize: '12px', fontWeight: '500' }} >
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate style={{ fontFamily: 'Changa', fontSize: '12px', fontWeight: '500' }} buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            {/* <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}
        </div>
    );
};

export default GroupDetails;
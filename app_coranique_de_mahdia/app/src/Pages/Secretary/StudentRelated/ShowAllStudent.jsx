import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle'; // Updated import
import TableTemplate from '../../../Components/TableTemplate';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box, IconButton
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../Components/SpeedDialTemplate';

import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import { Container, TextField } from "@mui/material";


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import { ToastContainer, toast } from 'react-toastify';
import { MdArrowForwardIos } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import '../../../Styles/list.css';
import { useState } from 'react';

const ShowAllStudent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    console.log('Students List:', studentsList);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('name');

    useEffect(() => {
        dispatch({ type: 'GET_REQUEST' });
        dispatch(getAllStudents()); // Dispatching getAllStudents instead of getAllStudentsByGroup
    }, [dispatch]);

    if (error) {
        console.log(error);
    }
   
    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);

        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllStudents()); // Dispatching getAllStudents again after deletion
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
    
    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };
    const handleSearch = (event) => {
       
      setFilterBy(event.target.value);
      setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    
      setFilterBy(event.target.value);
 };
 const studentRows = Array.isArray(studentsList) && studentsList.length > 0 && studentsList.map((student) => {
  return {
    name: student.name,
    namefrench: student.namefrench,
    prename: student.prename,
    prenamefrench: student.prenamefrench,
    date_birth: student.date_birth,
    place_birth: student.place_birth,
    study_level: student.study_level,
    establishment: student.establishment,
    email: student.email,
    mobile: student.mobile,
    gender: student.gender,
    group_name:student.name_group?.name_group,
    memo_level: student.memo_level,
    units: student.units,
    CIN_student: student.CIN_student || 'none', // Ensure this line is correct
    father_CIN: student.father_CIN ? student.father_CIN.CIN : 'none',
    father_name: student.father_CIN ? student.father_CIN.name : 'none',
    id: student._id,
};        
});


const filteredAndSortedRows = Array.isArray(studentRows) ? studentRows
.filter((student) =>
  student[filterBy] &&
  (typeof student[filterBy] === 'string' || typeof student[filterBy] === 'number') &&
  student[filterBy].toString().toLowerCase().includes(searchQuery.toLowerCase())
)
.sort((a, b) => {
  const valueA = typeof a[filterBy] === 'string' ? a[filterBy].toLowerCase() : a[filterBy];
  const valueB = typeof b[filterBy] === 'string' ? b[filterBy].toLowerCase() : b[filterBy];
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
}) : [];
 

    const studentColumns = [
      { id: 'name', label: 'إسم التلميذ', minWidth: 100 },
      { id: 'namefrench', label: 'nom (français)', minWidth: 100 },

      { id: 'prename', label: 'اللقب', minWidth: 100 },
      { id: 'prenamefrench', label: 'prenom (français)', minWidth: 100 },

      { id: 'date_birth', label: 'تاريخ الولادة', minWidth: 100 },
      { id: 'place_birth', label: 'مكان الولادة', minWidth: 100 },
      { id: 'study_level', label: 'المستوى الدراسي', minWidth: 100 },
      { id: 'establishment', label: 'المؤسسة التربوية ', minWidth: 100 },
      { id: 'email', label: 'البريد الالكتروني', minWidth: 100 },
      { id: 'mobile', label: 'الهاتف الجوال', minWidth: 100 },
      { id: 'gender', label: 'الجنس', minWidth: 100 },
      { id: 'group_name', label: 'الفوج', minWidth: 100 },
      { id: 'memo_level', label: 'مستوى الحفظ', minWidth: 100 },
      { id: 'units', label: 'الوحدات', minWidth: 100 },
      { id: 'father_CIN', label: 'رقم بطاقة الولي ', minWidth: 100 },
      { id: 'father_name', label: 'اسم الأب ', minWidth: 100 },
      { id: 'CIN_student', label: 'رقم بطاقة التعريف', minWidth: 100 }, // Add this line
    ];

 
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
        // Define your actions as before
    ];

    return (
        <div className='group-details-container' style={{ padding: '25px',fontFamily: 'Changa, sans-serif', fontSize: '12px', fontWeight: '500' }}>
          <div>
                                <h4 style={{ color: '#162d2b', boxSizing: 'borderBox', textAlign: 'center', fontFamily: "Changa, sansSerif", fontSize: '70px', fontWeight: '500', position: 'relative'  }}>
                                    قائمة التلاميذ</h4>
                            </div>


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
                        <div>
                        
                        <Paper sx={{ width: '100%', overflow: 'hidden', fontFamily: 'Changa, sans-serif', fontSize: '12px', fontWeight: '500' }} >
                          
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <TextField
          id="standard-search"
          label="ابحث..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="standard"
          sx={{ width: 400 , fontWeight: "bold", flex: 0.5  , marginRight: '10px',marginLeft:'40px', fontFamily: 'Changa, sans-serif'}}
        />

{/*<input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="ابحث..."
    style={{ padding: '5px', marginRight: '10px', flex: 2, fontWeight: "bold" , border: '5px solid green',
    borderRadius: '5px'}}
                              />*/}
<select
    value={filterBy}
    onChange={(e) => setFilterBy(e.target.value)}
    style={{
        marginLeft: '10px', borderRadius: "200px",
        padding: '8px 20px',
        border: '1px solid transparent',
        borderColor: 'transparent transparent rgba(0, 0, 0, 0.1) transparent',
        cursor: 'pointer',
        fontFamily: 'Cairo',
        zIndex: 99,
        '&:hover,focus': {


            backgroundColor: '#f0f0f0'

        }

    }}
>
    {studentColumns.map((col) => (
        <option key={col.id} value={col.id}>{col.label}</option>
    ))}
</select>
</div>
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate style={{ fontFamily: 'Changa', fontSize: '12px', fontWeight: '500' }} buttonHaver={StudentButtonHaver} columns={studentColumns} rows={filteredAndSortedRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                        </div> 
                    }
                    
                    <Button variant="secondary" style={{ width: '100px' ,height:'50px', backgroundColor: '#EFAC41',fontFamily:'Cairo',fontSize:'15px',fontWeight:'700',marginBottom:'15px',borderRadius:'20px',borderColor:'#B8BDBB' }}  onClick={goBack}><MdArrowForwardIos />رجوع</Button>

                </>
            }
            {/* <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}

        </div>
        
    );
};

export default ShowAllStudent;

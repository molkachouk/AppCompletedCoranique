// import { useEffect } from 'react';
// import { useDispatch,useSelector} from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import {getAllParents} from '../../../redux/parentRelated/parentHandle'
// import TableTemplate from '../../../Components/TableTemplate'
// import {Button} from 'react-bootstrap'
// import { deleteUser } from '../../../redux/userRelated/userHandle';
// import {
//     Paper, Box,IconButton
// } from '@mui/material';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import SpeedDialTemplate from '../../../Components/SpeedDialTemplate'

// import * as React from 'react';

// import ButtonGroup from '@mui/material/ButtonGroup';


// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Popper from '@mui/material/Popper';
// import { ToastContainer ,toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ShowStudent = () => {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const {studentsList, loading, error,response } = useSelector((state) => state.student);
//     //console.log('secretarysList:', secretarysList);
//     const { currentUser } = useSelector(state => state.user)
   

//     useEffect(() => {
//         dispatch({ type: 'GET_REQUEST' });
//         dispatch(getAllStudents());
//     }, [ dispatch]);
    

//     if (error) {
//         console.log(error);
//     }

//     // const [showPopup, setShowPopup] = React.useState(false);
//     // const [message, setMessage] = React.useState("");

//      const deleteHandler = (deleteID, address) => {
//          console.log(deleteID);
//          console.log(address);
         

//  dispatch(deleteUser(deleteID, address))
//         .then(() => {
//             dispatch(getAllStudents());
//         })
//         toast.success("👌تم مسح الاولياء بنجاح", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//         });
//      }
   

//     const studentColumns = [
//         { id:'name', label: 'الاسم', minWidth: 100 },
//         { id:'email', label: 'البريد الالكتروني', minWidth: 100 },
//         {id:'mobile',label:'الهاتف',minWidth:100},
//         {id:'date_birth',label:'تاريخ الولادة',minWidth:100},
//         {id:'father_name',label:'اسم الأب ',minWidth:100},
//         {id:'gender',label:'الجنس',minWidth:100},
//         {id:'study_level',label:'المستوى الدراسي',minWidth:100},
//         {id:'establishment',label:'المؤسسة التربوية ',minWidth:100},

       
//     ]

//     const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
//         return {
//             name: student.name,
//             email: student.email,
//             mobile:student.mobile,
//             date_birth:student.date_birth,
//             father_name:student.father_name,
//             gender:student.gender,
//             study_level:student.study_level,
//             establishment:student.establishment,
//             id: student._id,
          
//         };
        
//     })

//     const StudentButtonHaver = ({ row }) => {
      

//         const [open, setOpen] = React.useState(false);
//         const anchorRef = React.useRef(null);
//         // const [selectedIndex, setSelectedIndex] = React.useState(0);

    

       

        

//         const handleToggle = () => {
//             setOpen((prevOpen) => !prevOpen);
//         };

//         const handleClose = (event) => {
//             if (anchorRef.current && anchorRef.current.contains(event.target)) {
//                 return;
//             }

//             setOpen(false);
//         };
//         return (
//             <>
//                <IconButton onClick={() => deleteHandler(row.id, "Student")} >
//                     <PersonRemoveIcon color="error" />
//                 </IconButton>
//                 {/* <ToastContainer />  */}
//                 <Button variant="contained" style={{backgroundColor:'#080a43',
//     color:'#fff',
//     '&:hover' :{
//       backgroundColor:'#0a1e82'
//     }}}
//                     onClick={() => navigate("/StudentProfile/" + row.id)}
//                    >
//                       عرض البيانات
//                 </Button>
//                 <Button variant="contained" style={{backgroundColor:'#080a43',
//     color:'#fff',
//     '&:hover' :{
//       backgroundColor:'#0a1e82'
//     }}}
//                     onClick={() => navigate("/UpdateStudent/" + row.id)}
//                    >
//                       تغيير البيانات 
//                 </Button>
//                 <React.Fragment>
//                     <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                       
//                         {/* <Button style={{ backgroundColor:'#000000',
//     color:'white',
//     marginLeft:'4px',
//     '&:hover ':{
//       backgroundColor:'#212020',
//       borderColor:'#212020',
//       boxShadow:'none'}}}
//                             size="small"
//                             aria-controls={open ? 'split-button-menu' : undefined}
//                             aria-expanded={open ? 'true' : undefined}
//                             aria-label="select merge strategy"
//                             aria-haspopup="menu"
//                             onClick={handleToggle}
//                         >
//                             {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                         </Button> */}
//                     </ButtonGroup>
//                     <Popper
//                         sx={{
//                             zIndex: 1,
//                         }}
//                         open={open}
//                         anchorEl={anchorRef.current}
//                         role={undefined}
//                         transition
//                         disablePortal
//                     >
//                         {({ TransitionProps, placement }) => (
//                             <Grow
//                                 {...TransitionProps}
//                                 style={{
//                                     transformOrigin:
//                                         placement === 'bottom' ? 'center top' : 'center bottom',
//                                 }}
//                             >
//                                 <Paper>
//                                     <ClickAwayListener onClickAway={handleClose}>
                                      
//                                     </ClickAwayListener>
//                                 </Paper>
//                             </Grow>
//                         )}
//                     </Popper>
//                 </React.Fragment>
//             </>
//         );
//     };

//      const actions = [
//         {
//             icon: <PersonAddAlt1Icon color="primary" />, name: 'إضافة ولي جديد',
//              action: () => navigate("/addStudent")
//          },
       
//      ];

//     return (
//         <div style={{padding:'25px'}}>
//             {loading ?
//                 <div>Loading...</div>
//                 :
//                 <>
//                     {response ?
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                          <Button
//   variant="contained"
//   onClick={() => navigate("/addStudent")}
//   style={{
//     backgroundColor: '#133104',
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#266810'
//     }
//   }}
// >
// َأضف أحد الوالدين 
//                             </Button>
//                         </Box>
//                         :
//                         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                             {Array.isArray(studentsList) && studentsList.length > 0 &&
//                                 <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
//                             }
//                              <SpeedDialTemplate actions={actions} /> 
//                         </Paper>
//                     }
//                 </>
//             }
//             {/* <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}
//         </div>
//     );
// };

// export default ShowStudent;
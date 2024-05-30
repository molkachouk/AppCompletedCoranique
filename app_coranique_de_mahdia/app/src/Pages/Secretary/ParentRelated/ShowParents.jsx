import { useEffect } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {getAllParents} from '../../../redux/parentRelated/parentHandle'
import TableTemplate from '../../../Components/TableTemplate'
import {Button} from 'react-bootstrap'
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box,IconButton,
    AppBar,
    Typography
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../Components/SpeedDialTemplate'
import { MdRemoveRedEye } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowParent = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {parentsList, loading, error,response } = useSelector((state) => state.parent);
    //console.log('secretarysList:', secretarysList);
    const { currentUser } = useSelector(state => state.user)
   

    useEffect(() => {
        dispatch({ type: 'GET_REQUEST' });
        dispatch(getAllParents());
    }, [ dispatch]);
    

    if (error) {
        console.log(error);
    }

    // const [showPopup, setShowPopup] = React.useState(false);
    // const [message, setMessage] = React.useState("");

     const deleteHandler = (deleteID, address) => {
         console.log(deleteID);
         console.log(address);
         

 dispatch(deleteUser(deleteID, address))
        .then(() => {
            dispatch(getAllParents());
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
   

    const parentColumns = [
        { id: 'name', label: 'الاسم', minWidth: 100 },
        { id: 'prename', label: 'اللقب', minWidth: 100 },
        { id: 'namefrench', label: 'nom', minWidth: 100 },
        { id: 'prenamefrench', label: 'prenom', minWidth: 100 },
        { id: 'telephone', label: 'الهاتف القار', minWidth: 100 },
        { id: 'mobile', label: 'الهاتف الجوال', minWidth: 100 },
        { id: 'address', label: 'العنوان', minWidth: 100 },
        { id: 'CIN', label: 'رقم بطاقة التعريف', minWidth: 100 },
        { id: 'email', label: 'البريد الالكتروني', minWidth: 100 },
       
    ]

    const parentRows = parentsList && parentsList.length > 0 && parentsList.map((parent) => {
        return {
            name: parent.name,
            prename: parent.prename,
            namefrench: parent.namefrench,
            prenamefrench: parent.prenamefrench,

            telephone: parent.telephone,
            mobile: parent.mobile,
            address: parent.address,
            CIN: parent.CIN,
            email: parent.email,
            id: parent._id,
          
        };
        
    })

    const ParentButtonHaver = ({ row }) => {
      

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
               <IconButton onClick={() => deleteHandler(row.id, "Parent")} >
                    <PersonRemoveIcon color="error" />
                </IconButton>
                {/* <ToastContainer />  */}
                <IconButton variant="contained" style={{
     color: '#EFAC41',
    }}
                    onClick={() => navigate("/ParentProfile/" + row.id)}
                   >
                      <MdRemoveRedEye />
                </IconButton>
                <IconButton variant="contained" style={{
     color: '#EFAC41',
    }}
                    onClick={() => navigate("/UpdateParent/" + row.id)}
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
             action: () => navigate("/addParent")
         },
       
     ];

    return (
        <div style={{padding:'25px'}}>
            <div>
            <AppBar position="static" sx={{marginTop:'20px', direction:'ltr',backgroundColor:'white'}}>
      
       
      <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ flexGrow: 1, alignSelf: 'flex-end',color:'#2A5551',fontFamily:'Cairo',fontSize:'30px',margin:'10px 0px 10px 0px'}}
      >
       <span style={{ fontWeight:'700'}}>  قائمة الأولياء</span>
      </Typography>

      
      
    
  </AppBar>
            </div>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                         <Button
  variant="contained"
  onClick={() => navigate("/addParent")}
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
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(parentsList) && parentsList.length > 0 &&
                                <TableTemplate buttonHaver={ParentButtonHaver} columns={parentColumns} rows={parentRows} />
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

export default ShowParent;
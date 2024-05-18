import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {getAllEvents} from '../../../redux/eventRelated/eventHandle'
import TableTemplate from '../../../Components/TableTemplate'
import {Button} from 'react-bootstrap'
import { deleteEvent } from '../../../redux/eventRelated/eventHandle';
import {
    Paper, Box,IconButton
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../Components/SpeedDialTemplate'

import * as React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function EventList() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const {eventsList, loading, error, response } = useSelector((state) => state.event);
    //console.log('eventsList:', eventsList);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch({ type: 'GET_REQUEST' });
        dispatch(getAllEvents(currentUser._id));
    }, [currentUser._id, dispatch]);
    

    if (error) {
        console.log(error);
    }

    // const [showPopup, setShowPopup] = React.useState(false);
    // const [message, setMessage] = React.useState("");

     const deleteHandler = (deleteID, address) => {
         console.log(deleteID);
         console.log(address);
         

 dispatch(deleteEvent(deleteID, address))
        .then(() => {
            dispatch(getAllEvents(currentUser._id));
        })
        toast.success("👌تم مسح السكرتير بنجاح", {
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
     const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

     const eventColumns = [
        { id: 'name_event', label: 'إسم التظاهرة', minWidth: 100 },
        { id: 'title_event', label: '  عنوان التظاهرة', minWidth: 100 },
        { id: 'description_event', label: 'وصف', minWidth: 100 },
        { id: 'location_event', label: 'المكان', minWidth: 100 },
        { id: 'date_event', label: 'التاريخ', minWidth: 100 },
        { id: 'time_event', label: 'الوقت', minWidth: 100 },

        { id: 'images', label: 'صورة', minWidth: 100 },
      ];

    const eventRows = eventsList && eventsList.length > 0 && eventsList.map((event) => {
        return {
            name_event: event.name_event,
            title_event: event.title_event,
            description_event: event.description_event,
            location_event: event.location_event,
            date_event: formatDate(event.date_event),           
            time_event: event.time_event, // Display time as is
            images: event.images,
            id: event._id,
          
        };
        
    })

    const EventButtonHaver = ({ row }) => {
      

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
               <IconButton onClick={() => deleteHandler(row.id, "Event")} >
                    <PersonRemoveIcon color="error" />
                </IconButton>
                {/* <ToastContainer />  */}
                <Button variant="contained" style={{backgroundColor:'#080a43',
    color:'#fff',
    '&:hover' :{
      backgroundColor:'#0a1e82'
    }}}
                    onClick={() => navigate("/EventPageDetail/" + row.id)}
                   >
                    View
                </Button>
                <Button variant="contained" style={{backgroundColor:'#080a43',
    color:'#fff',
    '&:hover' :{
      backgroundColor:'#0a1e82'
    }}}
                    onClick={() => navigate("/UpdateEvent/" + row.id)}
                   >
                    Update
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
            icon: <PersonAddAlt1Icon color="primary" />, name: 'إضافة تظاهرة جديد',
             action: () => navigate("/AddEvent")
         },
         {
             icon: <PersonRemoveIcon color="error" />, name: 'حذف جميع التظاهرات',
            action: () => deleteHandler(currentUser._id, "Event")
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
  onClick={() => navigate("/AddEvent")}
  style={{
    backgroundColor: '#133104',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#266810'
    }
  }}
>
َأضف  تظاهرة 
                              
                            </Button>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(eventsList) && eventsList.length > 0 &&
                                <TableTemplate buttonHaver={EventButtonHaver} columns={eventColumns} rows={eventRows} />
                            }
                             <SpeedDialTemplate actions={actions} /> 
                        </Paper>
                    }
                </>
            }
            {/* <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}
        </div>
    );
}

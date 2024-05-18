
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {getAllGroups} from'../../../redux/groupRelated/groupHandle';
import TableTemplate from '../../../Components/TableTemplate';
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
import { MdRemoveRedEye } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";

const ShowGroups = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {groupsList, loading, error, response } = useSelector((state) => state.group);
  
    const { currentUser } = useSelector(state => state.user);
 



    useEffect(() => {
        dispatch({ type: 'GET_REQUEST' });
        dispatch(getAllGroups());
    }, [dispatch]);
    

    if (error) {
        console.log(error);
    }

  

    const deleteHandler = (deleteID, address) => {
//          console.log(deleteID);
//          console.log(address);
         

 dispatch(deleteUser(deleteID, address))
        .then(() => {
            dispatch(getAllGroups());
        })
      }

    const groupColumns = [
        { id: 'name', label: 'الاسم', minWidth: 100 },
         {id: 'type_etude' , label : 'الاختصاص'},
       
    ]

    const groupRows = groupsList && groupsList.length > 0 && groupsList.map((group) => {
      return {
          name: group.name_group,
          type_etude: group.type_etude,
          id: group._id,
        
      };
      
  })

    const GroupButtonHaver = ({ row }) => {
      

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
      

    

       

        

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
            <div  className='group-text'  style={{ fontFamily: 'Changa', fontSize: '12px', fontWeight: '500' }}>
               <IconButton onClick={() => deleteHandler(row.id, "Group")}>
                    <PersonRemoveIcon style={{color:'#EFAC41'}} />
               </IconButton> 
                 <IconButton variant="contained" style={{
    color:'#EFAC41'
    }}
                    onClick={() => navigate("/GroupDetails/" + row.id)}
                   >
                          <MdRemoveRedEye />
                </IconButton>  
                 <IconButton variant="contained" style={{
    color:'#EFAC41'
    }}
                    onClick={() => navigate("/UpdateGroup/" + row.id)}
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
            </div>
        );
    };

     const actions = [
         {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'إضافة مدرس جديد',
             action: () => navigate("/AddGroup")
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
  onClick={() => navigate("/AddGroup")}
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
                            {Array.isArray(groupsList) && groupsList.length > 0 &&
                                <TableTemplate style={{ fontFamily:'Changa',fontSize:'12px',fontWeight:'500'}} buttonHaver={GroupButtonHaver} columns={groupColumns} rows={groupRows} />
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

export default ShowGroups;

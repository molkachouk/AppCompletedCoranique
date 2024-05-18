import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import styled from "styled-components";

import group from "../../../assets/group.jpg";

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddGroup = () => {
    const [name_group, setgroupName] = useState("");
    const [type_etude, setTypeEtude] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    //const secretaryID = currentUser._id
    const address = "Group"

    const [loader, setLoader] = useState(false)
    
    const fields = {
        name_group,
        type_etude
    
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        //console.log(status);
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
           
            setLoader(false)
        }
        else if (status === 'failed') {
          
            setLoader(false)
        }
        else if (status === 'error') {
           
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);
    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <img
                            src={group}
                            alt="classroom"
                            style={{ width: '80%' }}
                        />
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label="إنشاء فصل دراسي"
                                variant="outlined"
                                value={name_group}
                                onChange={(event) => {
                                    setgroupName(event.target.value);
                                }}
                                required
                            />
                             <TextField
                                label="إنشاء فصل دراسي"
                                variant="outlined"
                                value={type_etude}
                                onChange={(event) => {
                                    setTypeEtude(event.target.value);
                                }}
                                required
                            />
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                                style={{ backgroundColor:'#080a43',
                                    color:'#fff',
                                    '&:hover': {
                                      backgroundColor:'#0a1e82'
                                    }}}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "اضف"}
                            </Button>
                            <Button variant="outlined" onClick={() => navigate(-1)}>
                            عُد
                            </Button>
                        </Stack>
                    </form>
                    </StyledBox>
                    </StyledContainer>
                
       
        </>
    )
}

export default AddGroup
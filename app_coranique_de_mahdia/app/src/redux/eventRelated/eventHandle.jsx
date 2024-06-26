import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffAdded  // Correct import name to match the action name

} from './eventSlice';

export const getAllEvents = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`api/Events`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteEvent = (id, address) => async (dispatch) => {
    dispatch(getRequest());

   try {
       const result = await axios.delete(`api/${address}/${id}`);
       if (result.data.message) {
           dispatch(getFailed(result.data.message));
       } else {
           dispatch(getDeleteSuccess());
       }
    } catch (error) {
        dispatch(getError(error));
    }
}
export const addEvent = (formData, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.post(`api/add${address}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        if (result.data )  {
            dispatch(stuffAdded(result.data)); // Dispatch stuffAdded action with form data
        }
        else {
            dispatch(getFailed(result.data.message));
        }
        
    } catch (error) {
        dispatch(getError(error));
    }
};
export const updateEvent = (formData, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`/api/${address}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (result.data) {
        console.log(result.data);
        }
        else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
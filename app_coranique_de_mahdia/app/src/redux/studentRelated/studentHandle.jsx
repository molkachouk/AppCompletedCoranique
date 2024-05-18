import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    authRequest,
    stuffDone,
    stuffAdded
} from './studentSlice';

 export const getAllStudents = () => async (dispatch) => {
    dispatch(getRequest());

     try {
         const result = await axios.get(`api/Students`);
         if (result.data.message) {
             dispatch(getFailed(result.data.message));
         } else {
            dispatch(getSuccess(result.data));
        }
     } catch (error) {
         dispatch(getError(error));
     }
 }
 export const getAllStudentsByGroup = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`/api/Students/${id}`);
    
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
export const registerStudent = (fields,id) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`/api/StudentRegister`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
         if (result.data)  {
            dispatch(stuffAdded());
            
        }
        else {
            dispatch(authFailed(result.data.message));
        }
        
    } catch (error) {
        console.log(error);
    }
};
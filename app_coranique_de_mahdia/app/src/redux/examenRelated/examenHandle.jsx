import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffAdded  // Correct import name to match the action name

} from './examenSlice';

export const getAllExamen = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`api/Examens`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteExamen = (id, address) => async (dispatch) => {
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
export const addExamen = async (examData, address) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/${address}Create`, examData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
       );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to add exam');
    }
  };
export const updateExamen = (formData, id, address) => async (dispatch) => {
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
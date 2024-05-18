import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './secretarySlice';

export const getAllSecretarys = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`api/Secretarys`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
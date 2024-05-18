import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './groupSlice';

export const getAllGroups = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`api/Groups`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
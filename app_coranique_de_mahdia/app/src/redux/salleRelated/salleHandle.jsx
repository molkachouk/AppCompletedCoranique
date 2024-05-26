import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError

} from './salleSlice';

export const getAllSalles = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`api/Salles`);
        console.log('API Response:', result.data); // Log the API response

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
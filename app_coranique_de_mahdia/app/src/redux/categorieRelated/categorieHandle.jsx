import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,

} from './categorieSlice';

export const getAllCategories = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`api/Categories`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
// export const getAllGroupsByCategorie = (id) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.get(`/api/Groups/${id}`);
    
//         if (result.data.message) {
//    console.log(result.data);
//             dispatch(getFailed(result.data.message));
//         } else {
//             dispatch(getSuccess(result.data));
//         }
//     } catch (error) {
//         dispatch(getError(error));
//     }
// }
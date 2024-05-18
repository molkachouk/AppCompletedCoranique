import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
     authLogout,
    // doneSuccess,
     getDeleteSuccess,
     getRequest,
     getFailed,
     getError,
} from "/src/redux/userRelated/userSlice";

export const loginUser = (fields, role) => async (dispatch) => {
    console.log('Role in loginUser:', role);
    dispatch(authRequest());

    try {
        const result = await axios.post(`api/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const registerUser = (formData, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`api/${role}Register`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        if (result.data && result.data.message)  {
            dispatch(stuffAdded());
        }
        else {
            dispatch(authFailed(result.data.message));
        }
        
    } catch (error) {
        dispatch(authError(error));
    }
};
export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};
 export const deleteUser = (id, address) => async (dispatch) => {
     dispatch(getRequest());

    try {
        const result = await axios.delete(`/api/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
     } catch (error) {
         dispatch(getError(error));
     }
 }
 export const updateUser = (formData, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`/api/${address}/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (result.data) {
        console.log(result.data);
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}
export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`api/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

import { FETCH_ALL_BIN, CREATE_BIN, DELETE_BIN } from "../constants/actions.js";
import * as api from "../api/Bins.js";

export const getBins = () => async (dispatch) => {
    try {
        const { data } = await api.getBins();
        dispatch({ type: FETCH_ALL_BIN, payload: data });
    } catch (error) {
        console.log(error);
    }
};


export const createBin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createBin(formData);
        dispatch({ type: CREATE_BIN, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const deleteBin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.deleteBin(formData);
        dispatch({ type: DELETE_BIN, payload: data });
    } catch (error) {
        console.log(error);
    }
};

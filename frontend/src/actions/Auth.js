import { AUTH } from "../constants/actions.js";
import * as api from "../api/Auth.js";

export const signin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        console.log(data);
        dispatch({ type: AUTH, payload: data });
    } catch (error) {
        console.log(error);
    }
};

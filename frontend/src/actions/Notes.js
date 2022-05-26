import { FETCH_ALL_NOTE, CREATE_NOTE, DELETE_NOTE } from "../constants/actions.js";
import * as api from "../api/Notes.js";

export const getNotes = () => async (dispatch) => {
    try {
        const { data } = await api.getNotes();
        dispatch({ type: FETCH_ALL_NOTE, payload: data });
    } catch (error) {
        console.log(error);
    }
};


export const createNote = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.createNote(formData);
        console.log(data);
        dispatch({ type: CREATE_NOTE, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const deleteNote = (formData) => async (dispatch) => {
    try {
        const { data } = await api.deleteNote(formData);
        dispatch({ type: DELETE_NOTE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

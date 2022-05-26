import { FETCH_ALL_PDF, OPEN_PDF, CREATE_PDF, DELETE_PDF } from "../constants/actions.js";
import * as api from "../api/Pdf.js";


export const getPdfs = () => async (dispatch) => {
    try {
        const { data } = await api.getPdfs();
        dispatch({ type: FETCH_ALL_PDF, payload: data });
    } catch (error) {
        console.log(error);
    }
};


export const createPdf = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createPdf(formData);
        dispatch({ type: CREATE_PDF, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const deletePdf = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.deletePdf(formData);
        dispatch({ type: DELETE_PDF, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const openPdf = (pdf) => async (dispatch) => {
    try{
        dispatch({ type: OPEN_PDF, payload: pdf });
    }catch (error){
        console.log(error);
    }
};

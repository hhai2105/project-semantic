import { FETCH_ALL_PDF, FETCH_PDF_DATA, OPEN_PDF, CREATE_PDF, DELETE_PDF } from "../constants/actions.js";
import * as api from "../api/Pdf.js";
import { triggerBase64Download } from 'common-base64-downloader-react';


export const getPdfs = () => async (dispatch) => {
    try {
        const { data } = await api.getPdfs();
        dispatch({ type: FETCH_ALL_PDF, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getPdfData = (pdf) => async (dispatch) => {
    try {
        const { data } = await api.getPdfData({id: pdf._id});
        triggerBase64Download(data.selectedFile, pdf.name)
    } catch (error) {
        console.log(error);
    }
};

export const createPdf = (formData) => async (dispatch) => {
    try {
        console.log(formData)
        let arr = []
        for(let i = 0; i < formData.length; i++){
            const { data } = await api.createPdf(formData[i]);
            console.log("finished with " + formData[i].name)
        }
        dispatch({ type: CREATE_PDF, payload: arr});
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

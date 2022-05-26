import { FETCH_ALL_WORKSPACE, OPEN_WORKSPACE, CREATE_WORKSPACE, DELETE_WORKSPACE } from "../constants/actions.js";
import * as api from "../api/Workspace.js";


export const getWorkspaces = () => async (dispatch) => {
    try {
        const { data } = await api.getWorkspaces();
        dispatch({ type: FETCH_ALL_WORKSPACE, payload: data });
    } catch (error) {
        console.log(error);
    }
};


export const createWorkspace = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createWorkspace(formData);
        dispatch({ type: CREATE_WORKSPACE, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const deleteWorkspace = (formData) => async (dispatch) => {
    try {
        console.log(formData);
        const { data } = await api.deleteWorkspace(formData);
        dispatch({ type: DELETE_WORKSPACE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const openWorkspace = (workspace) => async (dispatch) => {
    try{
        dispatch({ type: OPEN_WORKSPACE, payload: workspace });
    }catch (error){
        console.log(error);
    }
};

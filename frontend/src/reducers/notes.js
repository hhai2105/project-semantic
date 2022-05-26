import {FETCH_ALL_NOTE, CREATE_NOTE} from "../constants/actions.js";

const NotesReducer = (state = {notes: []},action) => {
    switch (action.type) {
    case FETCH_ALL_NOTE:
        return {notes: action.type}
    case CREATE_NOTE:
        return {notes: [...state.notes, action.payload]}
    case CREATE_NOTE:
        return {notes: [...state.notes, action.payload]}
    default:
        return state;
    }
};

export default WorkspaceReducers;

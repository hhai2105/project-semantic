import {OPEN_WORKSPACE, FETCH_ALL_WORKSPACE, CREATE_WORKSPACE, UPDATE_WORKSPACE, DELETE_WORKSPACE} from "../constants/actions.js";

const WorkspaceReducer = (state = {workspaces: [], openWorkspace: null},action) => {
    switch (action.type) {
    case FETCH_ALL_WORKSPACE:
        return {...state, workspaces: action.payload};
    case OPEN_WORKSPACE:
        return {...state, openWorkspace: action.payload};
    case CREATE_WORKSPACE:
        return {...state, workspaces: [...state.workspaces, action.payload]};
    case UPDATE_WORKSPACE:
        return {...state, workspaces: state.workspaces.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case DELETE_WORKSPACE:
        return {...state, workspaces: state.workspaces.filter((post) => post._id !== action.payload)};
    default:
        return state;
    }
};

export default WorkspaceReducer;

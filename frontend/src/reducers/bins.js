import {FETCH_ALL_BIN, CREATE_BIN, UPDATE_BIN, DELETE_BIN} from "../constants/actions.js";

const BinsReducer = (state = {bins: []}, action) => {
    switch (action.type) {
    case FETCH_ALL_BIN:
        return {...state, bins: action.payload};
    case CREATE_BIN:
        return {...state, workspaces: state.workspaces.map(workspace => {
            if(workspace._id === action.payload.workspaceId){workspace.bins.push(action.payload._id);}
            return workspace;
        }), bins: [...state.bins, action.payload]};
    case UPDATE_BIN:
        return {...state, bins: state.bins.map(bin => bin._id === action.payload._id? action.payload : bin)};
    case DELETE_BIN:
        return {...state, workspaces: state.workspaces.map((workspace) => {
            if(workspace._id === action.payload.workspace._id){
                console.log("inside if");
                return action.payload.workspace;
            }
            return workspace;
        }), openWorkspace: action.payload.workspace, bins: state.bins.filter(bin => bin._id !== action.payload.bin._id)};
    default:
        return state;
    }
};

export default BinsReducer;

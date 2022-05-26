import {combineReducers} from "redux";
import auth from "./auth.js";
import workspaces from "./workspaces.js";

export default combineReducers({auth, workspaces });

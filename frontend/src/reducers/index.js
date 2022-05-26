import {combineReducers} from "redux";
import auth from "./auth.js";
import pdfs from "./pdfs.js";

export default combineReducers({auth, pdfs });

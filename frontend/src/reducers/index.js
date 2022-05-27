import {combineReducers} from "redux";
import auth from "./auth.js";
import pdfs from "./pdfs.js";
import search from "./search.js";

export default combineReducers({auth, pdfs, search});

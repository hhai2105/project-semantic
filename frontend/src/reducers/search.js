import {SEARCH} from "../constants/actions.js";

const PdfReducer = (state = {results: []},action) => {
    switch (action.type) {
    case SEARCH:
        return {...state, results: action.payload.split("\n")};
    default:
        return state;
    }
};

export default PdfReducer;

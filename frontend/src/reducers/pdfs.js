import {OPEN_PDF, FETCH_ALL_PDF, CREATE_PDF, UPDATE_PDF, DELETE_PDF} from "../constants/actions.js";

const PdfReducer = (state = {pdfs: [], openPdf: null},action) => {
    switch (action.type) {
    case FETCH_ALL_PDF:
        return {...state, pdfs: action.payload};
    case OPEN_PDF:
        return {...state, openPdf: action.payload};
    case CREATE_PDF:
        return {...state, pdfs: [...state.pdfs, action.payload]};
    case UPDATE_PDF:
        return {...state, pdfs: state.pdfs.map((post) => (post._id === action.payload._id ? action.payload : post))};
    case DELETE_PDF:
        return {...state, pdfs: state.pdfs.filter((post) => post._id !== action.payload)};
    default:
        return state;
    }
};

export default PdfReducer;

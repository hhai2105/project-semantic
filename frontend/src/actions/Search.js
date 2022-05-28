import * as api from "../api/Search.js";
import {SEARCH} from "../constants/actions.js"

export const search = (query) => async (dispatch) => {
    try {
        const { data } = await api.search({query});
        dispatch({type: SEARCH, payload: data});
    } catch (error) {
        console.log(error);
    }
};

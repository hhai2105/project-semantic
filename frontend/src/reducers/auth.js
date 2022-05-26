import { AUTH, SIGNOUT } from "../constants/actions.js";

const AuthReducers = ( state = { authData: null }, action) => {
    switch (action.type) {
    case AUTH:
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
        return { ...state, authData: action.data, loading: false, errors: null };
    case SIGNOUT:
        localStorage.clear();
        return { ...state, authData: null, loading: false, errors: null };
    default:
        return state;
    }
};

export default AuthReducers;

import axios from "axios";


const instance = axios.create({ baseURL: "https://still-gorge-91720.herokuapp.com/" });

instance.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const search = (query) => {
    return instance.post("/search", query);
};

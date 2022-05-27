import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000" });

instance.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const search = (query) => {
    return instance.post("/search", query);
};

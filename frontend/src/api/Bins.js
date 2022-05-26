import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000" });

instance.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const getBins = () => instance.get("/bins");
export const createBin = (newBin) => instance.post("/bins/add", newBin);
export const updateBin = (bin) => instance.patch("/bins/update", bin);
export const deleteBin = (id) => instance.delete(`/bins/delete/${id}`);   

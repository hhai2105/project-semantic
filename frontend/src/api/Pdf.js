import axios from "axios";

const instance = axios.create({ baseURL: "https://still-gorge-91720.herokuapp.com/" });

instance.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const getPdfs = () => instance.get("/pdfs");
export const createPdf = (newPdf) => {
    return instance.post("/pdfs/add", newPdf);
};
export const getPdfData = (pdf) => {
    return instance.post("/pdfs/get", pdf);
};
export const updatePdf = (pdf) => instance.patch("/pdfs/update", pdf);
export const deletePdf = (id) => instance.delete(`/pdfs/delete/${id}`);   

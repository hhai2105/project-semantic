import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000" });

instance.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const getNotes = () => instance.get("/notes");
export const createNote = (newNote) => instance.post("/notes/add", newNote);
export const updateNote = (note) => instance.patch("/notes/update", note);
export const deleteNote = (id) => instance.delete(`/notes/delete/${id}`);   

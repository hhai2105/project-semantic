import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000" });

instance.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const getWorkspaces = () => instance.get("/workspaces");
export const createWorkspace = (newWorkspace) => instance.post("/workspaces/add", newWorkspace);
export const updateWorkspace = (workspace) => instance.patch("/workspaces/update", workspace);
export const deleteWorkspace = (id) => instance.delete(`/workspaces/delete/${id}`);   

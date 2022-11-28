import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000" });

export const signIn = (formData) => instance.post("/user/signin", formData);
export const signUp = (formData) => instance.post("/user/signup", formData);

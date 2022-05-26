import React, { useEffect } from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { getWorkspaces } from "./actions/Workspaces.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Home from "./components/Home/Home.jsx";

function App() {
    const dispatch = useDispatch();
    if(localStorage.getItem("profile")){
        useEffect(() => {
            dispatch(getWorkspaces());
        });
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/authentication" element={<Auth/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

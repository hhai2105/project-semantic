import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Home from "./components/Home/Home.jsx";
import Pdfs from "./components/Pdfs/Pdfs.jsx";


function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/authentication" element={<Auth/>}/>
                <Route path="/pdf" element={<Pdfs/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Menu from "./components/Menu";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Upload from "./components/Upload";

const App = () => (
    <div>
        <BrowserRouter>
            <Menu/>

            <div className={"routes"}>
                <Routes>
                    <Route path={"/"} element={<Portfolio/>}/>
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/contact"} element={<Contact/>}/>
                    <Route path={"/upload"} element={<Upload/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    </div>
)

export default App;

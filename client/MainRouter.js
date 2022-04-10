import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './core/Home';
import Clients from './components/Clients'

const MainRouter = () => {
    return (<div>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/clients" element={<Clients/>}/>
        </Routes>
    </div>)
}

export default MainRouter;
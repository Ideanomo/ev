import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './core/Home';
import Clients from './components/Clients'
import Signup from './components/Signup';
import Signin from './auth/Signin';

const MainRouter = () => {
    return (<div>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/clients" element={<Clients/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
        </Routes>
    </div>)
}

export default MainRouter;
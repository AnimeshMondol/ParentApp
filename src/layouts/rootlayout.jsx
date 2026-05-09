import React from 'react';
import { Outlet } from "react-router";
import Footer from '../pages/shared/footer/footer';
import Header from '../pages/shared/header/header';


const rootlayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            
            <Footer></Footer>
        </div>
    );
};

export default rootlayout;
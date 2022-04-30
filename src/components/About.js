import React,{ useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuTitleContext } from '../App';

const About = () => {
    const menuTitle = useContext(MenuTitleContext);
    return (
        <div>
            <h2>{menuTitle[1]}</h2>
            {/* nested router설정(Outlet) */}
            <Outlet></Outlet>
        </div>
    );
};

export default About;
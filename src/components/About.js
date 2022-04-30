import React from 'react';
import { Outlet } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h2>About</h2>
            {/* nested router설정(Outlet) */}
            <Outlet></Outlet>
        </div>
    );
};

export default About;
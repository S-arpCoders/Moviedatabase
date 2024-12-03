import React from 'react';
import './Navbar.css';
import logo from '../../images/Logo.png';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="Logo" className="navbar-logo"/>

            </div>

            <div className="navbar-links">
                <a href="#movies">Movies</a>
                <a href="#shows">Shows</a>
                <a href="#more">More</a>
            </div>

        </nav>
    );
};

export default Navbar;

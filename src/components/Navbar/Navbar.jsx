import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">#Movies DB</div>
            <div className="navbar-links">
                <a href="#movies">Movies</a>
                <a href="#shows">Shows</a>
                <a href="#more">More</a>
            </div>

        </nav>
    );
};

export default Navbar;

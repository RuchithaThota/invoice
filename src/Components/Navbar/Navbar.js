
import React from 'react';
import logo from './logo.png';
import './Navbar.css';

const Navbar = () => {
return (
    <div className="navbar">
        <div className="image"><img src={logo} alt='logo'/></div>
        <h2 className="heading"
        >Billing-App.</h2>
        </div>
    );
};

export default Navbar;
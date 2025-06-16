import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="main-navbar">
    <div className="navbar-logo">KnowAssist</div>
    <div className="navbar-links">
      <NavLink
        to="/ingest"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Ingest
      </NavLink>
      <NavLink
        to="/chatbot"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Chatbot
      </NavLink>
    </div>
  </nav>
);

export default Navbar;
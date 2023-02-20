import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <nav className="nav-container">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Header;

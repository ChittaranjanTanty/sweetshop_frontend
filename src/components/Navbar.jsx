import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn = false, showSearch = false }) => {
  return (
    <header className="navbarWrapper">
      <div className="logoSection">
        <img className="siteLogo" src="/logo.png" alt="logo" />
        <h2 className="siteTitle">SweetShop</h2>
      </div>

      {showSearch && (
        <div className="searchBar">
          <input
            type="text"
            className="searchInput"
            placeholder="Search sweets..."
          />
          <button className="searchBtn">Search</button>
        </div>
      )}

      <nav className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/sweets">Sweets</Link>
        {isLoggedIn ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

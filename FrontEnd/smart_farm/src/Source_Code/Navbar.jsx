import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Navbar.css";
import logo from "./Images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/home");
      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home">
          <img src={logo} alt="SmartFarm Logo" className="navbar-logo" />
        </Link>
        <h2 className="navbar-title">SmartFarm</h2>
      </div>

      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>

        <Link to={user ? "/services" : "/login"}>Services</Link>

        {/* NEW ADDED BUTTONS */}
        <Link to="/cropinfohome">Crop</Link>
        <Link to="/diseaseinfo">Disease</Link>
        <Link to="/fertilizerlist">Fertilizer</Link>

        <Link to="/contact">Contact</Link>

        {user ? (
          <button className="logout-btn-c" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


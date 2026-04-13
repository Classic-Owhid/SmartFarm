import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaSeedling, FaFlask, FaBug, FaEdit } from "react-icons/fa";
import "./AdminCSS/AdminDash.css";

function AdminDash({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <Link to="adminwel">
          <h2 className="sidebar-title">Admin Panel</h2>
        </Link>

        <ul className="menu">
          {/* Crop Section */}
          <Link to="/admindash/cropinfo">
            <li className="menu-item">
              <FaSeedling className="menu-icon" />
              <span>Crop Information</span>
            </li>
          </Link>
          <Link to="/admindash/cropedit">
            <li className="menu-item">
              <FaEdit className="menu-icon" />
              <span>Crop Edit</span>
            </li>
          </Link>

          {/* Fertilizer Section */}
          <Link to="/admindash/fertilizerinfo">
            <li className="menu-item">
              <FaFlask className="menu-icon" />
              <span>Fertilizer Details</span>
            </li>
          </Link>
          <Link to="/admindash/fertilizeredit">
            <li className="menu-item">
              <FaEdit className="menu-icon" />
              <span>Fertilizer Edit</span>
            </li>
          </Link>

          {/* Disease Section */}
          <Link to="/admindash/diseaseinfo">
            <li className="menu-item">
              <FaBug className="menu-icon" />
              <span>Disease</span>
            </li>
          </Link>
          <Link to="/admindash/diseaseedit">
            <li className="menu-item">
              <FaEdit className="menu-icon" />
              <span>Disease Edit</span>
            </li>
          </Link>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDash;

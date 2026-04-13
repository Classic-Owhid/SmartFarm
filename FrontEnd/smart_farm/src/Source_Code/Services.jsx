import React from "react";
import "./CSS/Services.css";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-overlay">
        <h2 className="services-title">Empowering Smart Farming</h2>
        <p className="services-subtitle">Choose what you need</p>

        <div className="services-buttons">
          <Link to="/reccrop">
            <button className="service-btn crop">
              🌿 Identify Suitable Crop
            </button>
          </Link>
          <Link to="/disease">
            <button className="service-btn disease">
              🩺 Identify Plant Disease
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;

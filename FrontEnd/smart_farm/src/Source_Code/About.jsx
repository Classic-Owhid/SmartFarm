
import React from "react";
import "./CSS/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1>About SmartFarm</h1>
        <p>
          SmartFarm is an intelligent agriculture platform powered by machine learning.
          It helps farmers make informed decisions to increase crop yield and reduce losses.
        </p>
        <h2>Features:</h2>
        <ul>
          <li>
            <strong>Crop Recommendation:</strong> Suggests suitable crops based on 
            soil parameters like humidity, temperature, soil pH, rainfall, and other environmental factors.
          </li>
          <li>
            <strong>Disease Detection:</strong> Detects crop diseases using leaf images and 
            provides solutions to manage them effectively.
          </li>
          <li>
            <strong>Farmer-Friendly Interface:</strong> Easy-to-use platform accessible to farmers of all levels.
          </li>
        </ul>
        <p>
          By combining technology and agriculture, SmartFarm empowers farmers to make data-driven decisions 
          for better productivity and sustainability.
        </p>
      </div>
    </div>
  );
};

export default About;

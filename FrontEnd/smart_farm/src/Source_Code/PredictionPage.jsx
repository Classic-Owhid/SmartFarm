import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/PredictionPage.css";

const PredictionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendation } = location.state || {};

  if (!recommendation) {
    navigate("/reccrop");
    return null;
  }

  return (
    <div className="prediction-container">
      <div className="prediction-card">
        <h2>🌱 Crop Recommendation</h2>
        <p className="prediction-text">
          Based on your input, the recommended crop is:
        </p>
        <h1 className="predicted-crop">{recommendation}</h1>
      </div>

      <button className="back-button" onClick={() => navigate("/reccrop")}>
        ← Back
      </button>
    </div>
  );
};

export default PredictionPage;

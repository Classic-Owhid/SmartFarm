import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/NormalCropResult.css";

function NormalCropResult() {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    return (
      <div className="normal-crop-result-container">
        <div className="error-message">
          ❌ No crop data received. Please go back and submit the form again.
        </div>
        <button className="back-button" onClick={() => navigate("/nfreecroprec")}>
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="normal-crop-result-container">
      <div className="result-content">
        <div className="success-icon">✅</div>
        
        <h1 className="result-header">Recommended Crop</h1>
        
        <div className="crop-celebration">🎉</div>
        
        <div className="result-message">
          Based on your farm conditions, we recommend planting:
        </div>
        
        <div className="recommended-crop">
          {location.state.crop}
        </div>
        
        <div className="result-message">
          This crop is well-suited for your specified region, season, 
          temperature, and soil type conditions.
        </div>
        
        <button className="back-button" onClick={() => navigate("/nfreecroprec")}>
          Back to Form
        </button>
      </div>
    </div>
  );
}

export default NormalCropResult;
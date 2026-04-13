import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/CropRecent.css";

function CropRecent() {
  const [crop, setCrop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/adminfeatures/croprecent")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setCrop(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleExploreMore = () => {
    navigate("/cropinfohome");
  };

  if (!crop) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <div className="recent-crop-section">
      <div className="recent-crop-card">
        <h2>🌱 New Crop</h2>
        <img
          src={`http://localhost:8000/media/${crop.image_paths[0]}`}
          alt={crop.cropname}
          className="recent-crop-image"
        />
        <h3>{crop.cropname}</h3>
        <p><strong>Season:</strong> {crop.season_to_plant}</p>
        <p><strong>Expected Income:</strong> {crop.expected_market_income}</p>
        <button className="explore-btn" onClick={handleExploreMore}>
          Explore More
        </button>
      </div>
    </div>
  );
}

export default CropRecent;

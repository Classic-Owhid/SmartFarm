import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminCSS/CropInfoEdit.css";

function CropInfoEdit() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch crops from API
  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/adminfeatures/crops/"
      );
      if (!response.ok) {
        throw new Error("Failed to load crops");
      }

      const data = await response.json();
      setCrops(data);
      setLoading(false);
      console.log(data);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCropClick = (crop) => {
    // Navigate to CropInformation page with crop data for editing
    navigate("/admindash/cropinfo", {
      state: {
        cropData: crop,
        isEditing: true,
      },
    });
  };

  if (loading) {
    return <div className="loading">Loading crops...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="crop-edit-container">
      <h2 className="page-title">📝 Edit Crop Information</h2>
      <p className="page-subtitle">Click on any crop to edit its information</p>

      {crops.length === 0 ? (
        <div className="no-crops">
          No crops found. Please add some crops first.
        </div>
      ) : (
        <div className="crops-list">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="crop-item"
              onClick={() => handleCropClick(crop)}
            >
              <div className="crop-image">
                {crop.image_paths && crop.image_paths.length > 0 ? (
                <img
  src={`http://localhost:8000/media/${crop.image_paths[0]}`}
  alt={crop.cropname}
  className="crop-thumbnail"
/>


                ) : (
                  <div className="crop-placeholder">🌱</div>
                )}
              </div>

              <div className="crop-info">
                <h3 className="crop-name">{crop.cropname}</h3>
                <p className="crop-season">Season: {crop.season_to_plant}</p>
              </div>

              <div className="edit-indicator">✏️</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CropInfoEdit;

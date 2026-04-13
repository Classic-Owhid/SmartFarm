import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/CropInfoHome.css";

function CropInfoHome() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const backendUrl = "http://localhost:8000/";

  useEffect(() => {
    fetch("http://localhost:8000/adminfeatures/cropinfohome/")
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleShowMore = (crop) => {
    navigate("/cropinfo/details", { state: { crop } });
  };

  if (loading) {
    return <div className="loading">Loading crops...</div>;
  }

  if (crops.length === 0) {
    return <div className="loading">No crops found.</div>;
  }

  return (
    <div className="crop-info-home">
      <h1>Crop List</h1>

      <div className="crop-list">
        {crops.map((crop) => {
          // Get first image URL
          const imgPath = Array.isArray(crop.image_paths) && crop.image_paths.length > 0
            ? crop.image_paths[0]
            : "";
         const imgUrl = imgPath ? `http://localhost:8000/media/${imgPath}` : "";

          return (
            <div key={crop.id} className="crop-card">
              {imgUrl && <img src={imgUrl} alt={crop.cropname} />}

              <div className="crop-content">
                <h3 className="crop-name">{crop.cropname}</h3>

                <div className="income-container">
                  <span className="income-label">Income:</span>
                  <span className="income-highlight">{crop.expected_market_income}</span>
                </div>
              </div>

              <button
                className="show-more-btn"
                onClick={() => handleShowMore(crop)}
              >
                Show More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CropInfoHome;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/CropInfoCard.css"; // optional for styling

function CropInfoCard() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.crop) {
    return <h2>No data received</h2>;
  }

  const crop = state.crop;
  const backendUrl = "http://localhost:8000/media/";

  // ---------- Carousel state ----------
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = crop.image_paths.map((img) => `${backendUrl}${img.replace(/\\/g, "/")}`);

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="crop-info-card">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{crop.cropname}</h1>

      {/* Sliding Image */}
      <div className="image-gallery">
        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt={crop.cropname}
            className="slide-image"
          />
        )}
      </div>

      <p><strong>Season:</strong> {crop.season_to_plant}</p>
      <p><strong>How to grow:</strong> {crop.howtogrow}</p>
      <p><strong>Advantage:</strong> {crop.advantage}</p>
      <p><strong>Harvest:</strong> {crop.harvest_time}</p>
      <p><strong>Income:</strong> {crop.expected_market_income}</p>
    </div>
  );
}

export default CropInfoCard;

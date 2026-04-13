import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/FertilizerRecent.css";

function FertilizerRecent() {
  const [fertilizer, setFertilizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/adminfeatures/recentfertilizer")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setFertilizer(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleExploreMore = () => navigate("/fertilizerlist");

  if (loading)
    return (
      <div className="recent-fertilizer-card">
        <div className="loading-text">Loading fertilizer information...</div>
      </div>
    );

  if (!fertilizer)
    return (
      <div className="recent-fertilizer-card">
        <div className="loading-text">No fertilizers available</div>
      </div>
    );

  return (
    <div className="recent-fertilizer-card">
      <h2>🌿 New Fertilizer</h2>
      <span className="fertilizer-icon">🌱</span>
      <h3>{fertilizer.fertilizername}</h3>
      <p>
        <strong>Advantages:</strong> {fertilizer.advantages}
      </p>
      <button className="explore-btn" onClick={handleExploreMore}>
        Explore More Fertilizers
      </button>
    </div>
  );
}

export default FertilizerRecent;

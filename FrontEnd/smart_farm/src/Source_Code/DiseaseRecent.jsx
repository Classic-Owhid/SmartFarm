import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/DiseaseRecent.css";

function DiseaseRecent() {
  const [disease, setDisease] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/adminfeatures/recentdisease")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setDisease(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleExploreMore = () => {
    navigate("/diseaseinfo");
  };

  if (!disease) return <div className="loading-text">Loading...</div>;

  return (
    <div className="recent-disease-card">
      <h2>🦠 New Disease</h2>
      <h3>{disease.name}</h3>
      <p><strong>Cure/Management:</strong> {disease.cure}</p>
      <button className="explore-btn" onClick={handleExploreMore}>
        Explore More
      </button>
    </div>
  );
}

export default DiseaseRecent;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/DiseaseCard.css";

function DiseaseCard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const backendUrl = "http://localhost:8000/media/";

  if (!state || !state.disease) {
    return <h2>No data received</h2>;
  }

  const disease = state.disease;

  return (
    <div className="disease-card-page">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{disease.name}</h1>
      <img
        src={`${backendUrl}${disease.image_path}`}
        alt={disease.name}
        className="disease-image"
      />
      <p><strong>Cure:</strong> {disease.cure}</p>
      <p><strong>Symptoms:</strong> {disease.symptoms}</p>
    </div>
  );
}

export default DiseaseCard;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/FertilizerDetailsH.css";

function FertilizerDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};

  if (!data) return <h2>No data received</h2>;

  return (
    <div className="fertilizer-detail-card">
      
      <button
        className="back-button"
        onClick={() => navigate("/fertilizerlist")}
      >
        ← Back
      </button>

      <h2>{data.fertilizername}</h2>

      <p><strong>When to use:</strong> {data.when_to_use}</p>
      <p><strong>Usage Guide:</strong> {data.usage_guide}</p>
      <p><strong>Advantages:</strong> {data.advantages}</p>
    </div>
  );
}

export default FertilizerDetails;

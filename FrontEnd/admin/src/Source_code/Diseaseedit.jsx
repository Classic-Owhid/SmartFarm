import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminCSS/Diseaseedit.css";

function Diseaseedit() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch diseases from backend
  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const res = await fetch("http://localhost:8000/adminfeatures/diseases/");
      if (!res.ok) throw new Error("Failed to fetch diseases");
      const data = await res.json();
      setDiseases(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditClick = (disease) => {
    navigate("/admindash/diseaseinfo", {
      state: {
        diseaseData: disease,
        isEditing: true,
      },
    });
  };

  if (loading) return <div className="loading">Loading diseases...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="disease-edit-container">
      <h2 className="page-title">📝 Edit Disease Details</h2>
      <p className="page-subtitle">Click the pencil to edit a disease</p>

      {diseases.length === 0 ? (
        <div className="no-diseases">No diseases found.</div>
      ) : (
        <div className="diseases-list">
          {diseases.map((disease) => (
            <div key={disease.id} className="disease-item">
              <div className="disease-info">
                <h3>{disease.name}</h3>
                <img
                  src={disease.image_path}
                  alt={disease.name}
                  className="disease-image"
                />
                <p><strong>Cure:</strong> {disease.cure}</p>
              </div>
              {/* Pencil edit indicator */}
              <div
                className="edit-indicator"
                onClick={() => handleEditClick(disease)}
              >
                ✏️
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Diseaseedit;

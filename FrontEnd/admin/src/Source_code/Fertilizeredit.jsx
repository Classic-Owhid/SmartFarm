import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminCSS/Fertilizeredit.css";

function Fertilizeredit() {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch fertilizers from backend
  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const res = await fetch("http://localhost:8000/adminfeatures/fertilizers/");
      if (!res.ok) throw new Error("Failed to fetch fertilizers");
      const data = await res.json();
      setFertilizers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditClick = (fert) => {
    navigate("/admindash/fertilizerinfo", {
      state: {
        fertilizerData: fert,
        isEditing: true,
      },
    });
  };

  if (loading) return <div className="loading">Loading fertilizers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="fertilizer-edit-container">
      <h2 className="page-title">📝 Edit Fertilizer Details</h2>
      <p className="page-subtitle">Click on a fertilizer to edit its details</p>

      {fertilizers.length === 0 ? (
        <div className="no-fertilizers">No fertilizers found.</div>
      ) : (
        <div className="fertilizers-list">
          {fertilizers.map((fert) => (
            <div
              key={fert.id}
              className="fertilizer-item"
              onClick={() => handleEditClick(fert)}
            >
              <div className="fertilizer-info">
                <h3>{fert.fertilizername}</h3>
                <p>When to Use: {fert.when_to_use}</p>
              </div>
              <div className="edit-indicator">✏️</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Fertilizeredit;

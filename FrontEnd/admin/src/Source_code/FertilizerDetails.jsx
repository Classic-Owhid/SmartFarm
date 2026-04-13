import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminCSS/FertilizerDetails.css";

function FertilizerDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fertilizerData, isEditing } = location.state || {};

  const [formData, setFormData] = useState({
    fertilizerName: "",
    usageTime: "",
    guide: "",
    advantage: "",
  });

  const fertilizerOptions = [
    "Urea",
    "DAP : Di-Ammonium Phosphate",
    "Potash",
    "Compost",
    "Nitrogen",
    "Phosphorus",
  ];

  // Pre-fill form if editing
  useEffect(() => {
    if (isEditing && fertilizerData) {
      setFormData({
        fertilizerName: fertilizerData.fertilizername || "",
        usageTime: fertilizerData.when_to_use || "",
        guide: fertilizerData.usage_guide || "",
        advantage: fertilizerData.advantages || "",
      });
    }
  }, [fertilizerData, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fertilizerName: formData.fertilizerName,
      usageTime: formData.usageTime,
      guide: formData.guide,
      advantage: formData.advantage,
    };

    try {
      const url = isEditing
        ? `http://localhost:8000/adminfeatures/fertilizer/update/${fertilizerData.id}/`
        : "http://localhost:8000/adminfeatures/addfertilizer/";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Fertilizer saved successfully!");
        navigate("/admindash/fertilizeredit"); // go back to list
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit fertilizer details");
    }
  };

  return (
    <div className="fertilizer-container">
      <h2>{isEditing ? "✏️ Edit Fertilizer" : "🌿 Add Fertilizer"}</h2>
      <form className="fertilizer-form" onSubmit={handleSubmit}>
        <label>
          Fertilizer Name:
          <select
            name="fertilizerName"
            value={formData.fertilizerName}
            onChange={handleChange}
            required
          >
            <option value="">Select Fertilizer</option>
            {fertilizerOptions.map((fertilizer) => (
              <option key={fertilizer} value={fertilizer}>
                {fertilizer}
              </option>
            ))}
          </select>
        </label>

        <label>
          When to Use:
          <input
            type="text"
            name="usageTime"
            value={formData.usageTime}
            onChange={handleChange}
            placeholder="Ex: During planting season"
            required
          />
        </label>

        <label>
          Usage Guide:
          <textarea
            name="guide"
            value={formData.guide}
            onChange={handleChange}
            placeholder="Provide a short guide"
            rows="4"
            required
          />
        </label>

        <label>
          Advantages:
          <textarea
            name="advantage"
            value={formData.advantage}
            onChange={handleChange}
            placeholder="Benefits of using this fertilizer"
            rows="3"
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          {isEditing ? "Update Fertilizer" : "Save Fertilizer"}
        </button>
      </form>
    </div>
  );
}

export default FertilizerDetails;

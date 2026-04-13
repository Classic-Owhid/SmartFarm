import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminCSS/DiseaseInfo.css";

function DiseaseInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { diseaseData, isEditing } = location.state || {};

  const [formData, setFormData] = useState({
    diseaseName: "",
    image: null,
    symptoms: "",
    cure: "",
  });

  
  useEffect(() => {
    if (isEditing && diseaseData) {
      setFormData({
        diseaseName: diseaseData.name || "",
        image: null, 
        symptoms: diseaseData.symptoms || "",
        cure: diseaseData.cure || "",
      });
    }
  }, [diseaseData, isEditing]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("diseaseName", formData.diseaseName);
    fd.append("symptoms", formData.symptoms);
    fd.append("cure", formData.cure);
    if (formData.image) fd.append("image", formData.image);

    // Send ID in FormData if editing
    if (isEditing && diseaseData) {
      fd.append("disease_id", diseaseData.id);
    }

    try {
      const url = "http://localhost:8000/adminfeatures/disease/save/"; 
      const res = await fetch(url, { method: "POST", body: fd });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/admindash/diseaseedit");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit disease info.");
    }
  };

  return (
    <div className="disease-container">
      <h2>{isEditing ? "✏️ Edit Disease" : "🌿 Add Disease"}</h2>
      <form className="disease-form" onSubmit={handleSubmit}>
        <label>
          Disease Name:
          <input
            type="text"
            name="diseaseName"
            value={formData.diseaseName}
            onChange={handleChange}
            placeholder="Enter disease name"
            required
          />
        </label>

        {isEditing && diseaseData && diseaseData.image_path && (
          <div className="current-image">
            <p>Current Image:</p>
            <img
              src={diseaseData.image_path}
              alt={diseaseData.name}
              className="preview-image"
            />
          </div>
        )}

        <label>
          Upload Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            {...(isEditing ? {} : { required: true })}
          />
        </label>

        <label>
          Symptoms:
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Describe the symptoms"
            rows="4"
            required
          ></textarea>
        </label>

        <label>
          Cure:
          <textarea
            name="cure"
            value={formData.cure}
            onChange={handleChange}
            placeholder="Provide cure or treatment"
            rows="3"
            required
          ></textarea>
        </label>

        <button type="submit" className="submit-btn">
          {isEditing ? "Update Disease" : "Save Disease Info"}
        </button>
      </form>
    </div>
  );
}

export default DiseaseInfo;

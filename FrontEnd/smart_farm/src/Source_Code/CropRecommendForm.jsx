import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/CropRecommendForm.css";

export default function CropRecommendForm() {
  const [formData, setFormData] = useState({
    ph: "",
    p: "",
    k: "",
    n: "",
    temp: "",
    rainfall: "",
    humidity: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.ph === "" ||
      formData.p === "" ||
      formData.k === "" ||
      formData.temp === "" ||
      formData.n === "" ||
      formData.rainfall === "" ||
      formData.humidity === ""
    ) {
      setError("⚠️ Please fill out all fields before submitting.");
      return;
    }

    if (formData.ph < 0 || formData.ph > 14) {
      setError("⚠️ Soil pH must be between 0 and 14.");
      return;
    }
    if(formData.temp>50){
      setError("⚠️ Temperture must be less than 50");
    }

    const payload = {
      ph: parseFloat(formData.ph),
      p: parseFloat(formData.p),
      temp: parseFloat(formData.temp),
      n: parseFloat(formData.n),
      k: parseFloat(formData.k),
      rainfall: parseFloat(formData.rainfall),
      humidity: parseFloat(formData.humidity),
    };

    try {
      const res = await fetch("http://localhost:8000/api/crop/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        setError("⚠️ Server error: " + data.error);
      } else {
        // ✅ Navigate to the prediction page with recommendation
        navigate("/prediction", {
          state: { recommendation: data.recommendation },
        });
      }
    } catch (err) {
      setError("⚠️ Could not connect to server.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-card">
          <h2>🌾 SmartFarm Crop Recommendation</h2>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Soil pH :</label>
              <input type="number" name="ph" value={formData.ph} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Phosphorus (P) :</label>
              <input type="number" name="p" value={formData.p} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Potassium (K) :</label>
              <input type="number" name="k" value={formData.k} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Temperature (°C) :</label>
              <input type="number" name="temp" value={formData.temp} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Nitrogen (N) :</label>
              <input type="number" name="n" value={formData.n} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Rainfall (mm) :</label>
              <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Humidity (%) :</label>
              <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

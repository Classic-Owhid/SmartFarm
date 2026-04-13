import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CSS/NormalCropRec.css";

function NormalCropRec() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    Region: "",
    Season: "",
    Temperature: "",
    Soil_Type: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch("http://localhost:8000/adminfeatures/normalrec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      navigate("/normalcropresult", {
        state: { crop: data.recommended_crop }
      });

    } catch (error) {

      console.error("Error:", error);
      alert("Server connection error");

    }
  };

  return (
    <div className="normal-crop-container">

      <h2>Smart Farm Crop Recommendation</h2>

      <form onSubmit={handleSubmit} className="crop-form">

        <div className="hints">
          <h3>Hints:</h3>
          <ul>
            <li>This is free Feature.</li>
            <li>Click On Advance Fetaures.</li>
            <li>To use more features.</li>
          </ul>
        </div>

        <div className="buttonrec">
          <Link to="/services">
            <button type="button" id="adv1">
              Advanced Features
            </button>
          </Link>
        </div>

        <div className="form-group">
          <label>Region:</label>
          <select
            name="Region"
            value={form.Region}
            onChange={handleChange}
            required
          >
            <option value="">Select Region</option>
            <option value="Mountain">Mountain</option>
            <option value="Hill">Hill</option>
            <option value="Terai">Terai</option>
          </select>
        </div>

        <div className="form-group">
          <label>Season:</label>
          <select
            name="Season"
            value={form.Season}
            onChange={handleChange}
            required
          >
            <option value="">Select Season</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Rainy">Rainy</option>
          </select>
        </div>

        <div className="form-group">
          <label>Temperature (°C):</label>
          <input
            type="number"
            name="Temperature"
            value={form.Temperature}
            onChange={handleChange}
            required
            placeholder="Enter temperature"
          />
        </div>

        <div className="form-group">
          <label>Soil Type:</label>
          <select
            name="Soil_Type"
            value={form.Soil_Type}
            onChange={handleChange}
            required
          >
            <option value="">Select Soil Type</option>
            <option value="Clay">Clay</option>
            <option value="Black Soil">Black Soil</option>
            <option value="Rocky/Stony">Rocky/Stony</option>
            <option value="Loamy">Loamy</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Recommend Crop
        </button>

      </form>

    </div>
  );
}

export default NormalCropRec;
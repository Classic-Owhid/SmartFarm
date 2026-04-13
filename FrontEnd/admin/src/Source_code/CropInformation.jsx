import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminCSS/CropInformation.css";

function CropInformation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cropData, isEditing } = location.state || {};

  const [formData, setFormData] = useState({
    cropName: "",
    season: "",
    images: [], // new uploaded files
    howToGrow: "",
    advantages: "",
    harvestTime: "",
    marketIncome: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (isEditing && cropData) {
      setFormData({
        cropName: cropData.cropname || "",
        season: cropData.season_to_plant || "",
        images: [], // keep empty, admin can add new images
        howToGrow: cropData.howtogrow || "",
        advantages: cropData.advantage || "",
        harvestTime: cropData.harvest_time || "",
        marketIncome: cropData.expected_market_income || "",
      });
    }
  }, [cropData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing && formData.images.length < 3) {
      alert("Please upload at least 3 images.");
      return;
    }

    const fd = new FormData();
    fd.append("cropname", formData.cropName);
    fd.append("season_to_plant", formData.season);
    fd.append("howtogrow", formData.howToGrow);
    fd.append("advantage", formData.advantages);
    fd.append("harvest_time", formData.harvestTime);
    fd.append("expected_market_income", formData.marketIncome);

    formData.images.forEach((img) => fd.append("images", img));

    try {
      const url = isEditing
        ? `http://localhost:8000/adminfeatures/crops/update/${cropData.id}/`
        : "http://localhost:8000/adminfeatures/addcrop/";

      const method = isEditing ? "PATCH" : "POST";


      const res = await fetch(url, {
    method: "POST",  
    body: fd,
      });

      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Crop saved successfully!");
        
        navigate("/admindash/cropedit");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit crop info.");
    }
  };

  return (
    <div className="crop-container">
      <h2 className="form-title">
        {isEditing ? "✏️ Edit Crop Information" : "🌿 Add New Crop Information"}
      </h2>

      <form className="crop-form" onSubmit={handleSubmit}>
        <label>Crop Name:</label>
        <input
          type="text"
          name="cropName"
          value={formData.cropName}
          onChange={handleChange}
          required
        />

        <label>Season to Plant:</label>
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          required
        >
          <option value="">Select Season</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
        </select>

        {isEditing && cropData?.image_paths?.length > 0 && (
          <div className="existing-images">
            <p>Existing Images:</p>
            {cropData.image_paths.map((img, i) => (
              <img
                key={i}
               src={`http://localhost:8000/media/${img}`}

                alt={`Crop ${i + 1}`}
                className="thumb"
              />
            ))}
          </div>
        )}

        <label>
          Upload Crop Images {isEditing ? "(Optional)" : "(min 3)"}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <label>How to Grow:</label>
        <textarea
          name="howToGrow"
          value={formData.howToGrow}
          onChange={handleChange}
          required
        />

        <label>Advantages:</label>
        <textarea
          name="advantages"
          value={formData.advantages}
          onChange={handleChange}
        />

        <label>Harvest Time:</label>
        <input
          type="text"
          name="harvestTime"
          value={formData.harvestTime}
          onChange={handleChange}
        />

        <label>Expected Market Income:</label>
        <input
          type="text"
          name="marketIncome"
          value={formData.marketIncome}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          {isEditing ? "Update Crop" : "Save Crop Info"}
        </button>
      </form>
    </div>
  );
}

export default CropInformation;

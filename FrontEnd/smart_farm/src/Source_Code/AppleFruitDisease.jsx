import React, { useState } from "react";
import axios from "axios";
import "./CSS/AppleFruitDisease.css"; 

const AppleFruitDisease = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPrediction(null);
    setConfidence(null);
    setSolution(null);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/apple/predict/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPrediction(res.data.prediction);
      setConfidence(res.data.confidence);
      setSolution(res.data.solution);
    } catch (err) {
      console.error(err);
      alert("Error predicting disease. Make sure the backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="afd-wrapper">
      <div className="afd-container">
        <h2 className="afd-heading">Apple Fruit Disease Prediction</h2>
        <form onSubmit={handleSubmit} className="afd-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="afd-file-input"
          />
          {preview && (
            <img src={preview} alt="Preview" className="afd-preview" />
          )}
          <button type="submit" className="afd-button" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {prediction && (
          <div className="afd-result-card">
            <h3>Prediction: {prediction}</h3>
            <p>Confidence: {confidence}%</p>
            <p>Solution: {solution}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppleFruitDisease;

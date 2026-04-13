import React, { useState } from "react";
import axios from "axios";
import './CSS/AppleDiseasePredict.css';

const AppleDiseasePredict = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [cure, setCure] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
    setCure("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);
    setResult("");
    setCure("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/disease/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data.prediction || "No prediction received.");
      setCure(response.data.cure || "No cure information available.");
    } catch (error) {
      console.error("Error:", error);
      setResult("Error during prediction.");
      setCure("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apple-disease-page">
      <div className="apple-disease-container">
        <h2 className="apple-disease-title">🍎 Apple Disease Prediction</h2>

        <form onSubmit={handleSubmit} className="apple-disease-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="apple-disease-file-input"
          />

          {preview && (
            <div className="apple-disease-preview-container">
              <img src={preview} alt="Preview" className="apple-disease-image" />
            </div>
          )}

          
          <button type="submit" disabled={loading} className="apple-disease-button" style={{ marginTop: preview ? '20px' : '10px' }}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {result && (
          <div className="apple-disease-result-card">
            <h3 className="apple-disease-result-title">Prediction Result</h3>
            <p><strong>Disease:</strong> {result}</p>
            <p><strong>Cure:</strong> {cure}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppleDiseasePredict;

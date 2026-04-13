import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/DiseaseList.css";

function DiseaseList() {
  const [diseases, setDiseases] = useState([]);
  const navigate = useNavigate();
  const backendUrl = "http://localhost:8000/media/";

  useEffect(() => {
    fetch("http://localhost:8000/adminfeatures/diseaseinfohome/")
      .then((res) => res.json())
      .then((data) => setDiseases(data))
      .catch((err) => console.error(err));
  }, []);

  const handleShowMore = (disease) => {
    navigate("/diseasecard", { state: { disease } });
  };

  if (diseases.length === 0) {
    return <div className="loading">Loading diseases...</div>;
  }

  return (
    <div className="disease-list-page">
      <h1>Disease List</h1>
      <div className="disease-list">
        {diseases.map((d) => (
          <div key={d.id} className="disease-card">
            <img src={`${backendUrl}${d.image_path}`} alt={d.name} />
            <div className="disease-content">
              <h3>{d.name}</h3>
              <p>{d.cure}</p>
              <button onClick={() => handleShowMore(d)}>Show More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiseaseList;



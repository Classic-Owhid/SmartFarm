import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/DiseaseClassify.css";

const DiseaseClassify = () => {
  const navigate = useNavigate();

  const handleLeafClick = () => {
    navigate("/leafdisease");
  };

  const handleFruitClick = () => {
    navigate("/fruitdisease");
  };

  return (
    <div className="dc-wrapper">
      <div className="container">
        <h2 className="heading">Select Prediction Type</h2>
        <div className="button-container">
          <Link to="/leafdisease">
            <button className="button" onClick={handleLeafClick}>
              Predict Disease with Leaf
            </button>
          </Link>
          <Link to="/fruitdisease">
            <button className="button" onClick={handleFruitClick}>
              Predict Disease with Fruit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiseaseClassify;

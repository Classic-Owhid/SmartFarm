import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/FertilizerList.css"

function FertilizerList() {
  const [fertilizers, setFertilizers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/adminfeatures/fertilizerhomelist/")
      .then((res) => res.json())
      .then((data) => setFertilizers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="fertilizer-list">
      <h2>Fertilizers</h2>

      {fertilizers.map((item) => (
        <div className="fertilizer-card" key={item.id}>
          <h3>{item.fertilizername}</h3>

          <button
            onClick={() =>
              navigate("/fertilizerdetails", { state: { data: item } })
            }
          >
            Show More
          </button>
        </div>
      ))}
    </div>
  );
}

export default FertilizerList;

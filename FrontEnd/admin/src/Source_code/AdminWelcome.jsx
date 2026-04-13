import React from "react";
import "./AdminCSS/AdminWelcome.css";

function AdminWelcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2>🌿 Welcome Admin!</h2>
        <p>
          Please select an option from the sidebar to manage crops, fertilizers, or diseases.
        </p>
      </div>
    </div>
  );
}

export default AdminWelcome;

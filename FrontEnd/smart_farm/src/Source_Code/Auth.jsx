// Source_Code/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function Auth({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Auth;

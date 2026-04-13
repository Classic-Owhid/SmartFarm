import React from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const isLoggedIn = localStorage.getItem("adminToken");

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default Auth;

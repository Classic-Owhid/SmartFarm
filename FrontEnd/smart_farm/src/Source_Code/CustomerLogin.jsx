import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/CustomerLogin.css";

function CustomerLogin({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form validation
  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/user_login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Save user to localStorage and update App state
        const userData = { email: formData.email, isAdmin: data.admin };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        // Redirect based on admin or customer
        navigate(data.admin ? "/admindash" : "/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          {/* Password */}
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          {/* Submit */}
          <button type="submit" className="register-btn">Login</button>

          {/* Register Link */}
          <p className="login-text">
            Don't have an account? <Link to="/register" className="login-link">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;

import React, { useState } from "react";
import { Link } from "react-router-dom"; // React Router Link
import "./CSS/CustomerRegister.css";

function CustomerRegister() {
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const payload = {
        username: formData.username,
        address: formData.address,
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.status === "success") {
          alert("Registration Successful ");
          setFormData({
            username: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          alert("Registration failed ");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          {/* Address */}
          <label>Address</label>
          <input
            className="form-input"
            type="text"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}

          {/* Email */}
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          {/* Password */}
          <label>Password</label>
          <div className="password-box">
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          {/* Confirm Password */}
          <label>Confirm Password</label>
          <div className="password-box">
            <input
              className="form-input"
              type={showCPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowCPassword(!showCPassword)}
            >
              {showCPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          {/* Submit Button */}
          <button type="submit" className="register-btn">
            Register
          </button>

          {/* Login Link */}
          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css";
import Navbar from "../components/NavBar";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Optional frontend validation
    if (
      formData.firstName.trim().length < 5 ||
      formData.lastName.trim().length < 5 ||
      formData.password.length < 6 ||
      formData.mobileNumber.trim().length !== 10
    ) {
      alert(
        "First & Last name must be ≥5 chars, password ≥6 chars, mobile 10 digits"
      );
      return;
    }

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      // Remove confirmPassword and trim values
      const submitData = Object.fromEntries(
        Object.entries(formData)
          .filter(([key]) => key !== "confirmPassword")
          .map(([key, value]) => [key, value.trim ? value.trim() : value])
      );

      // Convert to URL-encoded string
      const formBody = new URLSearchParams(submitData).toString();

      const res = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! You can now login.");
        setFormData({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "USER",
          address: "",
        });
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="signupPageWrapper">
      <Navbar showSearch={false} />

      <main className="signupMain">
        <h1 className="signupTitle">Create an Account</h1>
        <form className="signupForm" onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile Number
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Role
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>

          <button type="submit" className="signupBtn">
            Sign Up
          </button>
        </form>

        <p className="redirectLogin">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </main>
    </div>
  );
};

export default SignupPage;


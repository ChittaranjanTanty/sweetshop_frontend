import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      login(data.data.userData); // save user in context
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="loginPageWrapper">
      <Navbar showSearch={false} />
      <main className="loginMain">
        <h1 className="loginTitle">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
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
          <button type="submit" className="loginBtn">Login</button>
        </form>
        <p className="redirectSignup">
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;

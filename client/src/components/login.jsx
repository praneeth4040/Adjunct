import React from "react";
import { Link } from "react-router-dom";
import {useState} from "react"
const LoginPage = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    // Add your form submission logic here
    console.log(username,password)
    console.log("Form submitted");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "24rem" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mb-3 text-end">
            <Link to="/forgetpassword" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

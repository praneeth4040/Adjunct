import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showToast } from './totify';

function Signin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [RetypePassword, setRetypePassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
        RetypePassword,
      });

      const val = response.data.value;

      if (val === 0) {
        showToast("error", "All fields are required");
      } else if (val === 1) {
        showToast("error", "Passwords do not match");
      } else if (val === 2) {
        showToast("info", "Email already exists. Redirecting to login page...");
        navigate("/login");
      } else if (val === 3) {
        showToast("success", "Sign up successful. Redirecting to OTP page...");
        navigate("/otp", { state: { email } });
      } else if (val === 4) {
        showToast("error", "Internal server error. Please try again later.");
      } else {
        showToast("error", "An unexpected error occurred");
      }
    } catch (error) {
      showToast("error", "An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <main style={{ backgroundColor: 'black', height: '100vh' }}>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div
          className="card p-4 shadow"
          style={{
            width: '25rem',
            backgroundColor: '#1c1c1c',
            color: 'white',
            borderRadius: '10px',
          }}
        >
          <h1 className="text-center mb-2" style={{ color: '#007bff' }}>
            Create Account
          </h1>
          <p className="text-center mb-4" style={{ color: '#b3b3b3' }}>
            Sign up to get started
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="text" className="form-label" style={{ color: '#b3b3b3' }}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                  border: '1px solid #444',
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: '#b3b3b3' }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                  border: '1px solid #444',
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: '#b3b3b3' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                  border: '1px solid #444',
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label" style={{ color: '#b3b3b3' }}>
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                value={RetypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                required
                style={{
                  backgroundColor: '#2c2c2c',
                  color: 'white',
                  border: '1px solid #444',
                }}
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: '#ff9900',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3" style={{ color: '#b3b3b3' }}>
            Already have an account?{' '}
            <a href="/login" className="text-primary" style={{ textDecoration: 'none' }}>
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signin;

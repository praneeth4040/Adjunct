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
    <main>
      <div className="container vh-100 d-flex align-items-center">
        <div className="row w-100">
          {/* Left Column: Sign Up Form */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow" style={{ width: '25rem' }}>
              <h1 className="text-center mb-4">Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="repeatPassword"
                    value={RetypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <video
              src="C:\Users\Dell\OneDrive\Pictures\Camera Roll\WIN_20240929_20_27_25_Pro.mp4"
              className="w-100 shadow" style={{ height:"500px"}}
              autoPlay
              loop
              muted
            ></video>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;

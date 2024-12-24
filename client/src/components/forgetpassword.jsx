import React from 'react';
import { useState,useEffect } from "react";

function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Set the background color of the entire page
    document.body.style.backgroundColor = '#C89F77'; // Lion Yellow
    return () => {
      // Reset the background color when the component is unmounted
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    console.log("Password reset request submitted for:", email);
    // Add your reset password logic here
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#C89F77' }}>
        <div className="card p-4 shadow" style={{ width: "24rem" }}>
          <h2 className="text-center mb-4">Forget Password</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold' }}>
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label"style={{ fontWeight: 'bold' }}>
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Repeat Password Field */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label"style={{ fontWeight: 'bold' }}>
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Retype new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn" style={{ backgroundColor: '#6F4F37', color: 'white' }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Forgetpassword;

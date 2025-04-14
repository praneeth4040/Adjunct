import React, { useState } from 'react';
import axiosInstance from '../axiosConfig'; // Import the Axios instance
import { useNavigate, Link } from 'react-router-dom';
import { showToast } from './totify';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Signin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [RetypePassword, setRetypePassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State for terms acceptance
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      showToast("error", "You must accept the Terms and Conditions to sign up.");
      return;
    }

    try {
      const response = await axiosInstance.post("/signup", {
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
          <h1 className="text-center mb-2" style={{ color: '#21618c' }}>
            Create Account
          </h1>
          <p className="text-center mb-4" style={{ color: '#b3b3b3' }}>
            Sign up to get started
          </p>
          <form onSubmit={handleSubmit}>
            <div
              className="mb-3 d-flex align-items-center"
              style={{
                backgroundColor: '#2c2c2c',
                borderRadius: '8px',
                padding: '5px 10px',
                border: '1px solid #444',
              }}
            >
              <FaUser style={{ color: '#b3b3b3', marginRight: '10px' }} />
              <input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  height: '30px',
                  padding: '0',
                  caretColor: 'white',
                  borderRadius: "0px",
                }}
              />
              <style>
                {`
                  #Name::placeholder {
                    color: #b3b3b3;
                  }
                `}
              </style>
            </div>
            <div
              className="mb-3 d-flex align-items-center"
              style={{
                backgroundColor: '#2c2c2c',
                borderRadius: '8px',
                padding: '5px 10px',
                border: '1px solid #444',
              }}
            >
              <FaEnvelope style={{ color: '#b3b3b3', marginRight: '10px' }} />
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  height: '30px',
                  padding: '0',
                  caretColor: 'white',
                  borderRadius: "0px",
                }}
              />
              <style>
                {`
                  #email::placeholder {
                    color: #b3b3b3;
                  }
                `}
              </style>
            </div>
            <div
              className="mb-3 d-flex align-items-center"
              style={{
                backgroundColor: '#2c2c2c',
                borderRadius: '8px',
                padding: '5px 10px',
                border: '1px solid #444',
              }}
            >
              <FaLock style={{ color: '#b3b3b3', marginRight: '10px' }} />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  height: '30px',
                  padding: '0',
                  caretColor: 'white',
                  borderRadius: "0px",
                }}
              />
              <style>
                {`
                  #password::placeholder {
                    color: #b3b3b3;
                  }
                `}
              </style>
            </div>
            <div
              className="mb-3 d-flex align-items-center"
              style={{
                backgroundColor: '#2c2c2c',
                borderRadius: '8px',
                padding: '5px 10px',
                border: '1px solid #444',
              }}
            >
              <FaLock style={{ color: '#b3b3b3', marginRight: '10px' }} />
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                placeholder="Repeat Password"
                value={RetypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                required
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  height: '30px',
                  padding: '0',
                  caretColor: 'white',
                  borderRadius: "0px",
                }}
              />
              <style>
                {`
                  #repeatPassword::placeholder {
                    color: #b3b3b3;
                  }
                `}
              </style>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              <label htmlFor="terms" style={{ color: '#b3b3b3', fontSize: '14px' }}>
                I agree to the{" "}
                <a href="/terms" style={{ color: '#ff9900', textDecoration: 'none' }}>
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: acceptedTerms ? '#ff9900' : '#888',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: acceptedTerms ? 'pointer' : 'not-allowed',
              }}
              disabled={!acceptedTerms}
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-3" style={{ color: '#b3b3b3' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-primary" style={{ textDecoration: 'none' }}>
    Login
  </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signin;

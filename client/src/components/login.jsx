import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { showToast } from './totify';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      const val = response.data.value;
      const userName = response.data.name;

      switch (val) {
        case 0:
          showToast("error", "Email and Password are required");
          break;
        case 1:
          showToast("error", "User not found");
          break;
        case 2:
          showToast("info", "Please verify your email first");
          navigate('/home', { state: { email } });
          break;
        case 3:
          showToast("error", "Invalid password");
          break;
        case 4:
          showToast("error", "Internal server error");
          break;
        case 5:
          showToast("success", `Welcome, ${userName}! Login successful.`);
          if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            setTimeout(() => {
              navigate('/home', { state: { userName } });
            }, 500);
          } else {
            showToast("error", "Login failed. Token missing.");
          }
          break;
        default:
          showToast("error", "An undefined error occurred");
          break;
      }
    } catch (error) {
      showToast("error", "An error occurred during login.");
    }
  };

  return (
    <main>
      <div className="container vh-100 d-flex align-items-center">
        <div className="row w-100">
          {/* Left Column: Login Form */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow" style={{ width: '25rem' }}>
              <h1 className="text-center mb-4">Login</h1>
              <form onSubmit={handleSubmit}>
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 text-end">
                  <Link to="/forgetpassword" className="text-decoration-none">Forgot Password?</Link>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="mt-3 text-center">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/signin" className="text-decoration-none">Sign Up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <video
              src="path-to-your-video.mp4"
              className="w-100 shadow" style={{ height:"400px"}}
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

export default LoginPage;

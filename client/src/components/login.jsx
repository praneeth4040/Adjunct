import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
      
      switch(val) {
        case 0:
          console.log("Email and Password are required");
          break;
        case 1:
          console.log("User not found");
          break;
        case 2:
          console.log("Please verify your email first");
          break;
        case 3:
          console.log("Invalid password");
          break;
        case 4:
          console.log("Internal server error");
          break;
        case 5:
          console.log("Login successful", response.data.token, userName);

          // Save token to localStorage and redirect to home page
          if (response.data.token) {
            

            navigate('/home', { state: { userName } }); // Redirect to home page
          } else {
            alert('Login failed');
          }
          break;
        default:
          console.log("Undefined error");
          break;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <main>
      <div className="container d-flex justify-content-center align-items-center vh-100">
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

            {/* Password Field */}
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

            {/* Forgot Password Link */}
            <div className="mb-3 text-end">
              <Link to="/forgetpassword" className="text-decoration-none">Forgot Password?</Link>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-3 text-center">
              <p>
                Don't have an account?{' '}
                <Link to="/signin" className="text-decoration-none">Sign Up</Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;

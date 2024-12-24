import React from 'react';
import axios from 'axios';
import { useState } from 'react';
function LoginPage() {
const [email , setEmail] = useState("");
const [password , setPassword] = useState("");
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login",{email,password})
      const val = response.data.value;
      switch(val){
        case 0: console.log("Email and Password are required")
                break;
        case 1: console.log("User not found")
                break;
        case 2: console.log("Please verify your email first")
                break;
        case 3: console.log("Invalid password")
                break;
        case 4: console.log("Internal server error")
                break;
        case 5: console.log("login successful", response.data.token)
                break;
        default : console.log("undefined error")
                break;
      }
    } catch (error) {
      console.log("error :",error);
    }
  }
    return (<>
   
    <main>
    
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '25rem' }}>
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
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

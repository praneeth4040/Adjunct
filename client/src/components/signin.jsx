import React from 'react';

function Signin() {
    return ( <>
    
    <main>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '30rem' }}>
        <h1 className="text-center mb-4">Sign Up</h1>
        <form >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              
              
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              
                            required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              
              
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="repeatPassword"
              
                            required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
    </main>
    </> );
}

export default Signin;
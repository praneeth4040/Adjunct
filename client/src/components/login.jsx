import React from 'react';
import axios from 'axios';
function LoginPage() {
    
    return (<>
   

    <main>
    
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '25rem' }}>
        <h1 className="text-center mb-4">Login</h1>
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
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              
              
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>

</main>

    </>  );
}

export default LoginPage;
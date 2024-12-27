import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const user = {
    
    userName: "dhanesh", // User's name
    email: "dhanesh@gmail.com", // User's email ID
    aiEmail: "vaibhav@gmail.com" // AI-generated email ID
  };
  const handleLogout = () => {
    // Clear any authentication tokens or user data
    localStorage.removeItem("token"); // Or any other logout logic
    navigate("/login");
  };

  return (
    <main>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '25rem' }}>
          <div className="text-center mb-4">
            {/* Profile Picture with larger size */}
            <i className="bi bi-person-bounding-box fs-2"></i> {/* fs-1 increases the size */}
            
          </div>

          {/* User Information */}
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <strong>Username:</strong>
              <span><input
            type="text"
            className="form-control"
            value={user.userName}
            disabled
          /></span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Login Mail:</strong>
              <span><input
            type="email"
            className="form-control"
            value={user.email}
            disabled
          /></span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Using Mail:</strong>
              <span><input
            type="email"
            className="form-control"
            value={user.aiEmail}
            disabled
          /></span>
            </div>
          </div>

          <div className="d-grid">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;

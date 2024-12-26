import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

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
            <h3>Vaibhav</h3>
          </div>

          {/* User Information */}
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <strong>Username:</strong>
              <span>Vaibhav</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Login Mail:</strong>
              <span>dhanesh@gmail.com</span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Using Mail:</strong>
              <span>vaibhav@gmail.com</span>
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

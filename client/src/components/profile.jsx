import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from './totify';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  // To store fetched user data
  const [loading, setLoading] = useState(true);  // To handle loading state
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");  // Redirect to login if no token is present
      return;
    }

    // Fetch user data using the token
    const fetchUserData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/getData",{},{
          headers: { Authorization: `Bearer ${token}` },  // Send token in Authorization header
        });
        setUser(response.data.userRealData); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast("error", "Failed to fetch user data");  // Show error toast
      } finally {
        setLoading(false);  // Set loading to false when data is fetched
      }
    };

    fetchUserData();  // Call the function to fetch user data

  }, [token, navigate]);

  const handleLogout = () => {
    // Clear authentication token and redirect to login page
    localStorage.removeItem("authToken");
    showToast("warn", "Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;  // Display loading text while fetching user data
  }

  // If user is not found or API returned no user data, show message
  if (!user) {
    return <div>No user data found. Please log in again.</div>;
  }

  return (
    <main>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '25rem' }}>
          <div className="text-center mb-4">
            <i className="bi bi-person-bounding-box fs-2"></i>
          </div>

          {/* User Information */}
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <strong>Username:</strong>
              <span>
                <input
                  type="text"
                  className="form-control"
                  value={user.name}  // Dynamically use user data
                  disabled
                />
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Login Mail:</strong>
              <span>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}  // Dynamically use user data
                  disabled
                />
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <strong>Using Mail:</strong>
              <span>
                <input
                  type="email"
                  className="form-control"
                  value={user.aiEmail || 'N/A'}  // Dynamically use AI-generated email (if exists)
                  disabled
                />
              </span>
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

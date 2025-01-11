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
    <div className="container mt-5 d-flex justify-content-center">
    <div className="card text-center " style={{ width: "22rem", borderRadius: "20px" }}>
      <div className="card-body">
        
        <div className="mb-4">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center bg-primary text-white"
              style={{
                width: "100px",
                height: "100px",
                fontSize: "40px",
                margin: "0 auto",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        <h5 className="card-title mb-1">{user.name}</h5>
        <p className="text-muted mb-4"></p>
        <div className="mb-4">
          <h6 className="text-primary mb-1">user email</h6>
          <p className="text-muted">{user.email}</p>
        </div>
        <div>
            <button className="btn btn-info w-100" onClick={handleLogout}>Logout</button>
          </div>
      </div>
    </div>
  </div>
)
}

export default Profile;

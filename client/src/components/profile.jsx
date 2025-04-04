import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "./totify";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  // Function to generate a consistent profile image
  const getProfileImage = (email) => {
    return `https://robohash.org/${encodeURIComponent(email)}?set=set4&size=100x100`;
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data using the token
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/getData",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.userRealData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast("error", "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const handleLogout = () => {
    // Remove token from all storage locations
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    showToast("warn", "Logged out successfully");

    // Ensure cleanup before redirecting
    setTimeout(() => {
      navigate("/login");
      window.location.reload(); // Force a full refresh to clear cached state
    }, 500);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found. Please log in again.</div>;
  }

  const profileImage = getProfileImage(user.email);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card text-center" style={{ width: "22rem", borderRadius: "20px" }}>
        <div className="card-body">
          <div className="mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                margin: "0 auto",
              }}
            />
          </div>
          <h5 className="card-title mb-1">{user.name}</h5>
          <div className="mb-4">
            <h6 className="text-primary mb-1">User Email</h6>
            <p className="text-muted">{user.email}</p>
          </div>
          <div>
            <button className="btn btn-info w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

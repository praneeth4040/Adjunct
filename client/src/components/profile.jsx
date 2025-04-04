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
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No user data found. Please log in again.
      </div>
    );
  }

  const profileImage = getProfileImage(user.email);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0D1117",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          width: "24rem",
          borderRadius: "15px",
          backgroundColor: "#161B22",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          padding: "25px",
          textAlign: "center",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div className="card-body">
          <div className="mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                margin: "0 auto",
                border: "4px solid #FFA500",
              }}
            />
          </div>
          <h5
            className="card-title mb-2"
            style={{
              color: "#FFA500",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {user.name}
          </h5>
          <div className="mb-4">
            <h6
              className="text-primary mb-1"
              style={{
                color: "#FFA500",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              User Email
            </h6>
            <p
              style={{
                color: "white",
                fontSize: "0.9rem",
                margin: "0",
                wordBreak: "break-word",
              }}
            >
              {user.email}
            </p>
          </div>
          <div>
            <button
              className="btn"
              style={{
                backgroundColor: "#FFA500",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "12px",
                padding: "12px 25px",
                border: "none",
                width: "100%",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#FF8C00")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFA500")
              }
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "./totify";
import axios from "axios";
import crypto from "crypto"; // For hashing (optional)

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // To store fetched user data
  const [loading, setLoading] = useState(true); // To handle loading state
  const token = localStorage.getItem("authToken");

  // Function to generate a consistent image URL
  const getProfileImage = (email) => {
    // Option 1: Use RoboHash or similar services
    return `https://robohash.org/${encodeURIComponent(email)}?set=set4&size=100x100`; // "set4" generates animals

    // Option 2: Use PlaceKitten or similar
    // const hash = crypto.createHash('md5').update(email).digest('hex');
    // const uniqueNumber = parseInt(hash.substring(0, 8), 16) % 1000; // Generate a number from hash
    // return `https://placekitten.com/100/100?image=${uniqueNumber}`;

    // Option 3: Use a fixed placeholder
    // return `https://via.placeholder.com/100?text=Animal`;
  };

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token is present
      return;
    }

    // Fetch user data using the token
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/getData",
          {},
          {
            headers: { Authorization: `Bearer ${token}` }, // Send token in Authorization header
          }
        );
        setUser(response.data.userRealData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast("error", "Failed to fetch user data"); // Show error toast
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [token, navigate]);

  const handleLogout = () => {
    // Clear authentication token and redirect to login page
    localStorage.removeItem("authToken");
    showToast("warn", "Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading text while fetching user data
  }

  // If user is not found or API returned no user data, show message
  if (!user) {
    return <div>No user data found. Please log in again.</div>;
  }

  const profileImage = getProfileImage(user.email); // Generate consistent profile image

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

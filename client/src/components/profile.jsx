import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "./totify";
import axiosInstance from "../axiosConfig";
// ✅ Import a proper Pen Icon
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("authToken");

  const getProfileImage = (email) => {
    return `https://robohash.org/${encodeURIComponent(email)}?set=set4&size=100x100`;
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.post(
          "/getData",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(response.data.userRealData);
        setName(response.data.userRealData.name);
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
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    showToast("warn", "Logged out successfully");

    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 500);
  };

  const handleEditSubmit = async () => {
    try {
      await axiosInstance.put(
        "/getData/update",
        { name, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("success", "Profile updated!");
      setUser((prev) => ({ ...prev, name }));
      setEditing(false);
    } catch (err) {
      showToast("error", "Failed to update profile");
    }
  };

  const handleRemovePermissions = async () => {
    try {
      const res = await axiosInstance.delete(
        "/getData/removePermissions",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("info", res.data.message);
    } catch (err) {
      showToast("error", "Failed to remove permissions");
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.loadingContainer}>
        <p>No user data found. Please log in again.</p>
      </div>
    );
  }

  const profileImage = getProfileImage(user.email);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topRight}>
          {!editing && (
            <button style={styles.editButton} onClick={() => setEditing(true)}>
              <PencilSquareIcon style={styles.editIcon} />
              <span style={styles.editText}>Edit Profile</span>
            </button>
          )}
        </div>

        <div style={styles.center}>
          <img
            src={profileImage}
            alt="Profile"
            style={styles.profileImage}
          />
          <h2 style={styles.userName}>{user.name}</h2>
          <p style={styles.userEmail}>{user.email}</p>
        </div>

        {editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New Name"
              style={styles.input}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              style={styles.input}
            />
            <button style={styles.primaryButton} onClick={handleEditSubmit}>
              Save Changes
            </button>
            <button style={styles.secondaryButton} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button style={styles.primaryButton} onClick={handleRemovePermissions}>
              Remove Permissions
            </button>
            <button style={{ ...styles.primaryButton, backgroundColor: "#DC143C", color: "#fff" }} onClick={handleLogout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    position: "relative",
    backgroundColor: "#1a1a1a",
    color: "#FFA500",
    borderRadius: "12px",
    padding: "2rem",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(255, 165, 0, 0.2)",
  },
  topRight: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  editButton: {
    background: "transparent",
    border: "none",
    color: "#FFA500",
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  editIcon: {
    width: "20px",
    height: "20px",
    color: "#FFA500",
    marginRight: "6px",
  },
  editText: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "3px solid #FFA500",
    marginBottom: "10px",
  },
  userName: {
    fontSize: "1.5rem",
    marginBottom: "5px",
  },
  userEmail: {
    fontSize: "0.9rem",
    color: "#FFA500",
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #FFA500",
    backgroundColor: "#333",
    color: "#FFA500",
  },
  primaryButton: {
    width: "100%",
    padding: "0.7rem",
    marginTop: "10px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#FFA500",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  secondaryButton: {
    width: "100%",
    padding: "0.7rem",
    marginTop: "10px",
    borderRadius: "25px",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  loadingContainer: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#FFA500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};

export default Profile;
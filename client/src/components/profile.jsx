import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "./totify";
import axiosInstance from "../axiosConfig";

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
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.userRealData);
        setName(response.data.userRealData.name); // pre-fill name for editing
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
      const response = await axiosInstance.put(
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
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      showToast("info", res.data.message);
      //showToast("info", "Permissions removed.");
    } catch (err) {
      showToast("error", "Failed to remove permissions");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete("/getData/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("success", "Account deleted successfully");
      handleLogout();
    } catch (err) {
      showToast("error", "Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.loadingContainer}>
        No user data found. Please log in again.
      </div>
    );
  }

  const profileImage = getProfileImage(user.email);

  return (
    <div style={styles.page}>
      <div
        className="card"
        style={styles.card}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div className="card-body">
          <div className="mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle"
              style={styles.profileImage}
            />
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
              <button style={styles.button} onClick={handleEditSubmit}>
                Save Changes
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#555" }}
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h5 style={styles.userName}>{user.name}</h5>
              <div className="mb-4">
                <h6 style={styles.label}>User Email</h6>
                <p style={styles.text}>{user.email}</p>
              </div>

              <button style={styles.button} onClick={() => setEditing(true)}>
                Edit Profile
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#DC143C" }}
                onClick={handleRemovePermissions}
              >
                Remove Permissions
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#8B0000" }}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#FFA500" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0D1117",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "26rem",
    borderRadius: "15px",
    backgroundColor: "#161B22",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    padding: "25px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    margin: "0 auto",
    border: "4px solid #FFA500",
    borderRadius: "50%",
  },
  userName: {
    color: "#FFA500",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  label: {
    color: "#FFA500",
    fontSize: "1rem",
    fontWeight: "600",
  },
  text: {
    color: "white",
    fontSize: "0.9rem",
    wordBreak: "break-word",
  },
  button: {
    backgroundColor: "#9da5a8",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "10px",
    padding: "10px 20px",
    border: "none",
    width: "100%",
    marginTop: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  loadingContainer: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Profile;

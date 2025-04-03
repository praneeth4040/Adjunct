import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "./totify";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      const val = response.data.value;
      const userName = response.data.name;

      switch (val) {
        case 0:
          showToast("error", "Email and Password are required");
          break;
        case 1:
          showToast("error", "User not found");
          break;
        case 2:
          showToast("info", "Please verify your email first");
          navigate("/home", { state: { email } });
          break;
        case 3:
          showToast("error", "Invalid password");
          break;
        case 4:
          showToast("error", "Internal server error");
          break;
        case 5:
          showToast("success", `Welcome, ${userName}! Login successful.`);
          if (response.data.token) {
            localStorage.setItem("authToken", response.data.token);
            setTimeout(() => {
              navigate("/home", { state: { userName } });
            }, 500);
          } else {
            showToast("error", "Login failed. Token missing.");
          }
          break;
        default:
          showToast("error", "An undefined error occurred");
          break;
      }
    } catch (error) {
      showToast("error", "An error occurred during login.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Access Account</h2>
        <p style={styles.subtitle}>Log in to continue</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Input with Icon */}
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Password Input with Icon */}
          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Forgot Password */}
          <div style={styles.forgotPassword}>
            <Link to="/forgetpassword" style={styles.link}>Forget your password?</Link>
          </div>

          {/* Login Button */}
          <button type="submit" style={styles.button}>Log In</button>
        </form>

        {/* Sign Up */}
        <p style={styles.signupText}>
          Need to create an account? <Link to="/signin" style={styles.link}>Sign Up</Link>
        </p>

        {/* OR Divider */}
        <div style={styles.orContainer}>
          <hr style={styles.hr} />
          <span style={styles.orText}>Or</span>
          <hr style={styles.hr} />
        </div>

        {/* Social Login Buttons */}
        <div style={styles.socialContainer}>
          <button style={{ ...styles.socialButton, backgroundColor: "#db4437" }}>G</button>
          <button style={{ ...styles.socialButton, backgroundColor: "#3b5998" }}>F</button>
          <button style={{ ...styles.socialButton, backgroundColor: "#000" }}></button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    color: "white",
  },
  card: {
    width: "350px",
    padding: "20px",
    backgroundColor: "#2b2b2b",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#bbb",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #444",
  },
  icon: {
    color: "#bbb",
    fontSize: "16px",
    marginRight: "10px",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "14px",
    outline: "none",
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: "15px",
  },
  link: {
    color: "#ff9900",
    textDecoration: "none",
    fontSize: "13px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff9900",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "15px",
    transition: "0.3s",
  },
  signupText: {
    fontSize: "13px",
  },
  orContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 0",
  },
  hr: {
    flexGrow: 1,
    border: "none",
    height: "1px",
    backgroundColor: "white",
  },
  orText: {
    margin: "0 10px",
    fontSize: "13px",
    color: "#bbb",
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  socialButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default LoginPage;

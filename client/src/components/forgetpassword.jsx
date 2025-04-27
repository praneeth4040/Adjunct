import React, { useState } from "react";
import axiosInstance from "../axiosConfig";
import { showToast } from "./totify";
import { useNavigate } from "react-router-dom";
import "./forgotpassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const response = await axiosInstance.post("/login/forgot-password", { email });
      const val = response.data.value;
      if (val === 2) {
        showToast("success", "OTP Sent to your email");
      } else {
        showToast("error", response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to send OTP");
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axiosInstance.post("/login/fp-otp-verification", { email, otp });
      const val = response.data.val;
      if (val === 2) {
        showToast("success", "OTP Verified");
        setOtpVerified(true);
      } else {
        showToast("error", response.data.message || "OTP invalid");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "OTP verification failed");
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      return showToast("error", "Passwords do not match");
    }

    try {
      const response = await axiosInstance.post("/login/resetpassword", { email, newPassword });
      const val = response.data.val;
      if (val === 1) {
        showToast("success", "Password reset successfully");
        navigate("/login");
      } else {
        showToast("error", response.data.message || "Password reset failed");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Password reset error");
    }
  };

  return (
    <div className="forgot-password-container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-light">Forgot Password</h2>

        {/* Email and Send OTP */}
        <div className="d-flex mb-3">
          <input
            type="email"
            className="form-control me-2"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary w-50" onClick={handleEmailSubmit}>
          Send OTP
          </button>
        </div>

        {/* OTP and Verify */}
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleOtpVerification}>
            Verify
          </button>
        </div>

        {/* Password Reset (only after OTP verified) */}
        {otpVerified && (
          <>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn btn-success w-100" onClick={handlePasswordReset}>
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

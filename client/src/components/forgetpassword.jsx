import React, { useState } from "react";
import axiosInstance from "../axiosConfig"; // Import the Axios instance
import "./forgotpassword.css"; // Add your custom CSS for additional styles
import { showToast } from "./totify";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    if (email) {
      try {
        const response = await axiosInstance.post("/login/forgot-password", { email });
        const val = response.data.value;
        switch (val) {
          case 0:
            console.log(response.data.message);
            break;
          case 1:
            console.log(response.data.message);
            break;
          case 2:
            console.log(response.data.message);
            setStep("otp");
            break;
          case 3:
            console.log(response.data.message);
            break;
          default:
            console.log("internal error");
            break;
        }
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axiosInstance.post("/login/fp-otp-verification", { email, otp });
      const val = response.data.val;
      switch (val) {
        case 0:
          console.log(response.data.message);
          showToast("error", "Email or OTP not received");
          break;
        case 1:
          console.log(response.data.message);
          showToast("error", "Email not existed");
          useNavigate("/signin");
          setStep("email");
          break;
        case 2:
          console.log(response.data.message);
          showToast("success", "Verified successfully");
          useNavigate("/login");
          setStep("reset");
          na
          break;
        case 3:
          console.log(response.data.message);
          showToast("error", "OTP invalid");
          break;
        default:
          console.log("internal error");
          showToast("error", "Internal error");
          break;
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await axiosInstance.post("/login/resetpassword", { email, newPassword });
        const val = response.data.val;
        switch (val) {
          case 0:
            console.log(response.data.message);
            showToast("error", "Email not existed");
            break;
          case 1:
            console.log(response.data.message);
            showToast("success", "Password reset successfully");
            navigate("/login");
            break;
          case 2:
            console.log(response.data.message);
            showToast("error", "Internal error From server side");
            break;
          default:
            console.log("internal error");
            break;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      showToast("error", "Passwords do not match");
    }
  };

  return (
    <div className="forgot-password-container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Forgot Password</h2>
        {step === "email" ? (
          <div>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleEmailSubmit}>
              Send OTP
            </button>
          </div>
        ) : step === "otp" ? (
          <div>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleOtpVerification}>
              Verify OTP
            </button>
          </div>
        ) : (
          <div>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Set New Password"
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
            <button className="btn btn-primary w-100" onClick={handlePasswordReset}>
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

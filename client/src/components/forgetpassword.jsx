import React, { useState } from "react";
import axios from "axios";
const ForgotPassword = () => {
  // State to track the current step
  const [step, setStep] = useState("email"); // Possible values: 'email', 'otp', 'reset'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Handlers
  const handleEmailSubmit = async() => {
    if (email) {
      // Simulate email verification
      try{
        const response=await axios.post("http://localhost:3000/login/forgot-password",{email})
        const val=response.data.value
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
                console.log("internal error")
                break;
        }
      }catch(err){
        console.log("error",err)
      }

      }
  };

  const handleOtpVerification = () => {
    
    if (otp === "1234") { // Mock OTP verification
      console.log("OTP verified");
      setStep("reset"); // Proceed to reset password step
    } else {
      alert("Invalid OTP");
    }
  };

  const handlePasswordReset = () => {
    if (newPassword === confirmPassword && newPassword) {
      console.log("Password successfully reset");
      alert("Password reset successful! You can now log in with your new password.");
      // Redirect to login page or handle post-reset logic
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Forgot Password</h2>

      {/* Render based on the current step */}
      {step === "email" ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={handleEmailSubmit} style={{ width: "100%" }}>
            Send OTP
          </button>
        </div>
      ) : step === "otp" ? (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={handleOtpVerification} style={{ width: "100%" }}>
            Verify OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="password"
            placeholder="Set New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={handlePasswordReset} style={{ width: "100%" }}>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;

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

  const handleOtpVerification = async() => {
    try{
      console.log(otp)
      console.log(email)
      const response=await axios.post("http://localhost:3000/login/fp-otp-verification",{email,otp})
      const val=response.data.val
      switch (val) {
        case 0:
          console.log(response.data.message);
          
          break;
        case 1:
          console.log(response.data.message);
          
          break;
        case 2:
          console.log(response.data.message);
          setStep("reset");
          break;
        case 3:
          console.log(response.data.message);
          break;
       default:
        console.log("internal error")
        break;
}

      
    }
    catch(err){
      console.log("error:",err)
    }
  };

  const handlePasswordReset = async() => {
    if (newPassword === confirmPassword ) {
      try{
        const response=await axios.post("http://localhost:3000/login/resetpassword",{email,newPassword})
        const val=response.data.val 
        switch (val) {
          case 0:
            console.log(response.data.message);
            
            break;
          case 1:
            console.log(response.data.message);
            
            
            break;
          case 2:
            console.log(response.data.message);
            
            break;
          
         default:
          console.log("internals error")
          break;
      }

    } 
    catch(err){
      console.log(err)
    }}
    else {
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

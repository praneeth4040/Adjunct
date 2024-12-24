import React, { useState } from "react";


const OTPVerificationPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  // Simulate sending OTP
  const handleSendOtp = () => {
    if (!email) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setOtpSent(true);
    setNotification("OTP Sent to your email!");
    window.alert(`OTP sent to: ${email}`);
    console.log(`OTP sent to: ${email}`);
    // Here you would make an API call to send OTP
  };

  // Simulate OTP verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === "") {
      setError("Please enter the OTP");
      return;
    }

    setError("");
    console.log("OTP verified:", otp);
    // Here you would make an API call to verify OTP
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "24rem" }}>
        <h2 className="text-center mb-4">OTP Verification</h2>

        {/* Email input and Send OTP button */}
        {!otpSent ? (
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Error or Notification */}
            {error && <div className="alert alert-danger">{error}</div>}
            {notification && <div className="alert alert-success">{notification}</div>}

            {/* Send OTP Button */}
            <div className="d-grid mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          // OTP input and Verify OTP button after sending OTP
          <form onSubmit={handleVerifyOtp}>
            {/* OTP Input */}
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                OTP
              </label>
              <input
                type="text"
                className="form-control"
                id="otp"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            {/* Error or Notification */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Verify OTP Button */}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Verify OTP
              </button>
            </div>

            {/* Resend OTP Button */}
            <div className="text-center">
              <button
                type="button"
                className="btn btn-link"
                onClick={handleSendOtp}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OTPVerificationPage;

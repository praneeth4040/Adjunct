import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OTPVerification = ({ email }) => {
    const [message, setMessage] = useState(`OTP is sent to ${email}`);
    const [otp, setOtp] = useState('');

    const handleResend = () => {
        // Logic to resend OTP
        setMessage(`A new OTP has been sent to ${email}`);
        setOtp(''); // Clear the input value
    };

    const handleVerify = () => {
        // Logic to verify OTP
        alert(`Verifying OTP: ${otp}`);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '350px' }}>
                <h1 className="text-center mb-3">OTP Verification</h1>
                <p className="text-center text-muted">{message}</p>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={handleVerify}
                >
                    Verify OTP
                </button>
                <button
                    className="btn btn-link text-decoration-none"
                    onClick={handleResend}
                >
                    Resend OTP
                </button>
            </div>
        </div>
    );
};

export default OTPVerification;

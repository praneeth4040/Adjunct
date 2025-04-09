import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [message, setMessage] = useState(`OTP is sent to ${email}`);
    const [otp, setOtp] = useState('');

    const handleResend = async () => {
        setOtp(''); // Clear the input value
        const resendResponse = await axios.post("http://localhost:3000/signup/resend-otp", { email });
        const val = resendResponse.data.value;
        if (val === 4) {
            setMessage(`A new OTP has been sent to ${email}`);
        }
        switch (val) {
            case 1:
                console.log("Email is required");
                break;
            case 2:
                console.log("user not found");
                break;
            case 3:
                console.log("User is already verified");
                break;
            case 4:
                console.log("New OTP sent to your email");
                break;
            case 5:
                console.log("internal server error");
                break;
            default:
                console.log("unknown error");
                break;
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/signup/verify-otp", { email, otp });
            const val = response.data.value;
            const userName = response.data.name;
            switch (val) {
                case 1:
                    console.log("otp is required");
                    break;
                case 2:
                    console.log("user not found");
                    break;
                case 3:
                    console.log("invalid or expired otp");
                    break;
                case 4:
                    console.log("account verified successfully", response.data.token, userName);
                    localStorage.setItem('authToken', response.data.token);
                    navigate("/home", { state: { userName } });
                    break;
                case 5:
                    console.log("internal server error");
                    break;
                default:
                    console.log("unknown error");
                    break;
            }
        } catch (err) {
            console.log('error :', err);
        }
    };

    return (
        <main style={{ backgroundColor: 'black', height: '100vh' }}>
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div
                    className="card p-4 shadow"
                    style={{
                        width: '25rem',
                        backgroundColor: '#1c1c1c',
                        color: 'white',
                        borderRadius: '10px',
                    }}
                >
                    <h1 className="text-center mb-3" style={{ color: '#21618c' }}>
                        OTP Verification
                    </h1>
                    <p className="text-center mb-3" style={{ color: '#b3b3b3' }}>
                        OTP sent to <strong>{email}</strong>
                    </p>
                    <p className="text-center mb-3" style={{ color: '#b3b3b3' }}>
                        (Check your inbox and spam folder)
                    </p>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{
                            backgroundColor: '#2c2c2c',
                            color: 'white',
                            border: '1px solid #444',
                            borderRadius: '8px',
                            outline: 'none',
                            fontSize: '14px',
                            height: '40px',
                            padding: '5px 10px',
                        }}
                    />
                    <button
                        className="btn w-100 mb-3"
                        onClick={handleVerify}
                        style={{
                            backgroundColor: '#ff9900',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        Verify OTP
                    </button>
                    <button
                        className="btn btn-link text-decoration-none w-100"
                        onClick={handleResend}
                        style={{
                            color: '#21618c',
                            textAlign: 'center',
                        }}
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </main>
    );
};

export default OTPVerification;

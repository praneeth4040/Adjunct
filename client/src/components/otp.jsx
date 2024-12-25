import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email
    const [message, setMessage] = useState(`OTP is sent to ${email}`);
    const [otp, setOtp] = useState('');

    const handleResend = async() => {
        // Logic to resend OTP
        setOtp(''); // Clear the input value
        const resendResponse = await axios.post("http://localhost:3000/signup/resend-otp",{email});
        const val = resendResponse.data.value;
        if(val){
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
                console.log("internal server error")
                break;
            default:
                console.log("unknown error");
                break;
        }

    };

    const handleVerify = async(e) => {
        e.preventDefault();
     try {
      const response=await axios.post("http://localhost:3000/signup/verify-otp",{email,otp});
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
            console.log("account verified succesfully", response.data.token,userName);
            navigate("/",{state:{userName}})
            break;
        case 5:
            console.log("internal server error")
            break;
        default:
            console.log("unknown error");
            break;
      }

    }catch(err){
        console.log('error :',err);
    }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '350px' }}>
                <h1 className="text-center mb-3">OTP Verification</h1>
                <p className="text-center text-muted">OTP sent to <strong>{email}</strong></p>
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

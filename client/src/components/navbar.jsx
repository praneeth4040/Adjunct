import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    // State to track user login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Simulate checking user authentication status (replace with real logic)
    useEffect(() => {
        const token = localStorage.getItem('token'); // Example: Check token in localStorage
        setIsLoggedIn(!!token); // Set true if token exists
    }, []);

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">myAi</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                                </li>
                                {!isLoggedIn ? (
                                    <>
                                        <li className="nav-item" style={{ marginLeft: '20px' }}>
                                            <button style={{ borderRadius: '10px' }}>
                                                <Link className="nav-link active" to="/login">Login</Link>
                                            </button>
                                        </li>
                                        <li className="nav-item" style={{ marginLeft: '20px' }}>
                                            <button style={{ borderRadius: '10px' }}>
                                                <Link className="nav-link active" to="/signin">Sign In</Link>
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item" style={{ marginLeft: '20px' }}>
                                        <Link className="nav-link active" to="/profile">Profile</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;

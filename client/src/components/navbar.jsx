import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeLink, setActiveLink] = useState(''); // Track the active link
    const location = useLocation(); // Get the current route

    // Simulate checking user authentication status (replace with real logic)
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Example: Check token in localStorage
        setIsLoggedIn(!!token); // Set true if token exists
        setActiveLink(location.pathname); // Set active link based on current route
    }, [location]);

    const linkStyle = (path) => ({
        color: activeLink === path ? '#fff' : '#ccc',
        
        padding: '2px 10px',
        borderRadius: '5px',
        fontWeight: activeLink === path ? 'bold' : 'normal',
        transition: '0.3s ease',
    });

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#012730" }}>
                <div className="container">
                    <a className="navbar-brand" href="#">myAi</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {!isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/"
                                            className="nav-link"
                                            style={linkStyle('/')}
                                            onClick={() => setActiveLink('/')}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/login"
                                            className="nav-link"
                                            style={linkStyle('/login')}
                                            onClick={() => setActiveLink('/login')}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/signin"
                                            className="nav-link"
                                            style={linkStyle('/signin')}
                                            onClick={() => setActiveLink('/signin')}
                                        >
                                            Sign In
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/profile"
                                            className="nav-link"
                                            style={linkStyle('/profile')}
                                            onClick={() => setActiveLink('/profile')}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/home"
                                            className="nav-link"
                                            style={linkStyle('/home')}
                                            onClick={() => setActiveLink('/home')}
                                        >
                                            home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/setup"
                                            className="nav-link"
                                            style={linkStyle('/setup')}
                                            onClick={() => setActiveLink('/setup')}
                                        >
                                            Setup
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

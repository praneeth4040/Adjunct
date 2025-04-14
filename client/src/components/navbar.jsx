import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import Logo from '../assets/logo.webp';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = isLoggedIn
    ? [
        { path: "/profile", label: "Profile" },
        { path: "/home", label: "Home" },

        { path: "/blogs", label: "Permissions" }

      ]
    : [
        { path: "/login", label: "Login" },
        { path: "/signin", label: "Signin" },
      ];

  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload.exp && payload.exp < currentTime) {
          // Token is expired
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthToken();

    const currentPath = location.pathname;
    const index = navItems.findIndex((item) => currentPath.includes(item.path));
    setActiveIndex(index >= 0 ? index : null);
  }, [location]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className="navbar" style={{ backgroundColor: '#171A1F', padding: '1rem 2rem' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <img src={Logo} alt="Adjunct Logo" style={{ height: '60px', width: 'auto' }} />
          <span className="text-white fw-bold fs-3"></span>
        </div>
        <ul className="navbar-nav d-flex gap-4 align-items-center" style={{ listStyle: 'none', display: 'flex', flexDirection: 'row' }}>
          {navItems.map((item, index) => (
            <li key={item.path} className="nav-item">
              <Link
                className={`nav-link ${activeIndex === index ? 'text-warning' : 'text-light'} fw-semibold`}
                to={item.path}
                onClick={() => handleClick(index)}
              >
                {item.label}
              </Link>
              {activeIndex === index && (
                <div className="mt-1" style={{ height: '3px', backgroundColor: '#F39C12', width: '100%' }}></div>
              )}
            </li>
          ))}
        </ul>
        {!isLoggedIn && (
          <button
            className="btn btn-warning fw-bold d-flex align-items-center gap-2"
            onClick={() => navigate('/signin')}
          >
            <ArrowRight size={16} /> Get Started
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css"; // Ensure this CSS file contains the necessary styles

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // Track the index of the active link
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check auth status
    setIsLoggedIn(!!token); // Set true if token exists

    // Automatically set the active link based on the route
    const currentPath = location.pathname;
    const index = navItems.findIndex((item) => item.path === currentPath);
    setActiveIndex(index >= 0 ? index : null);
  }, [location]);

  // Define navigation items based on logged-in status
  const navItems = isLoggedIn
    ? [
        { path: "/profile", label: "Profile", icon: "👤" },
        { path: "/home", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/blogs", label: "permissions" },
      ]
    : [
        { path: "/about", label: "About us" },
        { path: "/login", label: "Login" },
        { path: "/signin", label: "Sign In" },
     
      ];

  const handleClick = (index) => {
    setActiveIndex(index); // Set the clicked index as active
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#171A1F" }}>
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
              {navItems.map((item, index) => (
                <li className="nav-item" key={item.path}>
                  <Link
                    className={`nav-link ${activeIndex === index ? "active" : ""}`}
                    to={item.path}
                    onClick={() => handleClick(index)}
                  >
                    {item.icon && <span>{item.icon}</span>} {/* Display icon if exists */}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

 

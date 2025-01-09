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
      { path: "/home", label: "Home", icon: "🏠" },
      { path: "/setup", label: "Setup", icon: "⚙️" },
      { path: "/about", label: "About us", icon: "ℹ️" }, // Information icon for About Us
      { path: "/blogs", label: "Blogs", icon: "📰" },    // Newspaper icon for Blogs
    ]
  : [
      { path: "/about", label: "About us", icon: "ℹ️" }, // Information icon for About Us
      { path: "/login", label: "Login", icon: "🔑" },
      { path: "/signin", label: "Sign In", icon: "✍️" }, // Writing hand icon for Sign In
      { path: "/blogs", label: "Blogs", icon: "📰" },    // Newspaper icon for Blogs
    
      ];

  const handleClick = (index) => {
    setActiveIndex(index); // Set the clicked index as active
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-header">myAi</div>
      <div className="navbar-grid">
        {navItems.map((item, index) => {
          // Calculate shrink classes based on distance from the active icon
          let shrinkClass = "";
          if (activeIndex !== null) {
            const distance = Math.abs(activeIndex - index);
            if (distance === 1) shrinkClass = "shrink-1";
            else if (distance === 2) shrinkClass = "shrink-2";
            else if (distance === 3) shrinkClass = "shrink-3";
            else if (distance > 3) shrinkClass = "shrink-4";
          }

          return (
            <Link
              to={item.path}
              key={item.path}
              className={`navbar-item ${
                activeIndex === index ? "active" : shrinkClass
              }`}
              onClick={() => handleClick(index)}
            >
              <div className="navbar-icon">{item.icon}</div>
              <div className="navbar-label">{item.label}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import Logo from '../assets/logo.webp';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#171A1F',
      color: '#B0B0B0', // Set consistent grey color
      padding: '60px 0', // Vertical padding only
      marginTop: '100px',
      textAlign: 'center',
      width: '100%' // Ensure the footer spans the full width
    }}>
      <img src={Logo} alt="Adjunct Logo" style={{ height: '100px', width: 'auto' }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '30px' }}>
        <div>
          <h4 style={{ color: '#B0B0B0' }}>Product</h4>
          <p>Features</p>
          <p>Pricing</p>
        </div>
        <div>
          <h4 style={{ color: '#B0B0B0' }}>Resources</h4>
          <p>Blog</p>
          <p>User guides</p>
          <p>Webinars</p>
        </div>
        <div>
          <h4 style={{ color: '#B0B0B0' }}>Company</h4>
          <p>About us</p>
          <p>Contact us</p>
        </div>
        <div>
          <h4 style={{ color: '#B0B0B0' }}>Plans & Pricing</h4>
          <p>Personal</p>
          <p>Start up</p>
          <p>Organization</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <i className="bi bi-twitter" style={{ fontSize: '1.5rem', color: '#B0B0B0' }}></i>
        <i className="bi bi-facebook" style={{ fontSize: '1.5rem', color: '#B0B0B0' }}></i>
        <i className="bi bi-linkedin" style={{ fontSize: '1.5rem', color: '#B0B0B0' }}></i>
        <i className="bi bi-youtube" style={{ fontSize: '1.5rem', color: '#B0B0B0' }}></i>
      </div>
    </footer>
  );
}

export default Footer;
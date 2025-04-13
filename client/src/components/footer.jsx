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
          <h4 style={{ color: '#B0B0B0' }}>
            <a href="/terms-and-conditions" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
              Terms and Conditions
            </a>
          </h4>
          <p>
            <a href="/blog" style={{ color: '#B0B0B0', textDecoration: 'none' }}>privacy policy</a>
          </p>
          <p>
            <a href="/blog" style={{ color: '#B0B0B0', textDecoration: 'none' }}>user conditions</a>
          </p>
        </div>
        <div>
          <h4 style={{ color: '#B0B0B0' }}>
            <a href="/blog" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
              Resources
            </a>
          </h4>
          <p>
            <a href="/blog" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Blog</a>
          </p>
          <p>
            <a href="/user-guides" style={{ color: '#B0B0B0', textDecoration: 'none' }}>User guides</a>
          </p>
          <p>
            <a href="/webinars" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Webinars</a>
          </p>
        </div>
        <div>
          <h4 style={{ color: '#B0B0B0' }}>
            <a href="/about-us" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
              Company
            </a>
          </h4>
          <p>
            <a href="/about-us" style={{ color: '#B0B0B0', textDecoration: 'none' }}>About us</a>
          </p>
          <p>
            <a href="/contact-us" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Contact us</a>
          </p>
        </div>
        <div>
          <h4 style={{ color: '#B0B0B0' }}>
            <a href="/pricing" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
              Plans & Pricing
            </a>
          </h4>
          <p>
            <a href="/pricing/personal" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Personal</a>
          </p>
          <p>
            <a href="/pricing/startup" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Start up</a>
          </p>
          <p>
            <a href="/pricing/organization" style={{ color: '#B0B0B0', textDecoration: 'none' }}>Organization</a>
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <a href="https://twitter.com" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
          <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
        </a>
        <a href="https://facebook.com" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
          <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
        </a>
        <a href="https://linkedin.com" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
          <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
        </a>
        <a href="https://youtube.com" style={{ color: '#B0B0B0', textDecoration: 'none' }}>
          <i className="bi bi-youtube" style={{ fontSize: '1.5rem' }}></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;

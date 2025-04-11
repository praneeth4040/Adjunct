import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../assets/logo.webp';
import './openingpage.css';
import Footer from './footer';

function OpenPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTryForFree = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home'); // Navigate to /home
    } else {
      navigate('/signin'); // Navigate to /signin
    }
  };

  return (
    <div className="text-center text-white" style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 20px'
    }}>
      <div className="container" style={{ marginBottom: '80px', marginTop: '150px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.6rem' }}>
          Personalized AI for Your <span className="color-changing">Needs</span>
        </h1>
        <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
          Discover the perfect AI companion tailored to your requirements, whether for work or daily activities.
        </p>
        <button style={{
          backgroundColor: '#FFA500',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: '1rem',
          borderRadius: '10px',
          padding: '12px 40px',
          border: 'none'
        }} onClick={handleTryForFree}>
          Try for Free
        </button>
      </div>

      <div className="container mt-5" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '140px',
        flexWrap: 'wrap',
        marginTop: '160px'
      }}>
        <div className="text-center" style={{ maxWidth: '300px' }}>
          <i className="bi bi-gear" style={{ fontSize: '2rem', color: 'white' }}></i>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>Customizable Solutions</p>
          <p style={{ fontSize: '1rem' }}>Tailor the AI's capabilities to fit your individual needs and preferences.</p>
        </div>
        <div className="text-center" style={{ maxWidth: '300px' }}>
          <i className="bi bi-laptop" style={{ fontSize: '2rem', color: 'white' }}></i>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>Work & Personal Use</p>
          <p style={{ fontSize: '1rem' }}>Utilize the AI for professional tasks as well as for managing your day-to-day activities.</p>
        </div>
        <div className="text-center" style={{ maxWidth: '300px' }}>
          <i className="bi bi-shield-lock" style={{ fontSize: '2rem', color: 'white' }}></i>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>Secure Data Handling</p>
          <p style={{ fontSize: '1rem' }}>Rest assured knowing that your information is kept private and secure at all times.</p>
        </div>
      </div>
      {/* 
      <footer style={{
        backgroundColor: '#171A1F',
        color: 'white',
        padding: '60px 360px',
        marginTop: '100px',
        textAlign: 'center'
      }}>
        <img src={Logo} alt="Adjunct Logo" style={{ height: '100px', width: 'auto' }} />
        <p>Subscribe to our newsletter</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <input type="email" placeholder="Input your email" style={{ padding: '10px', borderRadius: '5px', border: 'none', width: '250px' }} />
          <button style={{ backgroundColor: '#F39C12', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Subscribe</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '30px' }}>
          <div>
            <h4>Product</h4>
            <p>Features</p>
            <p>Pricing</p>
          </div>
          <div>
            <h4>Resources</h4>
            <p>Blog</p>
            <p>User guides</p>
            <p>Webinars</p>
          </div>
          <div>
            <h4>Company</h4>
            <p>About us</p>
            <p>Contact us</p>
          </div>
          <div>
            <h4>Plans & Pricing</h4>
            <p>Personal</p>
            <p>Start up</p>
            <p>Organization</p>
          </div>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.8rem' }}>© 2024 Brand, Inc. · Privacy · Terms · Sitemap</p>
        <div style={{ display: 'flex', justifyContent: 'right', gap: '15px', marginTop: '20px' }}>
          <i className="bi bi-twitter" style={{ fontSize: '1.5rem', color: '#FFA500' }}></i>
          <i className="bi bi-facebook" style={{ fontSize: '1.5rem', color: '#FFA500' }}></i>
          <i className="bi bi-linkedin" style={{ fontSize: '1.5rem', color: '#FFA500' }}></i>
          <i className="bi bi-youtube" style={{ fontSize: '1.5rem', color: '#FFA500' }}></i>
        </div>
      </footer>
      */}
      <Footer />
    </div>
  );
}

export default OpenPage;

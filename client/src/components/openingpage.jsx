import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.webp';
import './openingpage.css';
import Footer from './footer';
import { BotMessageSquare , Mail, ShieldCheck} from 'lucide-react';

function OpenPage() {
  const navigate = useNavigate();

  const handleTryForFree = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home');
    } else {
      navigate('/signin');
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
        Let our AI compose and send emails on your behalf. Save time and ensure professional communication, every time.
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
        <div className="d-flex justify-content-center align-items-center gap-4 mt-4 text-light">
  <div className="d-flex align-items-center gap-2">
    <i className="bi bi-envelope-fill text-warning fs-5"></i>
    <span>Secure Email Integration</span>
  </div>
  <div className="d-flex align-items-center gap-2">
    <i className="bi bi-shield-lock-fill text-warning fs-5"></i>
    <Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link>
  </div>
</div>

      </div>

      <div className="container mt-5" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '140px',
        flexWrap: 'wrap',
        marginTop: '160px'
      }}>
        <div className="text-center" style={{ maxWidth: '300px' }}>
        <BotMessageSquare size={36} color="#ffffff" />
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>AI-Powered Communication</p>
          <p style={{ fontSize: '1rem' }}>Our advanced AI understands context and composes professional emails tailored to your needs. More AI features coming soon!</p>
        </div>
        <div className="text-center" style={{ maxWidth: '300px' }}>
        <Mail size={36} />
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>Email Integration - Available Now</p>
          <p style={{ fontSize: '1rem' }}>Currently, you can send emails from your own email address with proper authorization. Stay tuned for more communication features!</p>
        </div>
        <div className="text-center" style={{ maxWidth: '300px' }}>
        <ShieldCheck size={36} />
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>Secure Data Handling</p>
          <p style={{ fontSize: '1rem' }}>Your privacy is our priority.
          All your information is handled with the utmost care, ensuring it's always protected and confidential.</p>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="how-it-works container" style={{
        marginTop: '160px',
        padding: '60px 20px',
        borderTop: '1px solid #333',
        width: '100%'
      }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '50px', color: 'white' }}>How It Works</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '60px'
        }}>
          <div className="step" style={{ maxWidth: '200px' }}>
            <i className="bi bi-box-arrow-in-right" style={{ fontSize: '2.5rem', color: '#FFA500' }}></i>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Login</p>
            <p style={{ fontSize: '0.9rem', color: '#cccccc' }}>Sign in to your account to get started</p>
          </div>
          <div className="step" style={{ maxWidth: '200px' }}>
            <i className="bi bi-file-earmark-lock" style={{ fontSize: '2.5rem', color: '#FFA500' }}></i>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Permission</p>
            <p style={{ fontSize: '0.9rem', color: '#cccccc' }}>Review and grant email sending permissions</p>
          </div>
          <div className="step" style={{ maxWidth: '200px' }}>
            <i className="bi bi-envelope-check" style={{ fontSize: '2.5rem', color: '#FFA500' }}></i>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Google Authorization</p>
            <p style={{ fontSize: '0.9rem', color: '#cccccc' }}>Securely connect your Google account for email access</p>
          </div>
          <div className="step" style={{ maxWidth: '200px' }}>
            <i className="bi bi-chat-dots" style={{ fontSize: '2.5rem', color: '#FFA500' }}></i>
            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Chat Interface</p>
            <p style={{ fontSize: '0.9rem', color: '#cccccc' }}>Start chatting with our AI to compose and send emails</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OpenPage;

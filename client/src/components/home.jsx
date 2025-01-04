import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const [name, setName] = useState(localStorage.getItem('userName') || 'Guest'); // Initialize with localStorage

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if JWT token is present in localStorage
    const token = localStorage.getItem('authToken');
    const userNameFromLocation = location.state?.userName;

    if (token && userNameFromLocation) {
      // Update the name and store it in localStorage
      setName(userNameFromLocation);
      localStorage.setItem('userName', userNameFromLocation);
    }

    // Disable scrolling when the component is mounted
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component is unmounted (cleanup)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.state?.userName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);

    // Clear the fields after submit
    setEmail('');
    setMessage('');
  };

  return (
    <>
    
      <div className="d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
        {/* Main content */}
        <div
          className="container d-flex justify-content-center align-items-center flex-grow-1 text-center"
          style={{
            position: 'absolute',
            top: '30%',
            right: '100px',
          }}
        >
          <div>
            <h1>
              Welcome, <strong>{name}</strong>!
            </h1>
            <p className="lead mt-4">
              This is your personal homepage where you can interact with our bot.
              Get started by typing below and feel free to ask anything!
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="bg-light py-3 text-center"
          style={{
            position: 'relative',
            top: '55%',
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3 row">
              <label htmlFor="emailInput" className="col-sm-2 col-form-label">
                Email address
              </label>
              <div className="input-group rounded border p-2" style={{ maxWidth: "900px", backgroundColor: "#f8f9fa" }} >
                <input
                  type="email"
                  className="form-control border-0"
                  id="emailInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="mb-3 row ">
  <label htmlFor="messageTextarea" className="col-sm-2 col-form-label">
    Your Message
  </label>
  
  <div className="input-group rounded border p-2" style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}>
      <input
        id="searchInput"
        type="message"
        className="form-control border-0"
        placeholder="give your msg"
        aria-label="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      />
      <button
        className="btn btn-outline-secondary border-0"
        type="button"
      
        aria-label="Voice search"
      >
        <i className="bi bi-mic" style={{ fontSize: "1.2rem" }}></i>
      </button>
    </div>
  </div>

  
  <div className="col-sm-2">
    <button
      className="btn btn-success w-100"
      id="sendButton"
      type="submit"
      style={{
        borderRadius: '5px',
      }}
    >
      <i className="bi bi-send" style={{ color: 'white' }}> generate</i>
    </button>
  </div>
          </form>
        </footer>
      </div>
    </>
  );
}

export default Home;

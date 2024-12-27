import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const name = location.state?.userName || 'Guest';

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);

    // Clear the fields after submit
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component is unmounted (cleanup)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
        {/* Main content */}
        <div
          className="container d-flex justify-content-center align-items-center flex-grow-1 text-center"
          style={{
            position: 'absolute',
            top: '30%', // Position input
            right: '100px',
          }}
        >
          <div>
            <h1>Welcome, <strong>{name}</strong>!</h1>
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
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Message Input */}
        <div className="mb-3 row align-items-center">
          <label htmlFor="messageTextarea" className="col-sm-2 col-form-label">
            Your Message
          </label>
          <div className="col-sm-8">
            <textarea
              className="form-control"
              id="messageTextarea"
              placeholder="give your msg"
              rows={0}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
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
        </div>
      </form>
        </footer>
      </div>
    </>
  );
}

export default Home;

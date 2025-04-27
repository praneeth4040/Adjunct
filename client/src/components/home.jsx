import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Slab } from 'react-loading-indicators';

function Home() {
  const location = useLocation();

  // States
  const [name, setName] = useState(localStorage.getItem('userName') || 'Guest');
  const [userPrompt, setUserPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);
  const [hasInteracted, setHasInteracted] = useState(chatMessages.length > 0);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Save chat messages to localStorage whenever chatMessages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Handle userName setting when user arrives via login or route navigation
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userNameFromLocation = location.state?.userName;

    if (token && userNameFromLocation) {
      setName(userNameFromLocation);
      localStorage.setItem('userName', userNameFromLocation);
    }

    // Reset scroll behavior
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.state?.userName]);

  // Scroll to bottom when new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // If user loses token (logged out), clear chat messages automatically
  useEffect(() => {
    const handleAuthTokenChange = () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        localStorage.removeItem('chatMessages');
        setChatMessages([]);
        setHasInteracted(false);
      }
    };

    // Check on window focus and every 5 seconds
    window.addEventListener('focus', handleAuthTokenChange);
    const interval = setInterval(handleAuthTokenChange, 5000);

    return () => {
      window.removeEventListener('focus', handleAuthTokenChange);
      clearInterval(interval);
    };
  }, []);

  // Handle user submitting a prompt
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setHasInteracted(true);
    const promptText = userPrompt;
    setUserPrompt('');
    setLoading(true);

    // Add user prompt to chat history
    const newChatMessages = [
      ...chatMessages,
      { id: Date.now(), type: 'user', content: promptText, isEditable: false },
    ];
    setChatMessages(newChatMessages);

    try {
      const token = localStorage.getItem('authToken');

      // Send user prompt + chat history to backend
      const response = await axiosInstance.post(
        '/askAi',
        {
          userPrompt: promptText,
          history: newChatMessages,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      console.log('Response from server:', response.data);

      // Add normal AI response
      setChatMessages([
        ...newChatMessages,
        {
          id: Date.now(),
          type: 'ai',
          content: response.data.message,
          isEditable: false,
        },
      ]);
    } catch (error) {
      console.error('Error generating message:', error);
      setChatMessages([
        ...newChatMessages,
        {
          id: Date.now(),
          type: 'ai',
          content: 'An error occurred. Please try again.',
          isEditable: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Custom styling for input placeholders */}
      <style>
        {`
          input::placeholder {
            color: #ffffff !important;
            opacity: 0.7;
          }
        `}
      </style>

      {/* Main container */}
      <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>

        {/* If user hasn't interacted yet (first screen) */}
        {!hasInteracted ? (
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ flex: 1, padding: '20px' }}>
            <h1 style={{ color: '#ff9900' }}>Welcome, {name}!</h1>
            <h5 style={{ color: '#007bff', marginBottom: '20px' }}>Give permission to access your PA</h5>

            {/* Initial message input */}
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
              <div className="input-group border rounded overflow-hidden">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Type your message here..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  required
                  style={{
                    backgroundColor: '#2c2c2c',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '5px 0 0 5px',
                    border: '1px solid #444',
                  }}
                />
                <button
                  className="btn"
                  type="submit"
                  style={{
                    backgroundColor: '#ff9900',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '0 5px 5px 0',
                  }}
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        ) : (
          // If user has interacted - Chat screen
          <div className="d-flex flex-column justify-content-between" style={{ height: '100vh', position: 'relative', backgroundColor: '#000', color: '#fff' }}>

            {/* Chat messages */}
            <div ref={chatContainerRef} className="container" style={{ maxHeight: '80vh', overflowY: 'auto', marginBottom: '80px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    backgroundColor: message.type === 'user' ? '#ff9900' : '#444',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '10px',
                    marginBottom: '10px',
                    maxWidth: '80%',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <span>{message.content}</span>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="text-center my-3">
                  <Slab color="#ff9900" size="medium" text="ON YOUR WORK SIR" />
                </div>
              )}
            </div>

            {/* Bottom fixed input bar */}
            <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#000', padding: '15px 0', boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
              <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="input-group border rounded overflow-hidden">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Type your message here..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    required
                    style={{
                      backgroundColor: '#2c2c2c',
                      color: '#fff',
                      padding: '10px',
                      borderRadius: '5px 0 0 5px',
                      border: '1px solid #444',
                    }}
                  />
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      backgroundColor: '#ff9900',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '0 5px 5px 0',
                    }}
                  >
                    Generate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
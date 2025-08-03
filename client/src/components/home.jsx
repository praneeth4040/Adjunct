import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Slab } from 'react-loading-indicators';

function Home() {
  const location = useLocation();
  const [name, setName] = useState(localStorage.getItem('userName') || 'Guest');
  const [mobilenumber, setMobilenumber] = useState(localStorage.getItem('mobilenumber') || '');
  const [userPrompt, setUserPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const hasInteracted = chatMessages.length > 0;

  // Scroll to bottom on new message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatMessages]);

  // Set name from location state
  useEffect(() => {
    const userNameFromLocation = location.state?.userName;
    if (userNameFromLocation) {
      setName(userNameFromLocation);
      localStorage.setItem('userName', userNameFromLocation);
    }
  }, [location.state]);

  // Save chat messages + mobile number
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('mobilenumber', mobilenumber);
  }, [mobilenumber]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = userPrompt.trim();
    if (!prompt || !mobilenumber.trim()) return;

    setUserPrompt('');
    setLoading(true);

    const newChat = [
      ...chatMessages,
      { id: Date.now(), type: 'user', content: prompt }
    ];
    setChatMessages(newChat);

    try {
      const response = await axios.post('http://192.168.1.4:5000/adjunctfromfrontend', {
        userPrompt: prompt,
        mobilenumber: mobilenumber,
        chatHistory: newChat
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const reply = response?.data?.generatedPrompt?.generatedResponse || 'No response received.';
      setChatMessages([
        ...newChat,
        { id: Date.now(), type: 'ai', content: reply }
      ]);
    } catch (err) {
      console.error('❌ Backend error:', err);
      setChatMessages([
        ...newChat,
        { id: Date.now(), type: 'ai', content: 'An error occurred while contacting the backend. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`input::placeholder { color: #ffffff !important; opacity: 0.7; }`}
      </style>

      <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#000', color: '#fff', overflow: 'hidden' }}>
        {!hasInteracted ? (
          // FIRST SCREEN (ask mobile + first message)
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ flex: 1, padding: '20px' }}>
            <h1 style={{ color: '#ff9900' }}>Welcome, {name}!</h1>
            <h5 style={{ color: '#007bff', marginBottom: '20px' }}>Give permission to access your PA</h5>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
              <div className="mb-3">
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your mobile number'
                  value={mobilenumber}
                  onChange={(e) => setMobilenumber(e.target.value)}
                  required
                  style={{ backgroundColor: '#2c2c2c', color: '#fff', border: '1px solid #444' }}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message here..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  required
                  style={{ backgroundColor: '#2c2c2c', color: '#fff', border: '1px solid #444' }}
                />
                <button
                  className="btn"
                  type="submit"
                  style={{ backgroundColor: '#ff9900', color: '#fff', border: 'none' }}
                >
                  Generate
                </button>
              </div>
            </form>
            <p style={{ color: '#fff', marginTop: '20px' }}>Your mobile number will be used to access your personal assistant.</p>
            <p style={{ color: '#fff', marginTop: '10px' }}>Please enter your mobile number to proceed.</p>
          </div>
        ) : (
          // CHAT SCREEN
          <div className="d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
            <div ref={chatContainerRef} className="container" style={{ maxHeight: '80vh', overflowY: 'auto', marginBottom: '80px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    backgroundColor: msg.type === 'user' ? '#ff9900' : '#444',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '10px',
                    marginBottom: '10px',
                    maxWidth: '80%',
                    whiteSpace: 'pre-wrap',
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="text-center my-3">
                  <Slab color="#ff9900" size="medium" text="ON YOUR WORK SIR" />
                </div>
              )}
            </div>

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
                    style={{ backgroundColor: '#2c2c2c', color: '#fff', padding: '10px', border: '1px solid #444' }}
                  />
                  <button className="btn" type="submit" style={{ backgroundColor: '#ff9900', color: '#fff', border: 'none', padding: '10px 20px' }}>
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

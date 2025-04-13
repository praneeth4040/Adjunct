import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Import the Axios instance
import { Slab } from 'react-loading-indicators';

function Home() {
  const location = useLocation();
  const [name, setName] = useState(localStorage.getItem('userName') || 'Guest');
  const [userPrompt, setUserPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('chatMessages')) || []
  );
  const [hasInteracted, setHasInteracted] = useState(chatMessages.length > 0);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [emailData, setEmailData] = useState({ subject: '', recipient: '', body: '' });

  // Persist chat messages
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Set user from location or token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userNameFromLocation = location.state?.userName;

    if (token && userNameFromLocation) {
      setName(userNameFromLocation);
      localStorage.setItem('userName', userNameFromLocation);
    }

    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.state?.userName]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Watch for authToken removal
  useEffect(() => {
    const handleAuthTokenChange = () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        localStorage.removeItem('chatMessages');
        setChatMessages([]);
        setHasInteracted(false);
      }
    };

    window.addEventListener('focus', handleAuthTokenChange);
    const interval = setInterval(handleAuthTokenChange, 5000);

    return () => {
      window.removeEventListener('focus', handleAuthTokenChange);
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setHasInteracted(true);
    const promptText = userPrompt;
    setUserPrompt('');
    setLoading(true);

    const newChatMessages = [
      ...chatMessages,
      { id: Date.now(), type: 'user', content: promptText, isEditable: false },
    ];
    setChatMessages(newChatMessages);

    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        'http://localhost:3000/askAi',
        { userPrompt: promptText },
const response = await axiosInstance.post(
        '/askAi',
        { userPrompt },

        {
          headers: { Authorization: `Bearer ${token}` },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const jsonGeneratedResponse = response.data.generatedPrompt;

      if (jsonGeneratedResponse.emailAPI === true || jsonGeneratedResponse.emailApi === true) {
        const { subject, receiptentEmailId: recipient, body } = jsonGeneratedResponse;
        setEmailData({ subject, recipient, body });

        setChatMessages([
          ...newChatMessages,
          {
            id: Date.now(),
            type: 'ai',
            content: `Recipient: ${recipient}\nSubject: ${subject}\nBody: ${body}`,
            isEditable: true,
            showSendButton: true,
          },
        ]);
      } else {
        const generatedContent = jsonGeneratedResponse.generatedResponse;

        setChatMessages([
          ...newChatMessages,
          {
            id: Date.now(),
            type: 'ai',
            content: generatedContent,
            isEditable: false,
            showSendButton: false,
          },
        ]);
      }
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

  const handleSave = (id, newContent) => {
    setChatMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, content: newContent, isEditable: false } : message
      )
    );
  };

  const handleSend = async () => {
    const { subject, recipient, body } = emailData;

    if (!subject || !recipient || !body) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now(),
          type: 'error',
          content: 'Email data is incomplete. Cannot send email.',
          isEditable: false,
        },
      ]);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axiosInstance.post(
        '/sendemail',
        { subject, recipient, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setChatMessages([
          ...chatMessages,
          {
            id: Date.now(),
            type: 'info',
            content: 'Email sent successfully!',
            isEditable: false,
          },
        ]);
      } else {
        setChatMessages([
          ...chatMessages,
          {
            id: Date.now(),
            type: 'error',
            content: 'Email sending failed. Please try again.',
            isEditable: false,
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now(),
          type: 'error',
          content: 'An error occurred while sending the email.',
          isEditable: false,
        },
      ]);
    }
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #ffffff !important;
            opacity: 0.7;
          }
        `}
      </style>

      <div
        className="d-flex flex-column"
        style={{
          height: '100vh',
          backgroundColor: '#000',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        {!hasInteracted && (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ flex: 1, padding: '20px' }}
          >
            <h1 style={{ color: '#ff9900' }}>Welcome, {name}!</h1>
            <h5 style={{ color: '#007bff', marginBottom: '20px' }}>
              Give permission to access your PA
            </h5>
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
        )}

        {hasInteracted && (
          <div
            className="d-flex flex-column justify-content-between"
            style={{
              height: '100vh',
              position: 'relative',

              backgroundColor: '#000', 
              color: '#fff', 
            }}
          >
            {/* Chat section */}

              backgroundColor: '#000',
              color: '#fff',
            }}
          >

            <div
              ref={chatContainerRef}
              className="container"
              style={{
                maxHeight: '80vh',
                overflowY: 'auto',
                marginBottom: '80px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
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
                  {message.isEditable ? (
                    <textarea
                      className="form-control"
                      defaultValue={message.content}
                      onBlur={(e) => handleSave(message.id, e.target.value)}
                    />
                  ) : (
                    <span>{message.content}</span>
                  )}

                  {message.type === 'ai' && message.showSendButton && (
                    <div className="mt-2">
                      <button className="btn btn-success btn-sm" onClick={handleSend}>
                        Send
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="text-center my-3">
                  <Slab color="#ff9900" size="medium" text="ON YOUR WORK SIR" />
                </div>
              )}
            </div>

            {/* Bottom Input Box */}

            </div>

            {loading && (
              <div className="text-center my-3">
                <Slab color="#ff9900" size="medium" text="ON YOUR WORK SIR" />
              </div>
            )}


            <div
              style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                backgroundColor: '#000',
                padding: '15px 0',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
              }}
            >
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

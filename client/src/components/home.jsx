import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Slab } from 'react-loading-indicators'; // Import the loading indicator

function Home() {
  const location = useLocation();
  const [name, setName] = useState(localStorage.getItem('userName') || 'Guest');
  const [userPrompt, setUserPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [sendButton, setSendButton] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const chatContainerRef = useRef(null);

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasInteracted(true);
    setUserPrompt('');
    setLoading(true); // Set loading to true
    const newChatMessages = [
      ...chatMessages,
      { id: Date.now(), type: 'user', content: userPrompt, isEditable: false },
    ];
    setChatMessages(newChatMessages);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:3000/askAi',
        { userPrompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const jsonGeneratedResponse = response.data.generatedPrompt;
      const subject = jsonGeneratedResponse.subject;
      const body = jsonGeneratedResponse.body;
      const recipient = jsonGeneratedResponse.receiptentEmailId;

      if (jsonGeneratedResponse.emailAPI && subject && body && recipient) {
        setSendButton(true);
        setChatMessages([
          ...newChatMessages,
          {
            id: Date.now(),
            type: 'ai',
            content:
              'receipent: ' + recipient + '\n' + 'subject: ' + subject + '\n' + 'body: ' + body,
            isEditable: true,
          },
        ]);
      } else {
        const generatedContent = jsonGeneratedResponse.generatedResponse;
        setSendButton(false);
        setChatMessages([
          ...newChatMessages,
          { id: Date.now(), type: 'ai', content: generatedContent, isEditable: false },
        ]);
      }
    } catch (error) {
      console.error('Error generating message:', error);
      setChatMessages([
        ...newChatMessages,
        { id: Date.now(), type: 'ai', content: 'An error occurred. Please try again.', isEditable: false },
      ]);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleSave = (id, newContent) => {
    setChatMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, content: newContent, isEditable: false } : message
      )
    );
  };

  const handleSend = (id) => {
    try {
    } catch {}
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-between" style={{ height: '100vh', position: 'relative' }}>
        {/* Welcome message */}
        {!hasInteracted && (
          <div
            className="d-flex flex-column align-items-center"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#28a745',
                marginBottom: '10px',
              }}
            >
              Welcome, {name}!
            </h1>
            <h4
              style={{
                fontSize: '20px',
                color: '#007bff',
              }}
            >
              give permission to get access of your PA
            </h4>
          </div>
        )}

        {/* Chat section */}
        {hasInteracted && (
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
                className={`mb-3 ${message.type === 'user' ? 'text-left' : 'text-right'}`}
                style={{
                  backgroundColor: message.type === 'user' ? '#d1e7dd' : '#f1f1f1',
                  borderRadius: '10px',
                  padding: '10px',
                  maxWidth: '80%',
                  margin: '5px 0',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  position: 'relative',
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

                {message.type === 'ai' && sendButton && (
                  <div className="mt-2">
                    <button className="btn btn-success btn-sm" onClick={() => handleSend(message.id)}>
                      Send
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="text-center my-3">
                <Slab color="#32cd32" size="medium" text="ON YOUR WORK SIR" textColor="" />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="bg-light py-3 text-center" style={{ position: 'absolute', bottom: '0', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <div className="input-group rounded border p-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Type your message..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                required
              />
              <button className="btn btn-success" type="submit">
                Generate
              </button>
            </div>
          </form>
        </footer>
      </div>
    </>
  );
}

export default Home;

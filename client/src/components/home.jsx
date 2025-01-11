import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const location = useLocation();
  const [name, setName] = useState(localStorage.getItem('userName') || 'Guest');
 
  const [userPrompt, setUserPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState([]); // To store chat messages
  const [hasInteracted, setHasInteracted] = useState(false); // To track if user clicked the generate button
  const chatContainerRef = useRef(null); // Reference to the chat container for auto-scrolling


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
    // Scroll to the bottom of chat container whenever new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark that the user clicked the "Generate" button
    setHasInteracted(true);

    // Add the user's input as a message in the chat (on the right)
    const newChatMessages = [
      ...chatMessages,
      { type: 'user', content: ` ${userPrompt}` },
    ];
    setChatMessages(newChatMessages);
    console.log(userPrompt)
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:3000/askAi',{ userPrompt},{headers:{'Authorization':`Bearer ${token}`}} );
      
      // Add the AI-generated result to the chat (on the left)
      const generatedContent = response.data.generatedPrompt || 'No content generated.';
      console.log(generatedContent)
      setChatMessages([ ...newChatMessages, { type: 'ai', content: generatedContent } ]);

      
      setUserPrompt('');
    } catch (error) {
      console.error('Error generating message:', error);
      setChatMessages([ ...newChatMessages, { type: 'ai', content: 'An error occurred. Please try again.' } ]);
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ height: '100vh', position: 'relative' }}
      >
        {/* Show Welcome message if user hasn't interacted yet */}
        {!hasInteracted ? (
          <div className="d-flex justify-content-center align-items-center" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#28a745',
          }}>
            <p>Welcome, {name}!</p>
          </div>
        ) : (
          <div
            ref={chatContainerRef}
            className="container"
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
              marginBottom: '80px', // To give space for the input area
              padding: '10px',
              display: 'flex',
              flexDirection: 'column', // Ensure new messages appear at the bottom in correct sequence
            }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${message.type === 'user' ? 'text-left' : 'text-right'}`}
                style={{
                  backgroundColor: message.type === 'user' ? '#d1e7dd' : '#f1f1f1',
                  borderRadius: '10px',
                  padding: '10px',
                  maxWidth: message.type === 'user' ? '70%' : '80%', // Different max-width based on message type
                  margin: '5px 0',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message.content}
              </div>
            ))}
          </div>
        )}

        {/* Fixed footer with inputs */}
        <footer
          className="bg-light py-3 text-center"
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            padding: '10px 0',
            backgroundColor: '#f8f9fa',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row d-flex justify-content-center">
              <div
                className="input-group rounded border p-2"
                style={{
                  maxWidth: '600px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: '10px',
                }}
              >
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Type your message..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  required
                  style={{
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#fff',
                    border: '1px solid #ced4da',
                  }}
                />
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn btn-success w-100"
                    id="sendButton"
                    type="submit"
                    style={{
                      borderRadius: '5px',
                      background: 'linear-gradient(135deg, #28a745, #218838)',
                      fontSize: '16px',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '10px',
                      border: 'none',
                      transition: 'background 0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.background = '#218838')}
                    onMouseOut={(e) => (e.target.style.background = 'linear-gradient(135deg, #28a745, #218838)')}
                  >
                    <i className="bi bi-send" style={{ color: 'white' }}></i> Generate
                  </button>
                </div>
              </div>
            </div>
          </form>
        </footer>
      </div>
    </>
  );
}

export default Home;

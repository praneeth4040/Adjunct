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
    // Scroll to the bottom of chat container whenever a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasInteracted(true);
    setUserPrompt('');
    // Add the user's input as a message in the chat (on the right)
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
      console.log(typeof response.data.generatedPrompt);
     const jsonGeneratedResponse = response.data.generatedPrompt.replace(/```json | ```/, ' ').trim();
     console.log(jsonGeneratedResponse)
       jsonGeneratedResponse = JSON.parse(jsonGeneratedResponse);
      console.log( typeof jsonGeneratedResponse);
      const subject=jsonGeneratedResponse.subject
        const body = jsonGeneratedResponse.body
        const recipient=jsonGeneratedResponse.receiptentemailid
        console.log("subject :",subject);
        console.log("body ", body);
        console.log("recipient", recipient);
        console.log("response.data.generatedPrompt = ",jsonGeneratedResponse);
      if(jsonGeneratedResponse.emailAPI&&subject&&body&&recipient){
        
          setChatMessages([
          ...newChatMessages,
          { id: Date.now(), type: 'ai', content: {subject, "\n":
            body,"\n": recipient }, isEditable: false },
        ]);
  
      }else{
        const generatedContent = response.data.generatedPrompt.generatedResponse || 'No content generated.';
        
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
    }
  };

  const handleEdit = (id) => {
    setChatMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, isEditable: true } : message
      )
    );
  };

  const handleSave = (id, newContent) => {
    setChatMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, content: newContent, isEditable: false } : message
      )
    );
  };

  const handleSend = (id) => {
    const messageToSend = chatMessages.find((message) => message.id === id);
    if (messageToSend && recipientAddress) {
      alert(`Email sent to ${recipientAddress}: ${messageToSend.content}`);
      // Add your email sending logic here
    } else {
      alert('Please enter a valid recipient address.');
    }
  };

  // Check if the prompt is related to sending an email
  //nction to copy content to clipboard
  

  return (
    <>
      <div className="d-flex flex-column justify-content-between" style={{ height: '100vh', position: 'relative' }}>
        {/* Welcome message */}
        {!hasInteracted && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#28a745',
            }}
          >
            <p>Welcome, {name}!</p>
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

                {/* Only show Edit, Send and Recipient input for email-related prompts */}
                {/* {message.type === 'ai' (
                  <div className="mt-2">
                   
                    <div className="d-flex justify-content-end">
                      {!message.isEditable && (
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => handleEdit(message.id)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleSend(message.id)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )} */}
              </div>
            ))}
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

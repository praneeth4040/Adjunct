import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function Home() {
  const location = useLocation();
  const name = location.state?.userName;

 
 

  

  useEffect(() => {
    // Generate a random message on page load
   

    // Disable scrolling when the component is mounted
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component is unmounted (cleanup)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between" style={{ height: '100vh' }}>
      {/* Main content in the middle of the page */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1 text-center"  style={{
        position: 'absolute',
        top: '30%', // Set input at 60% of the page height
        right: "100px"
        }}>
        <div>
          <h1>Welcome, <strong>{name}</strong>!</h1>
          <p className="lead mt-4">
            This is your personal homepage where you can interact with our bot.
            Get started by typing below and feel free to ask anything!
          </p>
        </div>
      </div>

      {/* Footer with placeholder and send icon */}
      <footer className="bg-light py-3 text-center"
       style={{
        position: 'relative',
        top: '60%', // Set input at 60% of the page height
        }}>
        <div className="input-group" >
        <input
  className="form-control"
  type="text"
  defaultValue="ask me."
  aria-label="readonly input example"
  readOnly=""
  

/>
          <button
            className="btn btn-primary"
            id="sendButton"
            style={{
              borderRadius: '0 5px 5px 0',
              backgroundColor: 'green', // Set icon color to green
              border: 'none',
            }}
            
          >
            <i className="bi bi-send" style={{ color: 'white' }}></i> {/* Bootstrap icon */}

          </button>
        </div>
      </footer>
    </div>
  );
}

export default Home;

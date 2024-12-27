import React, { useState } from 'react';
import axios from 'axios';
import './setup.css';
import { Link } from 'react-router-dom';

function Setup() {
  const [senderEmail, setSenderEmail] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(senderEmail,senderName, appPassword);
    setSenderEmail(" ")
    setAppPassword(" ")
    setSenderName(" ")
    // You can add an API call here if needed, for example:
    // axios.post('YOUR_API_ENDPOINT', { senderEmail, appPassword })
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
  };

  return (
    <>
      <div className="documentation-container container py-5">
        <header className="documentation-header text-center mb-5">
          <h1 className="display-4 text-primary font-weight-bold">Welcome to MyAi</h1>
          <p className="lead text-muted">
            Everything you need to know about using MyAi effectively. Follow the steps below to get started.
          </p>
        </header>

        <section className="procedure-section mb-5">
          <h2 className="text-secondary">How to Use MyAi</h2>
          <p className="text-muted">Follow these simple steps to get started:</p>
          
          <ol className="list-group list-group-numbered">
            <li className="list-group-item">
              <h3>Step 1: Create an Account</h3>
              <p>Visit the <Link to="/signin" className="text-decoration-none text-primary">sign-up page</Link> to create an account.</p>
            </li>
            <li className="list-group-item">
              <h3>Step 2: Log In</h3>
              <p>Log in with your credentials to access the dashboard and start generating emails.</p>
            </li>
            <li className="list-group-item">
              <h3>Step 3: Configure Email</h3>
              <p>Enter your email address and app password for a one-time setup. You can change the email address later.</p>
            </li>
            <li className="list-group-item">
              <h3>Step 4: Generate Emails</h3>
              <p>On the home page, select your email purpose, and MyAi will assist in drafting an email.</p>
            </li>
            <li className="list-group-item">
              <h3>Step 5: Send the Email</h3>
              <p>Once the email is ready, you can send it directly from the platform.</p>
            </li>
          </ol>
        </section>
      </div>

      <footer className="py-5 bg-light">
        <div className="container">
          <form onSubmit={handleSubmit} className="row g-4">
            {/* From Email Input */}
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">From Email:</label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg shadow-sm"
                placeholder="Enter your email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </div>            <div className="col-md-6">
              <label htmlFor="email" className="form-label">From Email:</label>
              <input
                type="name"
                id="name"
                className="form-control form-control-lg shadow-sm"
                placeholder="sender name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>

            {/* App Password Input */}
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">App Password:</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg shadow-sm"
                placeholder="Enter your app password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-lg btn-success px-5 py-2 rounded-pill shadow-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </footer>
    </>
  );
}

export default Setup;

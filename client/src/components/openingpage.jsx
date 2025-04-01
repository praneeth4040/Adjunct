import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function OpenPage()  {

    return ( <>
    <div>
      {/* Navbar */}
     {/* <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#000000" }}>
        <div className="container">
          <a className="navbar-brand" href="#">Adjunct</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-search"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>*/}

      {/* Main Content */}
    {<div className="text-center text-white py-5" style={{ 
        minHeight: "100vh", 
        
        background: "linear-gradient(135deg, rgb(14, 29, 56), rgb(13, 106, 128))" 
      }}>
        <div className="container" style={{
            position: 'absolute',
            top: '30%', // Position input
            right: '100px'
        }}>
         
          <h1 className="display-3 fw-bold mb-4">Introducing myAi</h1>
          <div className="mb-4">
            <button className="btn btn-primary btn-lg me-2" ><Link to="/login" style={{ color:"white"}}>Try myAi</Link></button>
           
          </div>
          <p className="lead"> <strong>myAi</strong> helps students and professionals save time by automatically generating and sending email responses using AI-powered prompts. Streamline your communication with personalized, professional emails tailored to your needs, without the hassle of writing or replying manually.</p>
          
        </div>
      </div> }
    </div>

  
    </> );
}

export default OpenPage;
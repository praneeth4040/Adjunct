import React from "react";

function About() {
    return (
        <div className="container mt-5">
          <h1 className="text-center mb-4">About Us</h1>
          <p className="lead text-center">
            We are a passionate team dedicated to delivering the best products and services to our customers.
            Our goal is to innovate and provide value to our users by solving real-world problems.
          </p>
    
          <section className="mt-5">
            <h2 className="text-center mb-4">Meet the Team</h2>
            
            <div className="mb-4">
              <h4>CHAKKA PRANEETH</h4>
              <p><strong>CEO & Founder</strong></p>
              <p>student at MLRIT,driving our development and ensuring everything works seamlessly</p>
            </div>
    
            <div className="mb-4">
              <h4>VALLURI DHANESH VAIBHAV</h4>
              <p><strong>co-Founder</strong></p>
              <p>student at BVRIT.The technical backbone of the team.</p>
            </div>
    
            {/* Add more team members as needed */}
          </section>
    
          <footer className="text-center mt-5">
            <p>Contact us at: infoadjunct@company.com</p>
          </footer>
        </div>
      );
}

export default About;
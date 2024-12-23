import React from 'react';
import axios from 'axios';
import { useState } from 'react';
function Signin() {
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [RetypePassword,setRetypePassword]=useState("")
  

  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
      const response=await axios.post("http://localhost:3000/signup",{name,email,password,RetypePassword})
      if (response.data.value==0){
        console.log("all fields are required")
      }
      else if(response.data.value==1){
        console.log("password do not match")

      }
      else if(response.data.value==2){
        console.log("email already exist redirect to login page")
      }
      else if(response.data.value==3){
        console.log("sign up successful")
      }
      else if(response.data.value==4){
        console.log("internal server error")
      }
     } catch (error) {
      console.log("error notification")
      console.log(error)
     }
     
  }

    return ( <>
    
    <main>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '30rem' }}>
        <h1 className="text-center mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              
              
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              
                            
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
              
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="repeatPassword"
              value={RetypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              
                            required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
    </main>
    </> );
}

export default Signin;
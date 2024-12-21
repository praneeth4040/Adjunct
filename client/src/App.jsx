import React from 'react';
import './App.css'
import Navbar from './components/navbar';
import Home from './components/home';
import LoginPage from './components/login';
import Profile from './components/profile';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

function App() {
 const router=createBrowserRouter([{
  path:'/',
  element:<><Navbar/><Home/></>
 },{
  path:"/login",
  element:<><Navbar/><LoginPage/></>
 },
 {
  path:"/profile",
  element:<><Navbar/><Profile/></>
 }
])
 
  return (
    <>
    
    
    <RouterProvider router={router}/>
    
    <footer>
    <input
  className="form-control"
  type="text"
  placeholder='ask me anything buddy'
  aria-label="readonly input example"
  readOnly=""
/>

    </footer>
</>

    
  )
}

export default App

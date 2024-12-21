import React from 'react';
import './App.css'

import Navbar from './components/navbar';
import Home from './components/home';
import LoginPage from './components/login';
import Profile from './components/profile';
import Signin from './components/signin';

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
 },
 {
  path:"/vaibhav",
  element:<><Navbar/><Signin/></>
 }
])
 
  return (
    <>
    
    
    <RouterProvider router={router}/>
    <main>

    </main>
    
</>

    
  )
}

export default App

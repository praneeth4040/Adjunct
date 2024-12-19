import React from 'react';
import './App.css'
import Navbar from './componets/navbar';
import Home from './componets/home';
import LoginPage from './componets/login';
import Profile from './componets/profile';
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
    
    
</>

    
  )
}

export default App

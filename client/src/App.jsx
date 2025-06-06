import React from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import LoginPage from './components/login';
import Profile from './components/profile';
import Signin from './components/signin';
import OpenPage from './components/openingpage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Forgetpassword from './components/forgetpassword';
import OTPVerificationPage from './components/otp';
import PrivateRoute from './components/privateroute';
import Setup from './components/setup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {gapi} from "gapi-script"
import { useEffect } from 'react';
import About from './components/aboutas';
import Blogs from './components/blogs';
import TermsAndConditions from './components/terms'
import Check from './components/check';
import Verifypage from './components/verifypage';
import PrivacyPolicy from './components/privacy';


function App() {
 
 
 
  const router = createBrowserRouter([
    {
      path: '/home',
      element: (
        <PrivateRoute>
          <Navbar />
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: '/login',
      element: (
        <>
          <Navbar />
          <LoginPage />
        </>
      ),
    },
    {
      path: '/privacy',
      element: (
        <>
        
          <PrivacyPolicy/>
        </>
      ),
    },
    {
      path: '/Verifypage',
      element: (
        <>
          <Navbar />
          <Verifypage />
        </>
      ),
    },
    {
      path: '/profile',
      element: (
        <PrivateRoute>
          <Navbar />
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: '/check',
      element: (
        <PrivateRoute>
          <Navbar />
          <Check />
        </PrivateRoute>
      ),
    },
    {
      path: '/terms',
      element: (
       
          
          <TermsAndConditions />
       
      ),
    },

    {
      path: '/signin',
      element: (
        <>
          <Navbar />
          <Signin />
        </>
      ),
    },
    {
      path: '/forgetpassword',
      element: <Forgetpassword />,
    },
    {
      path: '/otp',
      element: (
        
          <OTPVerificationPage />
        
      ),
    },
    {
      path: '/',
      element: (
        <>
         <Navbar />
         <OpenPage />
        </>)
    },
    {
      path: '/Setup',
      element: (
        <PrivateRoute>
          <Navbar />
          <Setup />
        </PrivateRoute>
      )
    }
    ,
    {
      path: '/about',
      element: (<>
      <Navbar/>
      <About /></>)
    },
    {
      path: '/blogs',


      element: (<><PrivateRoute><Navbar/><Blogs /></PrivateRoute></>)
   }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
}

export default App;

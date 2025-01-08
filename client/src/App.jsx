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

const clientId="512918008312-n1dh10cocbjqu8m3iu87ijcmi41eillg.apps.googleusercontent.com"


function App() {
 useEffect(()=>{
  function start(){
    gapi.client.init({
      clientId: clientId,
      scope:""
    })
  };
  gapi.load("client:auth2",start);
 })
 var accessToken=gapi.auth.getToken().access_Token;
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
      path: '/profile',
      element: (
        <PrivateRoute>
          <Navbar />
          <Profile />
        </PrivateRoute>
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
      element: <OpenPage />,
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
}

export default App;

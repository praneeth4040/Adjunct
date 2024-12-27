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
        <PrivateRoute>
          <OTPVerificationPage />
        </PrivateRoute>
      ),
    },
    {
      path: '/',
      element: <OpenPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <main></main>
    </>
  );
}

export default App;

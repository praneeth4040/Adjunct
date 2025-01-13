import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Check = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data after successful authentication
    axios.get('http://localhost:3000/auth/user')
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setError('Failed to fetch user data.');
        console.error(err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>About Page</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Access Token:</strong> {user.accessToken}</p>
      <p><strong>Refresh Token:</strong> {user.refreshToken}</p>
    </div>
  );
};

export default Check;

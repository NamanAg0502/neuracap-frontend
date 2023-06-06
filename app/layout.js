'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './globals.css';
import Cookies from 'js-cookie';
import { Montserrat } from 'next/font/google';
import Login from './pages/auth/login/page';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const token = Cookies.get('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      // Send a request to the backend to get user details
      axios
        .get(`http://localhost:4000/auth/user/${decodedToken.userId}`)
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Neuracap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body className={montserrat.className}>
        {user ? children : <Login />}
      </body>
    </html>
  );
}

'use client';

import { MantineProvider } from '@mantine/core';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { Notifications } from '@mantine/notifications';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  // console.log(user);
  return (
    <MantineProvider withGlobalStyles>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>Neuracap</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </head>
        <body className={montserrat.className}>
          {children}
          <Notifications />
        </body>
      </html>
    </MantineProvider>
  );
}

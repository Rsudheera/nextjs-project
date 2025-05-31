'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // List of routes where Navbar should be hidden
  const hideNavbarRoutes = ['/login/step1', '/login/step2', '/login/step3', '/login/mfa'];

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        {!shouldHideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}

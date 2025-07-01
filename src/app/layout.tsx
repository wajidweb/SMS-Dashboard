import './globals.css';
import { SidebarProvider } from '../contexts/SidebarContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
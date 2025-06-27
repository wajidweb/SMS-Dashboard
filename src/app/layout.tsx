'use client';
import './globals.css';
import { SidebarProvider, useSidebar } from '../contexts/SidebarContext';
import { ThemeProvider } from '../contexts/ThemeContext'; 
import Header from '../components/Header/Header';
import Sidebar from '@/components/SidebarComponent/Sidebar';
import React from 'react';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isMobileOpen } = useSidebar();
  console.log(isMobileOpen)

  const getMarginLeft = () => {

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return 'ml-0';
    }
    

    if (!isExpanded) {
      return 'ml-0'; 
    }
    
    return 'ml-[290px]';
  };

  return (
    <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${getMarginLeft()}`}>
      <Header />
      <main className="p-4 overflow-auto flex-1 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <LayoutContent>{children}</LayoutContent>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
'use client';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/SidebarComponent/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import React from 'react';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar();

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <LayoutContent>{children}</LayoutContent>
    </div>
  );
}
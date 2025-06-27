"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { navItems } from "@/utils/navItems";


const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  // Check if a path is active
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const renderMenuItems = () => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav) => (
        <li key={nav.name}>
          <Link
            href={nav.path}
            className={`group flex items-center w-full p-2 rounded-md transition-colors duration-200 text-sm bg-white
            hover:bg-blue-50 dark:hover:bg-gray-800 
            ${
              isActive(nav.path)
                ? "bg-blue-100 dark:bg-gray-700 "
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <span className="flex-shrink-0">{nav.icon}</span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="ml-3">{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  // Don't render sidebar on desktop when collapsed (isExpanded = false)
  // On mobile, show/hide based on isMobileOpen
  const shouldShowSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return isMobileOpen; // Mobile: show only when mobile menu is open
    }
    return isExpanded || isHovered; // Desktop: show when expanded or hovered
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          shouldShowSidebar()
            ? "w-[290px] translate-x-0"
            : "w-[290px] -translate-x-full lg:w-0 lg:translate-x-0"
        }`}
      onMouseEnter={() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 1024 && !isExpanded) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
          setIsHovered(false);
        }
      }}
    >
      {shouldShowSidebar() && (
        <>
          <div className="py-6 flex justify-start">
            <Link href="/" className="flex items-center gap-3">
              <div className="min-w-[32px] min-h-[32px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-square h-8 w-8 text-blue-500"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  SMS Dashboard
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Marketing Platform
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav className="mb-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">
                    {/* Always show menu items when sidebar is visible */}
                  </h2>
                  {renderMenuItems()}
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
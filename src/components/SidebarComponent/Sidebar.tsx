"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { navItems } from "@/utils/navItems";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered , setIsMobileOpen  } = useSidebar();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  // Check if a path is active
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const renderMenuItems = () => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav) => (
        <React.Fragment key={nav.name}>
          <li>
            {nav.subItems ? (
              <button
                type="button"
                onClick={() => toggleMenu(nav.name)}
                className={`group flex items-center justify-between w-full p-2 rounded-md transition-colors duration-200 text-sm bg-white
  hover:bg-blue-50 dark:hover:bg-gray-800 
  ${
    isActive(nav.path)
      ? "bg-blue-100 dark:bg-gray-700"
      : "text-gray-700 dark:text-gray-300"
  }`}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0">{nav.icon}</span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="ml-3">{nav.name}</span>
                  )}
                </div>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronRight
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                      openMenu === nav.name ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>
            ) : (
              <Link
                href={nav.path}
                onClick={() => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }
  }}

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
            )}
          </li>

          {/* Render subItems if menu is open */}
          {nav.subItems && openMenu === nav.name && (
            <ul className="ml-6 mt-1 flex flex-col gap-1">
              {nav.subItems.map((sub) => (
                <li key={sub.name}>
                  <Link
                    href={sub.path}
                    className={`block px-3 py-1 rounded-md text-sm transition-colors 
                    ${
                      isActive(sub.path)
                        ? "bg-blue-100 dark:bg-gray-700 text-blue-600"
                        : "text-gray-600 hover:bg-blue-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      ))}
    </ul>
  );

  const shouldShowSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return isMobileOpen;
    }
    return isExpanded || isHovered;
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col  lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          shouldShowSidebar()
            ? "w-[290px] translate-x-0"
            : "w-[290px] -translate-x-full lg:w-0 lg:translate-x-0"
        }`}
      onMouseEnter={() => {
        if (
          typeof window !== "undefined" &&
          window.innerWidth >= 1024 &&
          !isExpanded
        ) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.innerWidth >= 1024) {
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

          <div className="flex flex-col overflow-y-auto custom-scrollbar duration-300 ease-linear ">
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

          {/* User Info at Bottom */}
          <div className="mt-auto pb-6 border-t pt-2">
            <button className="flex items-center text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-4 py-1 w-full">
              <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
                <Image
                  width={44}
                  height={44}
                  src="/images/user/wajid.png"
                  alt="User"
                />
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <div className="flex flex-col justify-start items-start">
                  <span className="block font-bold text-sm text-gray-900 dark:text-white">
                    Wajid Ali
                  </span>
                  <span className="block text-sm text-gray-600 dark:text-gray-400">
                    admin
                  </span>
                </div>
              )}
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;

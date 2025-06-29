"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import userStorage from "@/store/userStore";
import {
  adminSidebarValues,
  doctorSidebarValues,
} from "@/lib/consts/sidebarConsts";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const { userRole } = userStorage();

  const toggleSidebar = useCallback(
    () => setIsOpen((prev) => !prev),
    [setIsOpen]
  );

  return (
    <aside
      className="fixed top-0 left-0 z-40 h-screen bg-white border-r border-primary/10 shadow-sm flex flex-col p-3 transition-all"
      style={{ width: isOpen ? 240 : 72 }}
    >
      {/* Sidebar Toggle Button */}
      <button
        className="absolute top-5 -right-4 bg-primary/20 hover:bg-green text-primary p-1 rounded-full transition-colors"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo or Short Form */}
      <div className="flex items-center justify-center mb-10">
        <span className="text-primary font-bold text-xl tracking-wide">
          {isOpen ? "CLINIC" : "CL"}
        </span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-2">
        {adminSidebarValues.map((item) => {
          const isActive = pathname === item.path;

          return (
            <div
              key={item.id}
              className="relative group"
              onClick={() => setIsOpen(false)}
            >
              <Link
                href={item.path}
                className={`flex items-center px-1 py-2 rounded-lg text-sm transition-colors relative ${
                  isActive
                    ? "bg-gray-300 text-primary"
                    : "hover:bg-gray-100 group-hover:text-primary"
                } ${isOpen ? "justify-start gap-4" : "justify-center"}`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-primary"
                      : "text-primary group-hover:text-primary/90"
                  }`}
                />

                {isOpen && (
                  <span className="flex items-center gap-2">{item.title}</span>
                )}
              </Link>

              {/* Tooltip - Only show when sidebar is closed and not on touch devices */}
              {!isOpen && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-primary text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.title}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

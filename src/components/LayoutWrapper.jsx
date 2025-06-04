"use client";
import React, { useState } from "react";

import { Toaster } from "./ui/sonner";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const LayoutWrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1">
        <Navbar isOpen={isOpen} />
        <main
          className={`min-h-screen   transition-all duration-200 ${
            isOpen ? "ml-[240px]" : "ml-[72px]"
          }`}
        >
          {children}
          <Toaster position="top-right" richColors />
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;

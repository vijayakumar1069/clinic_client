"use client";
import { staticNavbarValues } from "@/lib/consts/staticNavbarValues";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const StaticNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`fixed  w-full z-50 transition-all duration-300  ${
        scrolled
          ? "bg-white backdrop-blur-lg shadow-sm py-3 border-b border-dialog_inside_border_color"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2">
            <div
              className={`flex items-center transition-all ${
                scrolled ? "gap-2" : "gap-3"
              }`}
            >
              <span
                className={`text-xl font-bold ${
                  scrolled ? "" : "text-white"
                }`}
              >
                Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {staticNavbarValues.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className={`relative font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white hover:text-white/90"
                }`}
              >
                {item.title}
              </a>
            ))}

            <div className="flex gap-4 ml-4">
              <Link
                href="/admin-login"
                className={`px-4 py-2 rounded-full border transition-all ${
                  scrolled
                    ? " text-primary hover:bg-primary/5"
                    : " text-white hover:bg-white/10"
                }`}
              >
                Admin Login
              </Link>
             
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg focus:outline-none"
          >
            {isMenuOpen ? (
              <X
                className={scrolled ? "text-gray-700" : "text-white"}
                size={28}
              />
            ) : (
              <Menu
                className={scrolled ? "text-gray-700" : "text-white"}
                size={28}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden absolute w-full py-6 px-4 ${
            scrolled ? "bg-white" : "bg-primary"
          } shadow-xl`}
        >
          <div className="flex flex-col gap-4">
            {staticNavbarValues.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:bg-primary/10"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/admin-login"
                className={`px-4 py-3 rounded-full text-center ${
                  scrolled ? "bg-primary text-white" : "bg-white text-primary"
                }`}
              >
                Admin Login
              </Link>
             \
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StaticNavbar;

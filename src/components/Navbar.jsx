import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-xl">ReadMeAI</span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>

          {/* Desktop Navigation with theme toggle */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-6 mr-6">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kane-dylan/Spyder-2.0.git"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Docs
                </a>
              </li>
            </ul>
            <div className="flex items-center">
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
            <ul className="space-y-5">
              <li>
                <Link
                  to="/"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kane-dylan/Spyder-2.0.git"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Mobile Fixed Theme Toggle */}
      {isMobile && (
        <div className="md:hidden fixed right-4 bottom-4 z-50 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      )}
    </>
  );
}

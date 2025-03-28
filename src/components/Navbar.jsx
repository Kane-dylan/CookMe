import { Link } from "react-router-dom";
import { FaGithub, FaSun, FaMoon, FaHome, FaFileAlt } from "react-icons/fa";
import { Button } from "./ui/moving-border";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaGithub className="h-6 w-6 dark:text-primary" />
            <span className="font-bold text-xl dark:text-white">ReadMeAI</span>
          </div>
          <nav>
            <ul className="hidden md:flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-md font-bold hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-md font-bold hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kane-dylan/Spyder-2.0.git"
                  className="text-md font-bold hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  Docs
                </a>
              </li>
              <li>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                  aria-label={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? (
                    <FaSun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <FaMoon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
          >
            <FaHome className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <a
            href="#features"
            className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
          >
            <FaFileAlt className="h-6 w-6" />
            <span className="text-xs mt-1">Features</span>
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <FaSun className="h-6 w-6 text-yellow-500" />
            ) : (
              <FaMoon className="h-6 w-6" />
            )}
            <span className="text-xs mt-1">{darkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

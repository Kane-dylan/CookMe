import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or user's preference
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Update theme when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="min-h-screen mx-auto overflow-hidden-clip">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;

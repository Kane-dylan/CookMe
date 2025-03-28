import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <main className="min-h-screen mx-auto overflow-hidden-clip bg-white dark:bg-gray-900">
        <Navbar />
        <div className="bg-white dark:bg-gray-900">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;

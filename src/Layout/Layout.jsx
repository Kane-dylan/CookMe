import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer";

const Layout = () => {
  return (
    <div>
      <main className="min-h-screen mx-auto overflow-hidden-clip">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;

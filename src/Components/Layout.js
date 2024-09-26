// Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children, background }) => {
  const location = useLocation();
  const isHome = location.pathname === "/"; // Check if the current path is /home
  const backgroundColor = isHome ? "#000" : "none";
  const backgroundImage = isHome
    ? "url(/dripSaintAssets/frame_ellipse.png)"
    : "none";

  return (
    <div
      className={`flex flex-col min-w-full min-h-screen`}
      style={{ backgroundColor, backgroundImage }}
    >
      <Navbar />
      <main
        className={` flex-1 flex items-center justify-center  ${background}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

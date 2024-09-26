import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../auth/UserContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  mobileNavContainerVariant,
  mobileNavListVariant,
} from '../data/animationConfig'; // Assuming this is your animation config file

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [designTypes, setDesignTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage the dropdown menu
  const location = useLocation(); // Get the current location
  const menuRef = useRef(null); // Reference for the menu element
  const dropdownRef = useRef(null); // Reference for the dropdown menu element
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`https://api.dripsaint.com/api/logout/`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(null);
        closeMenu();
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  // Close menu when clicking/tapping outside or on the navbar button
  useEffect(() => {
    const closeMenuOutside = (e) => {
      if (isOpen && !menuRef.current.contains(e.target)) {
        if (!e.target.closest('.navbar-button')) {
          setIsOpen(false);
        }
      }
    };

    const closeDropdownOutside = (e) => {
      if (dropdownOpen && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenuOutside);
    document.addEventListener('mousedown', closeDropdownOutside);

    return () => {
      document.removeEventListener('mousedown', closeMenuOutside);
      document.removeEventListener('mousedown', closeDropdownOutside);
    };
  }, [isOpen, dropdownOpen]);

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchDesignTypes = async () => {
      try {
        const response = await axios.get(
          `https://api.dripsaint.com/api/design_type/`,
          {
            withCredentials: true,
          }
        );

        setDesignTypes(response.data.design_types);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        // Handle error response or display error message
      }
    };

    fetchDesignTypes(); // Call the async function
  }, []);

  const handleButtonClick = (e) => {
    if (dropdownOpen) {
      e.preventDefault(); // Prevents navigation if dropdown is open
    }
  };

  return (
    <div className="navbar bg-black text-white z-10 w-full bg-gradient-to-r from-black via-transparent to-transparent" style={{ paddingTop: '2rem', position: 'sticky' }}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <a href="/" className="flex-shrink-0">
            <img src="/DripSaint.png" alt="DripSaint Logo" className="h-12 md:h-16 lg:h-20 w-auto" />
          </a>
          <a href="/" className="ml-2 md:ml-4 lg:ml-8 flex-shrink-0 whitespace-nowrap font-bold text-lg lg:text-xl text-white">DRIP SAINT</a>
        </div>
        <div className="sm:hidden flex items-center ml-44"> {/* Adjusted margin to 4px */}
          <button onClick={toggleMenu} className="navbar-button">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        <div className="hidden sm:flex items-center space-x-5 ml-14">
          <div className="relative" ref={dropdownRef}>
            <button
              className={`flex items-center font-semibold ${isActive('/designs') ? 'bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent' : 'hover:underline'}`}
              onClick={toggleDropdown}
            >
              Our Collection <span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">  {/* z-50 to bring it in front */}
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href={`/designs/ALL`}>ALL</a>
                  {!isLoading && designTypes.map((design, index) => (
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" key={index} href={`/designs/${design.id}`}>
                      {design.design_type.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {user ? (
            <button
              onClick={handleLogout}
              className="font-semibold hover:underline text-white"
              disabled={dropdownOpen} // Disable if dropdown is open
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              onClick={handleButtonClick}
              className={`font-semibold ${isActive('/login') ? 'bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent' : 'hover:underline'}`}
            >
              Login
            </a>
          )}
            <a href="/cart" onClick={handleButtonClick} className="relative">
              <img src="/dripSaintAssets/cart_icon.png" alt="Cart Icon" className="h-8 w-8" />
            </a>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileNavContainerVariant}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="fixed top-0 left-0 w-full z-20 bg-gray-900 text-white"
            style={{ top: '6rem' }} // Adjusted top positioning to align below the Navbar
            ref={menuRef} // Ref added to the menu container
          >
            <motion.ul
              variants={mobileNavListVariant}
              className="space-y-4 mt-8 px-4"
            >
              <li>
                <div className="relative" ref={dropdownRef}>
                  <button
                    className={`text-white block p-4 flex items-center ${isActive('/designs') ? 'underline' : ''}`}
                    onClick={toggleDropdown}
                  >
                    Our Collection
                    <span className='ml-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">  {/* z-50 to bring it in front */}
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href={`/designs/ALL`}>ALL</a>
                        {!isLoading && designTypes.map((design, index) => (
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" key={index} href={`/designs/${design.id}`}>
                            {design.design_type.toUpperCase()}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <a href="/" className="block p-4">Home</a>
              </li>
              <li>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="font-semibold hover:underline text-white block p-4"
                    disabled={dropdownOpen} // Disable if dropdown is open
                  >
                    Logout
                  </button>
                ) : (
                  <a href="/login" onClick={handleButtonClick} className="block p-4">Login</a>
                )}
              </li>
              <li>
              <a
                href="/cart"
                onClick={dropdownOpen ? (e) => e.preventDefault() : undefined}
                className="relative block p-4 z-10"  // z-10 or lower to keep it below the dropdown
              >
                <img
                  src="/dripSaintAssets/cart_icon.png"
                  alt="Cart Icon"
                  className="h-8 w-8 inline"
                  style={{ display: 'inline-block' }}
                />
              </a>      
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

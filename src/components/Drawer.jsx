// components/Drawer.js
import React, { useEffect, useRef } from 'react';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (isDrawerOpen) {
      drawerRef.current?.querySelector('input, button')?.focus();
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isDrawerOpen) return;

      const focusableElements = drawerRef.current?.querySelectorAll('input, button, a, [tabindex]');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  const handleDrawerClick = (e) => {
    e.stopPropagation(); // Prevent clicks inside the drawer from closing it
  };

  if (!isDrawerOpen) return null; // Return null when the drawer is not open

  return (
    <>
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out w-80 z-50`} // Ensure z-index is high
        aria-hidden={!isDrawerOpen}
        onClick={handleDrawerClick} // Stop clicks from closing the drawer
      >
        {/* Drawer Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <button onClick={toggleDrawer} className="absolute top-4 right-4 text-gray-600">
            &times;
          </button>
        </div>

        {/* Drawer Body: Login/Signup Form */}
        <div className="p-4">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </button>
            <div className="mt-4 text-center">
              <p>
                Don't have an account?{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40" // Ensure z-index is lower than drawer
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default Drawer;

// components/Drawer.js
import React from 'react';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out w-80`}
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
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default Drawer;

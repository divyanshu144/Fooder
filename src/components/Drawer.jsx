import React, { useState } from 'react';
import { loginUser, signupUser } from '../utils/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Only needed for signup
    const authState = useSelector((state) => state.auth);
  
    const handleDrawerClick = (e) => {
      e.stopPropagation();
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignup) {
        dispatch(signupUser({ email, password, username }));
      } else {
        dispatch(loginUser({ email, password }));
      }
    };
  
    return (
      <>
        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDrawer}
          />
        )}
  
        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-[30%] bg-white shadow-lg transform ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out w-80 z-50`}
          onClick={handleDrawerClick}
        >
          {/* Drawer Header */}
          <div className="pl-44 pr-[160px] mt-24">
            <h2 className="text-xl font-semibold">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            <button onClick={toggleDrawer} className="absolute top-4 right-4 text-gray-600">
              &times;
            </button>
          </div>
  
          {/* Drawer Body: Login/Signup Form */}
          <div className="pl-10 pr-[160px] w-[562px] mt-8">
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your username"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your email"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-custom-orange text-white rounded-lg hover:bg-custom-orange"
              >
                {isSignup ? 'Sign Up' : 'Sign In'}
              </button>
              <div className="mt-4 text-center">
                <p>
                  {isSignup ? (
                    <>
                      Already have an account?{' '}
                      <button type="button" onClick={() => setIsSignup(false)} className="text-blue-500 hover:underline">
                        Sign In
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button type="button" onClick={() => setIsSignup(true)} className="text-blue-500 hover:underline">
                        Sign Up
                      </button>
                    </>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
  
export default Drawer;
  

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { checkValidData } from '../utils/validate';
import { auth } from '../firebase';
import { addUser } from '../utils/userSlice';
import PopUp from './PopUp';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
    
    const [isSignInForm, setisSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    const dispatch = useDispatch();
    
    // ref for accessing the values of email and password from input tag
    const name = useRef(null)
    const email = useRef(null);
    const password = useRef(null);

    const handleDrawerClick = (e) => {
      e.stopPropagation();
    };

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        // validate the form data

       // console.log(email.current.value);
       // console.log(password.current.value);

       const message =  checkValidData(email.current.value, password.current.value)
       setErrorMessage(message);
       // if form is valid then i can proceed for sign in or sign up

       if(message) return; // if there is a message then return that i.e whatever the error message


       if(!isSignInForm){

        //sign up logic
            createUserWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
                )

                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value , 
                      })
                      .then(() => {
                        // Profile updated!
                        // so we will update our store once again
                        const {uid, email, displayName} = user;
                        //here we are getting these uid, email, displayname and photoURL from the updated value of user not the old value
                        dispatch(addUser({ 
                                        uid: uid, 
                                        emai: email,
                                        displayName: displayName,  
                            }));
                            setUserLoggedIn(auth.currentUser);  // Trigger the pop-up
                      })
                      .catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message)
                      });
                    
                 })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    setErrorMessage(errorCode + "-" + errorMessage)
                });

       }
       else {
            // sign in logic

            signInWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
                )

            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUserLoggedIn(user);  // Trigger the pop-up
                //console.log(user);
            
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                setErrorMessage(errorCode + "-" + errorMessage)
            })
        
       }

    }
  
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
            <h2 className="text-xl font-semibold text-gray-700">{isSignInForm ? 'Sign In' : 'Sign Up'}</h2>
            <button onClick={toggleDrawer} className="absolute top-4 right-4 text-gray-600">
              &times;
            </button>
          </div>
  
          {/* Drawer Body: Login/Signup Form */}
          <div className="pl-10 pr-[160px] w-[562px] mt-8">
            <form onSubmit={ (e) => e.preventDefault()}>
              { !isSignInForm && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    ref={name}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-500"
                    placeholder="Enter your username"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  ref={email}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-500"
                  placeholder="Enter your email"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  ref={password}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-500"
                  placeholder="Enter your password"
                />
              </div>
              <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
              <button
                onClick={handleButtonClick}
                className="w-full py-2 bg-custom-orange text-white rounded-lg hover:bg-custom-orange"
              >
                {isSignInForm ? 'Sign In' : 'Sign Up'}
              </button>
              <div className="mt-4 text-center">
                <p>
                  {isSignInForm ? (
                    <>
                     <span className="text-gray-700">Don't have an account?{' '}</span>
                      <button type="button" onClick={toggleSignInForm} className="text-blue-500 hover:underline">
                        Sign Up
                      </button>
                  </>
                  ) : (
                    <>
                      <span className="text-gray-700">Already have an account?{' '}</span>
                      <button type="button" onClick={toggleSignInForm} className="text-blue-500 hover:underline">
                        Sign In
                      </button>
                  </>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
        
         {/* Pop-up */}
         {userLoggedIn && (
          <PopUp user={userLoggedIn} />
        )}

      </>
    );
  };
  
export default Drawer;
  

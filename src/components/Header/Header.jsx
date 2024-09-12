import { useContext, useEffect, useState } from 'react';
import { LOGO_URL } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
// import useOnlineStatus from '../../utils/useOnlineStatus';
// import UserContext from '../../utils/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';
import Drawer from '../Drawer';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../../utils/userSlice';
import { auth } from '../../firebase';

export const Header = () => {
  
  const onelineStatus = useOnlineStatus();

  const {loggedInUser} = useContext(UserContext)

  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector(store => store.user)

  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSignOut = () => {

    signOut(auth)
    .then(() => {})
    
    .catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }

  useEffect( ()=> {

   const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid, email, displayName} = user
          dispatch(addUser({ 
                      uid: uid, 
                      emai: email,
                      displayName: displayName, 
                    }));

          //after user sign in, we will close the drawer

          const drawerCloseTimeout = setTimeout(() => {
            setIsDrawerOpen(false);
          }, 3000);

         navigate('/')

         //Cleanup the timeout if the component unmounts before 3 seconds
        return () => clearTimeout(drawerCloseTimeout);

        } else {
          // User is signed out
          dispatch(removeUser());
          navigate('/')
        }
      });

      return () => unsubscribe();
      // whenever my header components unloads/ ummounts then it will unsubscirbe the onAuthStateChanged api
      
}, [])


  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-lg">
      {/* Logo Section */}
      <div className="logo-container">
        <img className="w-20 rounded-lg transition-transform hover:scale-105" src={LOGO_URL} alt="Fooder" />
      </div>

      {/* Navigation Links and Cart */}
      <div className="flex items-center space-x-6">
        <ul className="flex space-x-8 text-lg font-semibold">
          <li className="hover:text-orange-400 transition duration-200">
            Online Status: {onelineStatus ? "🟢" : "🔴"}
          </li>
          <li className="hover:text-orange-400 transition duration-200">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-orange-400 transition duration-200">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-orange-400 transition duration-200">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="hover:text-orange-400 transition duration-200">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="font-bold text-xl text-orange-500 hover:text-orange-600 transition duration-200">
            <Link to="/cart">Cart ({cartItems.length} items)</Link>
          </li>
        </ul>

        {/* Sign-in/Sign-out Button */}
        <div>
          {user ? (
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-200" onClick={handleSignOut}>
              Sign out
            </button>
          ) : (
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-200" onClick={toggleDrawer}>
              Sign in
            </button>
          )}
        </div>

        {/* Logged In User */}
        <div className="font-bold ml-4">
          {loggedInUser}
        </div>
      </div>

      {/* Drawer */}
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default Header;
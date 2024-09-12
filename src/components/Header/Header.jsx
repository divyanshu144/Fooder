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
    <div className="flex justify-between">
        <div className="logo-container">
            <img className="w-40" 
            src={LOGO_URL } 
            alt="Fooder" />
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4 shadow-md">
            <li className="px-4">
              Online Status: {onelineStatus ? "🟢" : "🔴" }
            </li>
            <li className="px-4">
            <Link to="/">Home</Link>
            </li>
            <li className="px-4">
              <Link to="/about">About Us</Link>
              </li>
            <li className="px-4">
            <Link to="/contact">Contact Us</Link>
            </li>
            <li className="px-4">
            <Link to="/grocery">Grocery</Link>
            </li>
            <li className="px-4 font-bold text-xl">
              <Link to="/cart">Cart - ({cartItems.length} items)</Link>
            </li>
            {user ? (
            // If logged in, show "Sign out" button
            <button className="login" onClick={handleSignOut}>
              Sign out
            </button>
          ) : (
            // If not logged in, show "Sign in" button
            <button className="login" onClick={toggleDrawer}>
              Sign in
            </button>
          )}
              <li className="px-4 font-bold">
                  { loggedInUser }
              </li>
          </ul>
        </div>
        <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default Header;

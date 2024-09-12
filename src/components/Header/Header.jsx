import { useContext, useState } from 'react';
import { LOGO_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';
// import useOnlineStatus from '../../utils/useOnlineStatus';
// import UserContext from '../../utils/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';
import Drawer from '../Drawer';

export const Header = () => {
  
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const onelineStatus = useOnlineStatus();

  const {loggedInUser} = useContext(UserContext)

  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

//   const handleSignOut = () => {

//     signOut(auth)
//     .then(() => {})
    
//     .catch((error) => {
//       // An error happened.
//       navigate("/error")
//     });
//   }

//   useEffect( ()=> {

//    const unsubscribe =  onAuthStateChanged(auth, (user) => {
//         if (user) {
          
//           const {uid, email, displayName, photoURL} = user
//           dispatch(addUser({ 
//                       uid: uid, 
//                       emai: email,
//                       displayName: displayName, 
//                       photoURL: photoURL 
//                     }));
//           //after user sign in, we will take him to browse page
//          navigate('/browse')
//         } else {
//           // User is signed out
//           dispatch(removeUser());
//           navigate('/')
//         }
//       });

//       return () => unsubscribe();
//       // whenever my header components unloads/ ummounts then it will unsubscirbe the onAuthStateChanged api
      
// }, [])


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
            <button className="login" onClick={toggleDrawer} >
              sign in
            </button>
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

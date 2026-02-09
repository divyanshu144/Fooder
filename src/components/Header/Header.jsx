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
import { Badge, Button, Container } from '../../ui';

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

   const mockUserRaw = localStorage.getItem("fooder_mock_user");
   if (mockUserRaw) {
     try {
       const mockUser = JSON.parse(mockUserRaw);
       if (mockUser?.uid) {
         dispatch(addUser(mockUser));
         return;
       }
     } catch (err) {
       // ignore malformed mock user
     }
   }

   const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid, email, displayName} = user
          dispatch(addUser({ 
                      uid: uid, 
                      email: email,
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
    <div className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img className="h-12 w-12 rounded-2xl object-cover shadow-sm" src={LOGO_URL} alt="Fooder" />
          <div>
            <div className="text-lg font-extrabold tracking-tight text-gray-900">Fooder</div>
            <div className="text-xs font-semibold text-gray-500">Curated meals, fast.</div>
          </div>
        </div>

        {/* Navigation Links and Cart */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">
            <span
              className={`h-2 w-2 rounded-full ${
                onelineStatus ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
            {onelineStatus ? "Online" : "Offline"}
          </Badge>
          <Link className="chip hover:bg-white" to="/">Home</Link>
          <Link className="chip hover:bg-white" to="/about">About</Link>
          <Link className="chip hover:bg-white" to="/contact">Contact</Link>
          <Link className="chip hover:bg-white" to="/grocery">Grocery</Link>
          <Link className="chip bg-black text-white hover:bg-black/90" to="/cart">
            Cart ({cartItems.length})
          </Link>

          {/* Sign-in/Sign-out Button */}
          {user ? (
            <>
              <Badge variant="accent" size="sm">
                Signed in
              </Badge>
              <Button variant="secondary" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={toggleDrawer}>
              Sign in
            </Button>
          )}

          {/* Logged In User */}
          {loggedInUser && (
            <div className="hidden text-sm font-semibold text-gray-700 md:block">
              {loggedInUser}
            </div>
          )}
          {user?.email && (
            <div className="hidden text-xs font-semibold text-gray-500 md:block">
              {user.email}
            </div>
          )}
        </div>
      </Container>

      {/* Drawer */}
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
}

export default Header;

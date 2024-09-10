import { useContext, useState } from 'react';
import { LOGO_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';
// import useOnlineStatus from '../../utils/useOnlineStatus';
// import UserContext from '../../utils/UserContext';
import { useSelector } from 'react-redux';
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';

export const Header = () => {
  
  //const btnName = "Login"
  
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const onelineStatus = useOnlineStatus();

  const {loggedInUser} = useContext(UserContext)

  const cartItems = useSelector((store) => store.cart.items);

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
            <button className="login" onClick={() => {
             btnNameReact === "Login" 
             ? setbtnNameReact("Logout") 
             : setbtnNameReact("Login");
              
            }}>
              {btnNameReact}
              </button>
              <li className="px-4 font-bold">
                  { loggedInUser }
              </li>
          </ul>
        </div>
    </div>
  );
}

export default Header;

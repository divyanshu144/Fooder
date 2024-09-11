import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import UserContext from './utils/UserContext';
import ResBody from './components/Restaurants/ResBody';
import Contact from './components/Header/Contact';
import RestaurantMenu from './components/Restaurants/RestaurantMenu';
import appStore from './utils/appStore';
import Cart from './components/Restaurants/Cart';

const Grocery = lazy( () => import("./components/Grocery/Grocery"))
// here this lazy loading will let us to display the grocery component only when user clicks on it 
// it will aslo create separate bundle file for whole Grocery component and another bundle file with rest of code in the app

function App() {

  const [userName, setUserName] = useState();

  useEffect( () => {
    const data = {
      name: "Fooder"
    };
    setUserName(data.name);

  }, [])
  

  return (
    <>
      <div>
      {/* here <UserContext.Provider></UserContext.Provider> is used to pass dynamic data to all the components if required   */}
      <Provider store={appStore}>
        <UserContext.Provider value={ {loggedInUser: userName, setUserName} }>
          <Header/>
          <Outlet /> 
{/* whenever there is change is path, there will be change in outlet according to path. i.e outlet will be filled with path whichever is chosen */}
        </UserContext.Provider>
        </Provider>
        
    </div>
    </>
  )
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <ResBody/>,

      },
      // {
      //   path: "/about",
      //   element: <About/>,
      // },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery/>
        </Suspense>
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu/>
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    // errorElement: <Error/>,
  },
])

export default App

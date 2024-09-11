import { Link } from 'react-router-dom';
import Shimmer from '../Shimmer';
import Rescard, { withPromotedLabel } from './Rescard';


import { useContext, useEffect, useState } from 'react';  //named Import
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';
import TopRestaurants from './TopRestaurants';

function ResBody() {

  // state variable --> super powerful variable

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [topRest, setTopRest] = useState([])

  const RestaurantCardPromoted = withPromotedLabel(Rescard);

  const [searchText, setSearchText] = useState("");

  const {loggedInUser, setUserName} = useContext(UserContext)

  useEffect( () => {
       fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.7014249&lng=74.8595914&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();
     console.log(json);

    //optional chaining
    setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setTopRest(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

     //console.log("resbody", json?.data)
  };


  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return <h1>Looks like you are offline!! Please check your conncetion;</h1>

    return listOfRestaurants?.length === 0 ? (
        <Shimmer/> 
      ) : (
        <div className="body">
          <div className="filter flex m-4 p-4 ml-16 flex items-center space-x-12 bg-white  rounded-lg">
          <div className="search space-x-4 ">
              <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search restaurants..."
                  value={searchText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchText(value);

                    if (value.trim() === "") {
                      setFilteredRestaurant(listOfRestaurants);
                    } else {
                      const filteredRestaurant = listOfRestaurants.filter((res) =>
                        res.info.name.toLowerCase().includes(value.toLowerCase())
                      );
                      setFilteredRestaurant(filteredRestaurant);
                    }
                  }}
                />
                <button
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    if (searchText.trim() === "") {
                      setFilteredRestaurant(listOfRestaurants);
                    } else {
                      const filteredRestaurant = listOfRestaurants.filter((res) =>
                        res.info.name.toLowerCase().includes(searchText.toLowerCase())
                      );
                      setFilteredRestaurant(filteredRestaurant);
                    }
                  }}
                >
                  Search
              </button>
            </div>

                {/* <div className='m-4 p-4 flex items-center'>
                    <button className="px-4 py-2 bg-blue-200 rounded-xl" 
                      onClick={() => {
                      // filter logic here
                      const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4
                  );
                  setListOfRestaurants(filteredList); 
                  }}>
                  Top Rated Restaurants</button>
                </div> */}
              <div className="flex items-center space-x-4 ">
                  <label className="text-gray-700 font-semibold bg-red-500 text-white px-4 py-2 rounded-full">
                    Username:
                  </label>
                  <input
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={loggedInUser}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your username"
                  />
              </div>
          </div>
          <div className="ml-16">
            <div>
              <TopRestaurants topResData={topRest}/>
            </div>
            <hr className="border border-custom-rgba m-[32px] w-[87%]"/>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-6 ml-6">Restaurants with online food delivery</h2>
              <div className="flex flex-wrap ">
                  {
                      filteredRestaurant?.map((restaurant) => (
                      <Link 
                        key={restaurant?.info?.id} 
                        to={"/restaurants/"+ restaurant?.info?.id }>
                          {/* if the restaurant is promoted then add a promotion label to it */

                            restaurant?.info?.promoted ? (
                              <RestaurantCardPromoted resData={restaurant?.info}/>
                            ) :( 
                                <Rescard  resData={restaurant?.info}/>
                            )
                          }
                      </Link>
                      ))
                  }
              </div>
            </div>

          </div>
        </div>
    );

}

export default ResBody;
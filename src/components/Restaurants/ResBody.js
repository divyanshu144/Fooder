import { Link } from 'react-router-dom';
import Shimmer from '../Shimmer';
import Rescard, { withPromotedLabel } from './Rescard';


import { useContext, useEffect, useState } from 'react';  //named Import
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';

function ResBody() {

  // state variable --> super powerful variable

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const RestaurantCardPromoted = withPromotedLabel(Rescard);

  const [searchText, setSearchText] = useState("");

  const {loggedInUser, setUserName} = useContext(UserContext)

  useEffect( () => {
       fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();
     console.log(json);

    //optional chaining
    setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setFilteredRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  };

  //console.log(listOfRestaurants);

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return <h1>Looks like you are offline!! Please check your conncetion;</h1>

  // Conditional Rendering
    // if(listOfRestaurants.length === 0) {
    //   return <Shimmer/>
    // }

    return listOfRestaurants?.length === 0 ? (
        <Shimmer/> 
      ) : (
        <div className="body">
          <div className="filter flex">
            <div className="search m-4 p-4">
                <input type="text" className="border border-solid border-black" 
                value={searchText} 
                onChange={(e) => {
                  setSearchText(e.target.value);
                }} />
                <button className="px-4 py-2 bg-green-100 m-4 rounded-xl"
                  onClick={() => {
                  // filter the restaurant cards and update the UI
                 const filteredRestaurant = listOfRestaurants.filter(
                   (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                  );
                  setFilteredRestaurant(filteredRestaurant);

                }}>
                  Search</button>
            </div>
                <div className='m-4 p-4 flex items-center'>
                    <button className="px-4 py-2 bg-blue-200 rounded-xl" 
                      onClick={() => {
                      // filter logic here
                      const filteredList = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4
                  );
                  setListOfRestaurants(filteredList); 
                  }}>
                  Top Rated Restaurants</button>
                </div>
                <div className='m-4 p-4 flex items-center'>
                  <label className="px-4 bg-red-400 rounded-xl">username: </label>
                    <input 
                      className="border border-solid border-black m-2 p-[5px] rounded-lg"
                      value={loggedInUser}
                      onChange={( (e) => setUserName(e.target.value))} 
                    />
                </div>
          </div>
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
    );

}

export default ResBody;
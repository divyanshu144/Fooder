import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CDN_URL } from "../../utils/constants";
import { Link } from "react-router-dom";



const TopRestaurants = (props) => {

    const { topResData } = props;

    //console.log("topResData", topResData)

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 4;

    const handleNext = () => {
        if (currentIndex + cardsPerPage < topResData.length) {
        setCurrentIndex(currentIndex + cardsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - cardsPerPage >= 0) {
        setCurrentIndex(currentIndex - cardsPerPage);
        }
    };

  return (
        <div className="p-6 rounded-lg ">
                {/* Arrows */}
            <div className="top-4 ml-[84%] flex space-x-2">
                <button 
                onClick={handlePrev} 
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
                disabled={currentIndex === 0}
                >
                <FaArrowLeft />
                </button>
                <button 
                onClick={handleNext} 
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
                disabled={currentIndex + cardsPerPage >= topResData.length}
                >
                <FaArrowRight />
                </button>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Top Restaurants</h2>
                {/* Card Container */}
            <div className="flex space-x-6 overflow-hidden">
                {topResData.slice(currentIndex, currentIndex + cardsPerPage).map((card) => (
                    <Link
                    key={card?.info?.id} 
                    to={"/restaurants/"+ card?.info?.id }
                    >
                        <div 
                        key={card.id} 
                        className="w-[300px] h-[300px] bg-white p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <img
                                className="w-full h-2/3 object-cover rounded-t-xl"
                                alt="res-logo"
                                src={CDN_URL + card.info.cloudinaryImageId}
                            />
                            <div className="p-4">
                                <h3 className="font-gilroy font-bold text-lg text-gray-800 mb-2">{card.info.name}</h3>
                                <div className="flex items-center space-x-3 mb-2">
                                    <h4 className="text-gray-600 flex items-center space-x-1">
                                        <StarIcon className="h-5 w-5 text-green-500" />
                                        <span>{card.info.avgRating}</span>
                                    </h4>
                                    <h4 className="text-gray-600 font-bold text-sm">{card.info.sla.deliveryTime} min</h4>
                                </div>
                                <h4 className=" font-gilory font-semibold text-gray-600 mb-1 text-xs">{card.info.cuisines.slice(0, 3).join(", ")}</h4>
                                {/* <h4 className="text-gray-600 mb-1">Cost for two: {costForTwo}</h4>  */}
                                
                            </div>
                        </div>
                </Link>
                ))}
            </div>
        </div>
  );
};

export default TopRestaurants;

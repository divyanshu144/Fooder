import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CDN_URL, PLACEHOLDER_IMAGE } from "../../utils/constants";
import { Link } from "react-router-dom";
import { Card, Section } from "../../ui";



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

  if (!topResData || topResData.length === 0) {
    return null;
  }

  return (
    <Card size="lg">
      <Section
        title="Top Restaurants"
        actions={
          <>
            <button 
              onClick={handlePrev} 
              className="bg-white p-2 rounded-full border border-black/10 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <button 
              onClick={handleNext} 
              className="bg-white p-2 rounded-full border border-black/10 hover:bg-gray-100 disabled:opacity-50"
              disabled={currentIndex + cardsPerPage >= topResData.length}
            >
              <FaArrowRight />
            </button>
          </>
        }
      >
        <div className="mt-2 flex space-x-6 overflow-hidden">
          {topResData.slice(currentIndex, currentIndex + cardsPerPage).map((card) => (
            <Link
              key={card?.info?.id} 
              to={"/restaurants/"+ card?.info?.id }
            >
              <div 
                key={card.id} 
                className="w-[280px] h-[300px] bg-white p-5 border rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out hover:-translate-y-1"
              >
                <img
                  className="w-full h-2/3 object-cover rounded-t-xl"
                  alt="res-logo"
                  src={
                    card.info.cloudinaryImageId
                      ? CDN_URL + card.info.cloudinaryImageId
                      : PLACEHOLDER_IMAGE
                  }
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
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
      </Section>
    </Card>
  );
};

export default TopRestaurants;

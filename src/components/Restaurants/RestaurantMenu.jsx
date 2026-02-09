import Shimmer from "../Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import ResCategory from "./ResCategory";
import { useState } from "react";
import { Card, Container, Section } from "../../ui";

const RestaurantMenu = () => {

    const {resId} = useParams();

    // custom hook created for fetching the data from API
    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(null);
    
    if(resInfo === null) return <Shimmer/>

  console.log("resInfo", resInfo)

    const cards = resInfo?.data?.cards || [];
    const infoCard = cards.find((c) => c?.card?.card?.info)?.card?.card;
    const groupedCard = cards.find((c) => c?.groupedCard?.cardGroupMap)?.groupedCard;

    const {name, totalRatingsString, cuisines = [], costForTwoMessage, areaName, avgRating, sla = {}} =
      infoCard?.info || {};

    const categories = groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];


    return(
    <>
    <Container className="mt-8">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{name}</h1>

      {/* Details Section */}
      <Card className="mb-6" variant="solid" size="lg">
        <div className="flex items-center mb-3">
          <span className="flex items-center text-green-600 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18l6.16-3.242L10 2 3.84 14.758 10 18zM9 10.5l-1.174-.62-.622 1.174L10 13.5l3-6-2.5 1.32L9 10.5z"
                clipRule="evenodd"
              />
            </svg>
            {avgRating} ({totalRatingsString})
          </span>
          <span className="mx-3">•</span>
          <span className="text-gray-900 font-semibold">{costForTwoMessage}</span>
        </div>

        {/* Cuisines */}
        <div className="text-red-600 font-semibold mb-3">
        {cuisines.join(", ")}
        </div>

        {/* Outlet & Delivery Info */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c.28 0 .56-.02.83-.06a6 6 0 00-.77-1.84c-2.17-2.94-.95-7 2.36-7h0a5.92 5.92 0 00-1.56 6.15m0 0C7.24 8.5 4 10.5 4 13.5 4 15.8 6.15 18 9 18h6.33a5.6 5.6 0 01-.72-2.06"
              />
            </svg>
            Outlet: {areaName}
          </div>
          <div className="text-gray-600">•</div>
          <div className="text-gray-600">{sla.minDeliveryTime} - {sla.maxDeliveryTime} mins</div>
        </div>

        {/* Delivery Fee */}
        <div className="text-gray-500 text-sm">
          Order above ₹149 for discounted delivery fee
        </div>
      </Card>

      {/* Deals Section */}
      <Section title="Deals for you" size="sm">
      <div className="flex space-x-4">
        {/* First Deal */}
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 p-4 rounded-xl text-center shadow-sm border border-orange-100">
          <div className="text-blue-600 font-bold mb-2">Extra ₹15 Off</div>
          <div className="text-gray-600 text-xs">APPLICABLE OVER & ABOVE COUPONS</div>
        </div>

        {/* Second Deal */}
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-4 rounded-xl text-center shadow-sm border border-sky-100">
          <div className="text-orange-600 font-bold mb-2">Flat ₹125 Off</div>
          <div className="text-gray-600 text-xs">USE SUPERSAVER</div>
        </div>
      </div>
      </Section>

    <hr className="border border-custom-rgba mt-10 w-[60%] mx-auto"/>

    {/* =============================================================================================================================== */}
        <div className="mx-auto p-4 text-center mt-8">
            {categories.map( (category, index) => (
                // here ResCategory is controlled component because the parent is controlling this component
                <ResCategory 
                    key={category?.card?.card?.title} 
                    data={category?.card?.card} 
                    showItems={index === showIndex ? true : false }
                    setShowIndex = { () => (setShowIndex(index)) }
                    // here we are passing the function (i.e setShowIndex which belongs to parent) to the child component
                />
            )
             )}
        
        </div>
    </Container>
    </>
    )
}

export default RestaurantMenu

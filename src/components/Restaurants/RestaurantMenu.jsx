import Shimmer from "../Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import ResCategory from "./ResCategory";
import { useState } from "react";

const RestaurantMenu = () => {

    const {resId} = useParams();

    // custom hook created for fetching the data from API
    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);
    
    
    if(resInfo === null) return <Shimmer/>

    // const { name, cuisines, costForTwoMessage } = resInfo?.data?.cards[4]?.card?.card?.info;

    //const {itemCards} = resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    const categories = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => 
            c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )

    // console.log(categories)

    return(
        <div className="text-center">
            {/* <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p> */}
            {/* displaying all the restaurants in accordions form */}

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
    )
}

export default RestaurantMenu
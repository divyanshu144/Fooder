import { CDN_URL } from '../../utils/constants';
import { StarIcon } from '@heroicons/react/24/solid';


function Rescard(props) {

const {resData} = props;

const {
        cloudinaryImageId, 
        name, 
        cuisines, 
        avgRating, 
        costForTwo,

    } = resData;

    console.log("resData", resData)

    return (
        <div className="m-4 p-6 w-[300px] h-[400px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-500 ease-in-out">
            <img
                className="w-full h-2/3 object-cover rounded-t-xl"
                alt="res-logo"
                src={CDN_URL + cloudinaryImageId}
            />
            <div className="p-4">
                <h3 className="font-gilroy font-bold text-xl text-gray-800 mb-2">{name}</h3>
                <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-gray-600 flex items-center space-x-1">
                        <StarIcon className="h-5 w-5 text-green-500" />
                        <span>{avgRating}</span>
                    </h4>
                    <h4 className="text-gray-600 font-bold text-sm">{resData.sla.deliveryTime} minutes</h4>
                </div>
                <h4 className=" font-gilory text-gray-600 mb-1 text-sm">{cuisines.slice(0, 3).join(", ")}</h4>
                {/* <h4 className="text-gray-600 mb-1 flex items-center space-x-1">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <span>{avgRating}</span>
                </h4>
                 <h4 className="text-gray-600 mb-1">Cost for two: {costForTwo}</h4> 
                <h4 className="text-gray-600">{resData.sla.deliveryTime} minutes</h4> */}
            </div>
        </div>
    );
}

    // Higher order component

    //inpur - ResCard ==> ResCardPromoted(i.e same component but with some minor enhanced changes)

   export const withPromotedLabel = (Rescard) => {
        return (props) => {
            return (
                <div>
                    <label className="absolute bg-black text-white m-4 p-2 rounded-lg">Promoted</label>
                    <Rescard {...props} />
                </div>
            )
        }
    }


export default Rescard;




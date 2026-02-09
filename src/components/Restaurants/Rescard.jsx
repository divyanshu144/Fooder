import { CDN_URL, PLACEHOLDER_IMAGE } from '../../utils/constants';
import { StarIcon } from '@heroicons/react/24/solid';


function Rescard(props) {

const { resData, isFavorite, onToggleFavorite } = props;

const {
        cloudinaryImageId, 
        name, 
        cuisines, 
        avgRating, 
        costForTwo,

    } = resData;

    //console.log("resData", resData)

    const imageUrl = cloudinaryImageId ? CDN_URL + cloudinaryImageId : PLACEHOLDER_IMAGE;

    return (
    <>
        <div className="group m-4 w-[300px] h-[400px] rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 ease-in-out overflow-hidden border border-gray-100 hover:-translate-y-1">
            <div className="relative">
                <img
                    className="w-full h-[220px] object-cover transition duration-300 group-hover:scale-[1.02]"
                    alt="res-logo"
                    src={imageUrl}
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                <button
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-800"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleFavorite?.();
                    }}
                >
                    {isFavorite ? "Saved" : "Save"}
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{name}</h3>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <StarIcon className="h-5 w-5 text-green-500" />
                        <span>{avgRating}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                        {resData.sla.deliveryTime} mins
                    </span>
                </div>
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                    {cuisines.slice(0, 3).join(", ")}
                </h4>
                <p className="text-xs text-gray-500">{costForTwo}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-orange-600">
                    View menu
                    <span className="inline-block h-[1px] w-6 bg-orange-400" />
                </div>
            </div>
        </div>
    </>
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

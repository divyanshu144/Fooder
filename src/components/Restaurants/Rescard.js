import { CDN_URL } from '../../utils/constants';


function Rescard(props) {

const {resData} = props;

const {
        cloudinaryImageId, 
        name, 
        cuisines, 
        avgRating, 
        costForTwo,

    } = resData;

    return (
        <div className="m-4 p-4 w-[250px] h-[380px] rounded-lg bg-gray-100 hover:bg-gray-200" >
            <img
            className="rounded-lg"
            alt="res-logo"
            src={CDN_URL + cloudinaryImageId}
             />
             <h3 className="font-bold py-4 text-lg">{name}</h3>
             <h4>{cuisines.join(", ")}</h4>
             <h4>{avgRating} stars</h4>
             <h4>{costForTwo}</h4>
             <h4>{resData.sla.deliveryTime} minutes</h4>

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




import { CDN_URL } from "../../utils/constants";

const ItemList = ({ items }) => {
    //console.log(items)
    return (
        <div>
            {items.map( (item) => (
                <div key={item.id}
                    className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
                 >
                    <div className="w-9/12">
                        <div className="py-2">
                            <span>
                                {item.card.info.name} 
                            </span>
                            <span>
                                 - ₹ {item.card.info.price 
                                ? item.card.info.price/100 
                                : item.card.info.defaultPrice/100 }
                            </span>
                        </div>
                            <p classname="text-xs">
                                {item.card.info.description}
                            </p>
                    </div> 
                    <div className="w-3/12 p-4">
                        <img 
                            src={CDN_URL + item.card.info.imageId} 
                            alt="something"
                        />
                    </div>
                </div>
            ))}
           
        </div>
    )
}

export default ItemList;
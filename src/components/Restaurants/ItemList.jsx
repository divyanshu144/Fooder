import { useDispatch } from "react-redux";
//import { addItem }  from "../../utils/cartSlice";
import { CDN_URL, PLACEHOLDER_IMAGE } from "../../utils/constants";
import { addItem } from "../../utils/cartSlice";
import { Button } from "../../ui";

const ItemList = ({ items, dummy }) => {

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="m-2 border-b border-gray-200 pb-4 text-left flex justify-between gap-4"
        >
          <div className="w-9/12">
            <div className="py-2 flex items-center justify-between">
              <span className="font-semibold text-gray-900">{item.card.info.name}</span>
              <span className="text-sm font-semibold text-gray-700">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs text-gray-500">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-2 flex flex-col items-end gap-2">
            <img
              src={item.card.info.imageId ? CDN_URL + item.card.info.imageId : PLACEHOLDER_IMAGE}
              alt="menu item"
              className="w-full rounded-xl object-cover"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
            />
            <Button size="sm" onClick={() => handleAddItem(item)}>
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

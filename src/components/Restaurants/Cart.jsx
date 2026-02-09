import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItem, clearCart, removeItemById } from "../../utils/cartSlice";
import { CDN_URL, PLACEHOLDER_IMAGE } from "../../utils/constants";
import { Button, Card, Container } from "../../ui";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  console.log(cartItems);

  const dispatch = useDispatch();

  const groupedItems = cartItems.reduce((acc, item) => {
    const id = item?.card?.info?.id;
    if (!id) return acc;
    if (!acc[id]) acc[id] = { item, qty: 0 };
    acc[id].qty += 1;
    return acc;
  }, {});

  const cartLines = Object.values(groupedItems);

  const getItemPrice = (info) =>
    info?.price ? info.price / 100 : info?.defaultPrice / 100;

  const subtotal = cartLines.reduce(
    (sum, line) => sum + getItemPrice(line.item.card.info) * line.qty,
    0
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container className="text-center my-6">
      <h1 className="text-3xl font-bold">Cart</h1>
      <Card className="mx-auto mt-4 w-10/12 max-w-4xl" variant="solid" size="lg">
        <Button onClick={handleClearCart} size="sm">
          Clear Cart
        </Button>
        {cartItems?.length === 0 && (
          <h1 className="mt-6 text-gray-600">Cart is empty. Add items to get started.</h1>
        )}
        {cartItems?.length > 0 && (
          <div className="text-left mt-6 space-y-4">
            {cartLines.map(({ item, qty }) => (
              <div
                key={item.card.info.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.card.info.imageId
                        ? CDN_URL + item.card.info.imageId
                        : PLACEHOLDER_IMAGE
                    }
                    alt={item.card.info.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <div>
                    <div className="font-semibold">{item.card.info.name}</div>
                    <div className="text-sm text-gray-500">
                      ₹{getItemPrice(item.card.info)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="px-3 py-1 border rounded-lg"
                    onClick={() => dispatch(removeItemById(item.card.info.id))}
                  >
                    -
                  </button>
                  <span className="font-semibold">{qty}</span>
                  <button
                    className="px-3 py-1 border rounded-lg"
                    onClick={() => dispatch(addItem(item))}
                  >
                    +
                  </button>
                </div>
                <div className="font-semibold">
                  ₹{(getItemPrice(item.card.info) * qty).toFixed(0)}
                </div>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg pt-4">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default Cart;

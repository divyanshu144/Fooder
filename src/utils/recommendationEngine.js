export const buildProfile = ({ favorites = [], cartItems = [], restaurants = [] }) => {
  const favoriteRestaurants = restaurants.filter((r) =>
    favorites.includes(r?.info?.id)
  );
  const favoriteCuisines = favoriteRestaurants.flatMap(
    (r) => r?.info?.cuisines || []
  );
  const cartNames = cartItems.map((item) => item?.card?.info?.name).filter(Boolean);

  return {
    favoriteCuisines: Array.from(new Set(favoriteCuisines)).slice(0, 6),
    cartItems: cartNames.slice(0, 6),
  };
};

export const rankRestaurants = ({ restaurants = [], favorites = [] }) => {
  return restaurants
    .map((res) => {
      const rating = Number(res?.info?.avgRating || 0);
      const delivery = Number(res?.info?.sla?.deliveryTime || 45);
      const isFavorite = favorites.includes(res?.info?.id);
      const score = rating * 2 + (isFavorite ? 2.5 : 0) - delivery * 0.02;
      return { ...res, __score: score };
    })
    .sort((a, b) => b.__score - a.__score)
    .slice(0, 5);
};

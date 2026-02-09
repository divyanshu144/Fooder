import { Link } from 'react-router-dom';
import Shimmer from '../Shimmer';
import Rescard, { withPromotedLabel } from './Rescard';

import { useContext, useEffect, useMemo, useState } from 'react';  //named Import
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';
import TopRestaurants from './TopRestaurants';
import { Badge, Button, Card, Container, Input, Section, Select } from '../../ui';
import { mockRestaurants } from '../../utils/mockData';
import { useSelector } from 'react-redux';
import { buildProfile, rankRestaurants } from '../../utils/recommendationEngine';
import Recommendations from '../Recommendations/Recommendations';

function ResBody() {

  // state variable --> super powerful variable

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [topRest, setTopRest] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const RestaurantCardPromoted = withPromotedLabel(Rescard);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("fooder_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  const {loggedInUser, setUserName} = useContext(UserContext)
  const cartItems = useSelector((store) => store.cart.items);
  const [recItems, setRecItems] = useState([]);
  const [recReasons, setRecReasons] = useState({});
  const [recLoading, setRecLoading] = useState(false);

  useEffect( () => {
       fetchData();
  }, []);

  useEffect(() => {
    if (listOfRestaurants.length === 0) return;
    const ranked = rankRestaurants({ restaurants: listOfRestaurants, favorites });
    setRecItems(ranked);
  }, [listOfRestaurants, favorites]);

  useEffect(() => {
    if (recItems.length === 0) return;
    fetchReasons();
  }, [recItems]);

  const fetchReasons = async () => {
    if (recItems.length === 0) return;
    setRecLoading(true);
    try {
      const profile = buildProfile({
        favorites,
        cartItems,
        restaurants: listOfRestaurants,
      });
      const payload = {
        profile,
        items: recItems.map((r) => ({
          id: r?.info?.id,
          name: r?.info?.name,
          cuisines: r?.info?.cuisines,
          avgRating: r?.info?.avgRating,
          deliveryTime: r?.info?.sla?.deliveryTime,
          costForTwo: r?.info?.costForTwo,
        })),
      };

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setRecReasons(data.reasons || {});
      }
    } catch (err) {
      setRecReasons({});
    } finally {
      setRecLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    try {
      localStorage.setItem("fooder_favorites", JSON.stringify(favorites));
    } catch (err) {
      // Ignore storage errors
    }
  }, [favorites]);

  const extractRestaurantLists = (cards) => {
    if (!Array.isArray(cards)) return { list: [], top: [] };

    const withRestaurants = cards
      .map((c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      .filter(Boolean);

    const list = withRestaurants[0] || [];
    const top = withRestaurants[1] || withRestaurants[0] || [];

    return { list, top };
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.7014249&lng=74.8595914&page_type=DESKTOP_WEB_LISTING");
      if (!data.ok) throw new Error(`HTTP ${data.status}`);
      const json = await data.json();

      //optional chaining
      const { list: allRestaurants, top: topRestaurants } = extractRestaurantLists(json?.data?.cards);
      setListOfRestaurants(allRestaurants);
      setTopRest(topRestaurants);
    } catch (err) {
      setListOfRestaurants(mockRestaurants);
      setTopRest(mockRestaurants);
      setNotice("Live API unavailable. Showing demo data.");
    } finally {
      setLoading(false);
    }
  };


  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return <h1>Looks like you are offline!! Please check your conncetion;</h1>

  const parseCostForTwo = (costForTwo) => {
    const match = String(costForTwo || "").match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const filteredRestaurant = useMemo(() => {
    let data = [...listOfRestaurants];

    if (debouncedSearch) {
      data = data.filter((res) =>
        res.info.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (minRating > 0) {
      data = data.filter((res) => Number(res.info.avgRating) >= minRating);
    }

    if (maxDeliveryTime > 0) {
      data = data.filter(
        (res) => res.info?.sla?.deliveryTime <= maxDeliveryTime
      );
    }

    if (showFavoritesOnly) {
      data = data.filter((res) => favorites.includes(res.info.id));
    }

    if (sortBy === "rating") {
      data.sort((a, b) => Number(b.info.avgRating) - Number(a.info.avgRating));
    } else if (sortBy === "delivery") {
      data.sort((a, b) => a.info?.sla?.deliveryTime - b.info?.sla?.deliveryTime);
    } else if (sortBy === "cost") {
      data.sort(
        (a, b) =>
          parseCostForTwo(a.info.costForTwo) -
          parseCostForTwo(b.info.costForTwo)
      );
    }

    return data;
  }, [
    listOfRestaurants,
    debouncedSearch,
    minRating,
    maxDeliveryTime,
    sortBy,
    showFavoritesOnly,
    favorites,
  ]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (loading) return <Shimmer />;
  if (error && listOfRestaurants.length === 0) {
    return (
      <div className="mt-20 text-center">
        <p className="text-lg font-semibold text-gray-800">{error}</p>
        <button
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
          onClick={fetchData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="body mt-10">
      <Container>
        <Card className="mb-10 rounded-3xl motion-fade" size="lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="section-title">Discover food you actually crave</h1>
              <p className="mt-2 max-w-xl text-sm text-gray-600">
                Handpicked restaurants, smart filters, and fast delivery estimates so you can decide quickly.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge size="sm">Fast delivery</Badge>
                <Badge size="sm">Top rated</Badge>
                <Badge size="sm">Curated picks</Badge>
              </div>
              {notice && (
                <p className="mt-3 text-xs font-semibold text-orange-600">
                  {notice}
                </p>
              )}
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-rose-500 px-6 py-4 text-white shadow-lg">
                <div className="text-xs uppercase tracking-[0.2em]">Today’s pick</div>
                <div className="mt-2 text-xl font-bold">Chef’s Special Combos</div>
                <div className="mt-1 text-xs text-white/80">Save up to 30% on select menus</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="sticky top-[76px] z-10 motion-fade" size="md">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[240px]">
              <Input
                type="text"
                placeholder="Search restaurants..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} size="sm">
              <option value="relevance">Sort: Relevance</option>
              <option value="rating">Sort: Rating</option>
              <option value="delivery">Sort: Delivery Time</option>
              <option value="cost">Sort: Cost for Two</option>
            </Select>

            <Select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} size="sm">
              <option value={0}>Rating: Any</option>
              <option value={4}>Rating: 4.0+</option>
              <option value={4.5}>Rating: 4.5+</option>
            </Select>

            <Select
              value={maxDeliveryTime}
              onChange={(e) => setMaxDeliveryTime(Number(e.target.value))}
              size="sm"
            >
              <option value={0}>Delivery: Any</option>
              <option value={25}>Under 25 min</option>
              <option value={35}>Under 35 min</option>
              <option value={45}>Under 45 min</option>
            </Select>

            <Button
              variant={showFavoritesOnly ? "primary" : "outline"}
              onClick={() => setShowFavoritesOnly((prev) => !prev)}
              size="sm"
            >
              {showFavoritesOnly ? "Showing Saved" : "Show Saved"}
            </Button>

            <div className="ml-auto flex items-center space-x-2">
              <Badge variant="solid" size="sm">Username</Badge>
              <Input
                className="w-[200px]"
                value={loggedInUser}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
                size="sm"
              />
            </div>
          </div>
        </Card>

        <Section size="md">
          <TopRestaurants topResData={topRest}/>
        </Section>

        <Recommendations
          items={recItems}
          reasons={recReasons}
          loading={recLoading}
          onRefresh={fetchReasons}
        />

        <hr className="border border-custom-rgba my-10"/>

        <Section
          title="Restaurants with online food delivery"
          actions={<span className="text-sm text-gray-500">{filteredRestaurant.length} results</span>}
        >
          {filteredRestaurant.length === 0 ? (
            <div className="text-center mt-12 text-gray-600">
              No restaurants match your filters. Try adjusting them.
            </div>
          ) : (
            <div className="flex flex-wrap motion-stagger">
              {filteredRestaurant?.map((restaurant) => (
                <Link
                  key={restaurant?.info?.id}
                  to={"/restaurants/" + restaurant?.info?.id}
                >
                  {/* if the restaurant is promoted then add a promotion label to it */}
                  {restaurant?.info?.promoted ? (
                    <RestaurantCardPromoted
                      resData={restaurant?.info}
                      isFavorite={favorites.includes(restaurant?.info?.id)}
                      onToggleFavorite={() =>
                        handleToggleFavorite(restaurant?.info?.id)
                      }
                    />
                  ) : (
                    <Rescard
                      resData={restaurant?.info}
                      isFavorite={favorites.includes(restaurant?.info?.id)}
                      onToggleFavorite={() =>
                        handleToggleFavorite(restaurant?.info?.id)
                      }
                    />
                  )}
                </Link>
              ))}
            </div>
          )}
        </Section>
      </Container>
    </div>
  );

}

export default ResBody;

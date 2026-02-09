import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";
import { groceryCategories, groceryItems } from "../../utils/groceryData";
import { Badge, Button, Card, Container, Input, Section, Select } from "../../ui";
import { PLACEHOLDER_IMAGE } from "../../utils/constants";

const Grocery = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [onlyQuick, setOnlyQuick] = useState(false);
  const dispatch = useDispatch();

  const filteredItems = useMemo(() => {
    let data = [...groceryItems];

    if (query.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter((item) => item.category === category);
    }

    if (onlyQuick) {
      data = data.filter((item) => item.tags.includes("Quick"));
    }

    if (sortBy === "priceLow") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      data.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [query, category, sortBy, onlyQuick]);

  const handleAddToCart = (item) => {
    dispatch(
      addItem({
        card: {
          info: {
            id: item.id,
            name: item.name,
            price: item.price * 100,
            defaultPrice: item.price * 100,
            imageId: item.imageId,
            description: item.description,
          },
        },
      })
    );
  };

  return (
    <Container className="mt-10">
      <Card size="lg" className="motion-fade">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge size="sm">Grocery</Badge>
            <h1 className="section-title mt-3">Everything you need, delivered</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Fresh produce, pantry essentials, and curated kits for quick meals.
              Built as a dedicated experience to show lazy‑loaded routes.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-lime-500 p-5 text-white shadow-lg">
            <p className="text-xs uppercase tracking-[0.25em]">Daily Picks</p>
            <p className="mt-2 text-lg font-bold">Green bundle · 25% off</p>
            <p className="mt-2 text-xs text-white/80">Fruits, greens, and staples</p>
          </div>
        </div>
      </Card>

      <Section title="Shop groceries" subtitle="Search, filter, and add in one place.">
        <Card variant="solid" size="md" className="flex flex-wrap gap-3 md:items-center">
          <Input
            placeholder="Search by item or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-[220px] flex-1"
          />
          <Select value={category} onChange={(e) => setCategory(e.target.value)} size="sm">
            <option value="All">All categories</option>
            {groceryCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} size="sm">
            <option value="popular">Sort: Popular</option>
            <option value="rating">Sort: Rating</option>
            <option value="priceLow">Sort: Price (Low)</option>
            <option value="priceHigh">Sort: Price (High)</option>
          </Select>
          <Button
            variant={onlyQuick ? "primary" : "outline"}
            size="sm"
            onClick={() => setOnlyQuick((prev) => !prev)}
          >
            {onlyQuick ? "Quick meals" : "Show quick meals"}
          </Button>
          <Badge size="sm">{filteredItems.length} items</Badge>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} variant="outline" size="md" className="flex flex-col">
              <img
                src={item.imageId ? item.imageId : PLACEHOLDER_IMAGE}
                alt={item.name}
                className="h-40 w-full rounded-xl object-cover"
              />
              <div className="mt-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <Badge size="sm">★ {item.rating}</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                  <p className="text-xs text-gray-500">{item.unit}</p>
                </div>
                <Button size="sm" onClick={() => handleAddToCart(item)}>
                  Add to cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </Container>
  );
};

export default Grocery;

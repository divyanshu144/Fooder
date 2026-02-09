export const mockRestaurants = [
  {
    info: {
      id: "m1",
      name: "Saffron Street",
      cuisines: ["North Indian", "Biryani", "Kebabs"],
      avgRating: 4.5,
      costForTwo: "₹350 for two",
      promoted: true,
      cloudinaryImageId: "xjhw5keww8nq9o2wz9dy",
      sla: { deliveryTime: 22 },
    },
  },
  {
    info: {
      id: "m2",
      name: "Green Bowl Co.",
      cuisines: ["Salads", "Healthy", "Bowls"],
      avgRating: 4.3,
      costForTwo: "₹300 for two",
      promoted: false,
      cloudinaryImageId: "ltt4n2wl9t8bqfwdw3cb",
      sla: { deliveryTime: 28 },
    },
  },
  {
    info: {
      id: "m3",
      name: "Slice District",
      cuisines: ["Pizza", "Italian", "Fast Food"],
      avgRating: 4.2,
      costForTwo: "₹400 for two",
      promoted: false,
      cloudinaryImageId: "o8z8bz4r1m7jrrgqkq9y",
      sla: { deliveryTime: 30 },
    },
  },
  {
    info: {
      id: "m4",
      name: "Seoul Fire",
      cuisines: ["Korean", "BBQ", "Asian"],
      avgRating: 4.6,
      costForTwo: "₹450 for two",
      promoted: false,
      cloudinaryImageId: "h2nks5wunxk1xqbf5bqg",
      sla: { deliveryTime: 26 },
    },
  },
];

export const mockMenu = {
  data: {
    cards: [
      {
        card: {
          card: {
            info: {
              name: "Saffron Street",
              totalRatingsString: "1K+ ratings",
              cuisines: ["North Indian", "Biryani", "Kebabs"],
              costForTwoMessage: "₹350 for two",
              areaName: "Downtown",
              avgRating: 4.5,
              sla: { minDeliveryTime: 20, maxDeliveryTime: 30 },
            },
          },
        },
      },
      {
        groupedCard: {
          cardGroupMap: {
            REGULAR: {
              cards: [
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Recommended",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: "i1",
                              name: "Chicken Biryani",
                              description: "Aromatic basmati rice with tender chicken.",
                              price: 25900,
                              imageId: "qv5t4pqh3q7v1ez8k4e9",
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: "i2",
                              name: "Paneer Tikka",
                              description: "Smoky, spiced cottage cheese cubes.",
                              price: 21900,
                              imageId: "g1x9y6twv3m5d8m9q3k1",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  },
};

import { createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Redux Toolkit uses immer BTS
      state.items.push(action.payload);
    },
    removeItemById: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex(
        (item) => item?.card?.info?.id === id
      );
      if (index !== -1) state.items.splice(index, 1);
    },
    //originalState = {items: ["pizza"]}
    clearCart: (state, action) => {
      //RTK - either Mutate the existing  state or return a new State
      // state.items.length = 0; // originalState = []

      return { items: [] }; // this new object will be replaced inside originalState = { items: [] }
    },
  },
});

export const { addItem, removeItemById, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

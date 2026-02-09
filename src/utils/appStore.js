import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("fooder_state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({ cart: state.cart });
    localStorage.setItem("fooder_state", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const appStore = configureStore({
  preloadedState: loadState(),
  reducer: {
    cart: cartReducer,
    user: userReducer
  },
});

appStore.subscribe(() => saveState(appStore.getState()));

export default appStore;

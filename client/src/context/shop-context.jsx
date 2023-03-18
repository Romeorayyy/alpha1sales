import { createContext, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const defaultCart = Object.fromEntries(PRODUCTS.map(product => [product.id, 0]));

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(defaultCart);

  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce(
      (total, [itemId, quantity]) =>
        total + PRODUCTS.find((product) => product.id === Number(itemId)).price * quantity,
      0
    );

  const addToCart = (itemId) =>
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

  const removeFromCart = (itemId) =>
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

  const updateCartItemCount = (newAmount, itemId) =>
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));

  const checkout = () => {
    setCartItems(defaultCart);
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

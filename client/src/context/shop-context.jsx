import { createContext, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const defaultCart = Object.fromEntries(PRODUCTS.map(product => {
  const defaultOption = product.options.find(option => option.name === product.defaultOptionName);
  return [product.id, { quantity: 0, price: defaultOption ? defaultOption.price : product.price }];
}));


export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(defaultCart);

  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce(
      (total, [itemId, {quantity, price}]) =>
        total + PRODUCTS.find((product) => product.id === Number(itemId)).price * quantity,
      0
    );

    const addToCart = (itemId, selectedOption, quantity = 1) => {
      const currentItem = cartItems[itemId];
      const price = selectedOption ? selectedOption.price : currentItem.price;
      setCartItems((prev) => ({
        ...prev,
        [itemId]: { quantity: currentItem.quantity + quantity, price },
      }));
    };    
         
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: {quantity: prev[itemId].quantity - 1, price: prev[itemId].price} }));
  };

  const updateCartItemCount = (newAmount, itemId) =>
    setCartItems((prev) => ({ ...prev, [itemId]: {quantity: newAmount, price: prev[itemId].price} }));

  const checkout = () => {
    setCartItems(defaultCart);
  };

  const incrementCartItem = (itemId, selectedOption) => {
    addToCart(itemId, selectedOption, 1);
  };
  

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    incrementCartItem,
    getTotalCartAmount,
    checkout,
  };
  

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

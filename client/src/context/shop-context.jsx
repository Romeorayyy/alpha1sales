import { createContext, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const getTotalCartAmount = () =>
    Object.values(cartItems).reduce(
      (total, { quantity, option }) => total + option.price * quantity,
      0
    );

    const addToCart = (productId, selectedOption, quantity = 1) => {
      setCartItems((prevCartItems) => {
        const updatedCartItems = { ...prevCartItems };
        const productKey = `${productId}_${selectedOption ? selectedOption.name : "default"}`;
    
        if (updatedCartItems[productKey]) {
          updatedCartItems[productKey].quantity += quantity;
        } else {
          updatedCartItems[productKey] = {
            id: productId,
            optionName: selectedOption.name, // Add this line
            option: selectedOption,
            quantity,
          };
        }
    
        return updatedCartItems;
      });
    };
    

  const removeFromCart = (productId, selectedOption) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      const productKey = `${productId}_${selectedOption.name}`;

      if (updatedCartItems[productKey]) {
        updatedCartItems[productKey].quantity -= 1;
        if (updatedCartItems[productKey].quantity <= 0) {
          delete updatedCartItems[productKey];
        }
      }

      return updatedCartItems;
    });
  };

  const updateCartItemCount = (newAmount, productId, selectedOption) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      const productKey = `${productId}_${selectedOption.name}`;

      if (newAmount <= 0) {
        delete updatedCartItems[productKey];
      } else {
        updatedCartItems[productKey].quantity = newAmount;
      }

      return updatedCartItems;
    });
  };

  const checkout = () => {
    setCartItems({});
  };

  const incrementCartItem = (productId, selectedOption) => {
    addToCart(productId, selectedOption, 1);
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

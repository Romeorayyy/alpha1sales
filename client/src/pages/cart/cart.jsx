import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "../cart/cart-item";
import { PRODUCTS } from "../../products";
import CheckoutForm from "../checkoutform/CheckoutForm"; // import the CheckoutForm component
import "./cart.css";

const Cart = () => {
  const { cartItems, getTotalCartAmount, removeFromCart } = useContext(ShopContext);

  if (getTotalCartAmount() === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <button onClick={() => window.location.href = '/'}>Continue shopping</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        {Object.entries(cartItems).map(([itemId, quantity]) => {
          if (quantity === 0) {
            return null;
          }

          const product = PRODUCTS.find((product) => product.id === Number(itemId));
          return <CartItem key={itemId} data={{ ...product, quantity }} />;
        })}
      </div>
      <div className="cart-total">
        <h2>Total: ${getTotalCartAmount().toFixed(2)}</h2>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Cart;

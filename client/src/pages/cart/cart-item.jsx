import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import "./cart.css";

export const CartItem = (props) => {
  const { id, productName, productImage, options } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  const item = props.item;
  const selectedOption = options.find(option => option.name === item.optionName) || { name: "N/A", price: 0 };
  const price = selectedOption.price;
  const quantity = item.quantity;

  return (
    <div className="cartItem">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>
          <b>Option:</b> {selectedOption.name}
        </p>
        <p>
          <b>Quantity:</b>
          {quantity}
        </p>
        <p style={{display: "none"}}> Price: ${price.toFixed(2)}</p>
      </div>
      <div className="countHandler">
        <button onClick={() => removeFromCart(id, selectedOption)}> - </button>
        <input
          value={quantity}
          onChange={(e) => updateCartItemCount(Number(e.target.value), id, selectedOption)}
        />
        <button onClick={() => addToCart(id, selectedOption)}> + </button>
      </div>
    </div>
  );  
};

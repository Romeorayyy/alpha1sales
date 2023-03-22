import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, productImage, options } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  const price = cartItems[id].price;
  const quantity = cartItems[id].quantity;

  const selectedOption = options.find((option) => option.price === price);

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

        <p> Price: ${price.toFixed(2)}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={quantity}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id, selectedOption)}> + </button>
        </div>
      </div>
    </div>
  );
};

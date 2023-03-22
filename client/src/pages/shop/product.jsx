import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id].quantity;

  const defaultOption = props.data.options.find(
    (option) => option.name === props.data.defaultOptionName
  );
  const displayPrice = defaultOption ? defaultOption.price : price;

  return (
    <div className="product">
      <Link to={`/product/${id}`}>
        <img src={productImage} />
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p> ${displayPrice}</p>
        </div>
      </Link>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};

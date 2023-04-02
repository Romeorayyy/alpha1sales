import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const defaultOption = props.data.options.find(
    (option) => option.name === props.data.defaultOptionName
  );
  const displayPrice = defaultOption ? defaultOption.price : price;

  const productKey = `${id}_${defaultOption ? defaultOption.name : "default"}`;
  const cartItemCount = cartItems[productKey]?.quantity || 0;

  return (
  <>
    <div className="product">
      <Link style={{color: "black"}} to={`/product/${id}`}>
        <img src={productImage} />
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p style={{display: "none"}}> ${displayPrice}</p>
        </div>
      </Link>
      <button className="addToCartBttn" onClick={() => addToCart(id, defaultOption)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  </>
  );
};

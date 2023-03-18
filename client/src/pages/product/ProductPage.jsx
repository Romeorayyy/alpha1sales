import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const navigate = useNavigate();
  const { cartItems, addToCart, updateCartItemCount, removeFromCart } = useContext(ShopContext);
  const cartItemCount = cartItems[id];

  if (!product) return <h2>Product not found.</h2>;

  const handleBuyNowClick = () => {
    if (cartItemCount === 0) addToCart(Number(id));
    navigate("/cart");
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.productCard}>
        <img src={product.productImage} alt={product.name} />
        <h3>{product.productName}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <div className={styles.quantityControl}>
          <button onClick={() => removeFromCart(product.id)}>-</button>
          <input
            type="number"
            value={cartItems[product.id]}
            onChange={(e) => updateCartItemCount(parseInt(e.target.value), product.id)}
          />
          <button onClick={() => addToCart(product.id)}>+</button>
        </div>
        <div>
          <button className={styles.addToCartBttn} onClick={() => addToCart(Number(id))}>
            Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
          </button>
          <button className={styles.addToCartBttn} onClick={handleBuyNowClick}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

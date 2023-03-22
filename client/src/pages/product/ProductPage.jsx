import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, updateCartItemCount, removeFromCart, incrementCartItem } = useContext(ShopContext);
  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedOption, setSelectedOption] = useState(() => {
    if (product && product.options) {
      const defaultOption = product.options.find(option => option.name === product.defaultOptionName);
      return defaultOption || product.options[0];
    }
    return null;
  });

  if (!product) return <h2>Product not found.</h2>;

  const handleBuyNowClick = () => {
    incrementCartItem(Number(id), selectedOption);
    navigate("/cart");
  };

  const handleOptionChange = (e) => {
    const optionName = e.target.value;
    setSelectedOption(product.options.find((option) => option.name === optionName));
  };  

  const renderAdditionalInfo = () => {
    const { additionalinfotitle1, additionalinfodescription1, additionalinfotitle2, additionalinfodescription2, additionalinfotitle3, additionalinfodescription3, additionalinfotitle4, additionalinfodescription4 } = product;

    return (
      <div className={styles.additionalInfo}>
        {additionalinfotitle1 && (
          <div>
            <h4>{additionalinfotitle1}</h4>
            <div dangerouslySetInnerHTML={{__html: additionalinfodescription1}}></div>
          </div>
        )}
        {additionalinfotitle2 && (
          <div>
            <h4>{additionalinfotitle2}</h4>
            <div dangerouslySetInnerHTML={{__html: additionalinfodescription2}}></div>
          </div>
        )}
        {additionalinfotitle3 && (
          <div>
            <h4>{additionalinfotitle3}</h4>
            <div dangerouslySetInnerHTML={{__html: additionalinfodescription3}}></div>
          </div>
        )}
        {additionalinfotitle4 && (
          <div>
            <h4>{additionalinfotitle4}</h4>
            <div dangerouslySetInnerHTML={{__html: additionalinfodescription4}}></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.productCard}>
        <img src={product.productImage} alt={product.productName} />
        <h3>{product.productName}</h3>
        <div dangerouslySetInnerHTML={{__html: product.description}}></div>
        <p>
        <b>Price:</b> ${selectedOption.price.toFixed(2)}</p>
        <p>Price: ${selectedOption ? selectedOption.price.toFixed(2) : product.price.toFixed(2)}</p>
        {product.options && (
          <div className={styles.optionSelector}>
            <label htmlFor="productOptions">Choose an option:</label>
            <select
              name="productOptions"
              id="productOptions"
              value={selectedOption ? selectedOption.name : ""}
              onChange={handleOptionChange}
            >
              {product.options.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>

      </div>
    )}
    <div className={styles.quantityControl}>
    <button onClick={() => removeFromCart(product.id, selectedOption)}>-</button>
      <input 
        type="number" 
        value={cartItems[product.id]?.quantity || 0}
        onChange={(e) => updateCartItemCount(parseInt(e.target.value), product.id)} />
      <button onClick={() => addToCart(product.id, selectedOption)}>+</button>
    </div>
    <div>
      <button
        className="addToCartBttn"
        onClick={() => {
          incrementCartItem(id, selectedOption);
        }}
      >
        Add to Cart
      </button>
      <button className={styles.addToCartBttn} onClick={handleBuyNowClick}>
        Buy Now
      </button>
    </div>
    {renderAdditionalInfo()}
  </div>
</div>
);
};

export default ProductPage;


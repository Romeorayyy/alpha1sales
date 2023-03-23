import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import FullScreenVideo from "../../components/fullscreenvideo/FullScreenVideo.jsx";
import "../../App.css"

export const Shop = () => {
  return (
    <div className="shop">
      <FullScreenVideo />
      <div className="shopTitle">
        <h1>Alpha1Sales</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

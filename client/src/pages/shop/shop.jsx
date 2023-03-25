import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import FullScreenVideo from "../../components/fullscreenvideo/FullScreenVideo";
import logo from "../../assets/logo-alpha1sales.png"
import "../../App.css"

export const Shop = () => {
  return (
    <div className="shop">
      <FullScreenVideo />
      <div className="shopTitle">
        <img style={{width: "20rem"}} src={logo} alt="logo for alpha1sales" />
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

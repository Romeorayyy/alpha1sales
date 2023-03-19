import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import "../../App.css"


const CheckoutForm = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = getTotalCartAmount();

    const payload = {
      name,
      email,
      phoneNumber,
      cartItems,
      totalAmount,
    };

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        checkout();
        navigate("/thankyou");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="checkout-form">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="phone-number">Phone number:</label>
        <input
          type="tel"
          id="phone-number"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckoutForm;

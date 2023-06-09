import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import './CheckoutForm.css';
import { PRODUCTS } from "../../products";

const CheckoutForm = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const cartItemsWithDetails = Object.entries(cartItems).reduce((acc, [itemId, itemData]) => {
    const product = PRODUCTS.find((product) => product.id === Number(itemId.split('_')[0]));
    acc[itemId] = { ...product, ...itemData };
    return acc;
  }, {});  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = getTotalCartAmount();

    const payload = {
      firstName,
      lastName,
      taxId,
      companyName,
      email,
      phoneNumber,
      address,
      cartItems: cartItemsWithDetails,
      totalAmount,
    };

    try {
      const response = await fetch("/api/send-email", {
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
      console.error("Error details:", error.message);
    }
  };

  return (
    <div className="checkout-form">
      <h1>Request Wholesale Pricing</h1>
      <small>Alpha1Sales only sells to authorized businesses. Fill out this form to request pricing. We'll review your request and get back to you. Thanks for your interest!</small>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          placeholder="Enter your name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          placeholder="Enter your name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="company-name">Company Name:</label>
        <input
          type="text"
          id="company-name"
          placeholder="Enter your company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <label htmlFor="tax-id">Tax Id Number:</label>
        <input
          type="number"
          id="tax-id"
          placeholder="Enter your Tax Id Number"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          required
          pattern="\d+"
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
          type="text"
          id="phone-number"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          pattern="\d+"
        />
        <label htmlFor="address">Shipping Address:</label>
        <input
          type="tel"
          id="address"
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
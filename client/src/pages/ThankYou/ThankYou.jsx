import React from "react";
import './thankyou.css'

const ThankYou = () => {
  return (
    <div className="thank-you-div">
      <h2>Thank you!</h2>
      <p>Your submission has been received. We'll be in touch soon.</p>
      <button className="back-home" onClick={() => (window.location.href = "/")}>
        Browse More Products
      </button>
    </div>
  );
};

export default ThankYou;


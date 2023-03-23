import React from 'react';
import './contact.css';

export const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Alpha1Sales</h2>
      <p>
        Alpha1Sales is a distributor and only sells to other authorized distributors. If you have any
        questions or feedback, feel free to send us a message.
      </p>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="phone">Phone number:</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};



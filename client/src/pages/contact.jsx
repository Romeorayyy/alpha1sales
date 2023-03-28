import React from 'react';
import './contact.css';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from 'react-router-dom';

export const Contact = () => {
  const [state, handleSubmit] = useForm("mpzejkkk");
  const navigate = useNavigate();

  if (state.succeeded) {
    navigate('/thankyou');
  }

  return (
    <div className="contact-container">
      <h2>Contact Alpha1Sales</h2>
      <p>
        Alpha1Sales is a distributor and only sells to other authorized distributors. If you have any
        questions or feedback, feel free to send us a message.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="phone">Phone number:</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button type="submit" disabled={state.submitting}>
          Send
        </button>
      </form>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo-alpha1sales.png'; 
import './agechecker.css';

const AgeCheck = () => {
  const [showAgeCheck, setShowAgeCheck] = useState(true);

  useEffect(() => {
    const ageCheckStatus = localStorage.getItem('ageCheckStatus');
    if (ageCheckStatus === 'accepted') {
      setShowAgeCheck(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ageCheckStatus', 'accepted');
    setShowAgeCheck(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    showAgeCheck && (
      <div className="age-check-overlay">
        <div className="age-check-modal">
          <img src={logo} alt="Alpha 1 Sales" className="age-check-logo" />
          <h2>Are you 21 or older & of the legal smoking age in your state?</h2>
          <div className="age-check-buttons">
            <button onClick={handleAccept}>Yes</button>
            <button onClick={handleDecline}>No</button>
          </div>
        </div>
      </div>
    )
  );
};

export default AgeCheck;

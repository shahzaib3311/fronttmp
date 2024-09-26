import React, { useState, useEffect } from 'react';

const DiscountPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    // Check if the popup has been shown before
    const hasShownPopup = localStorage.getItem('hasShownPopup');

    if (!hasShownPopup) {
      // Show popup after 1 second if it hasn't been shown before
      setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem('hasShownPopup', 'true');
      }, 1000);
    }

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);

    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const closePopup = () => {
    setFadeClass('fade-out');
    setTimeout(() => setShowPopup(false), 300); // Delay hiding to match fade-out animation
  };

  const styles = {
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      opacity: 1,
      transition: 'opacity 0.3s ease-in-out',
    },
    popupContent: {
      background: 'linear-gradient(to bottom right, #6f00b0, #38006b)', // Darker gradient of purple
      padding: '40px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      width: '90%',
      maxWidth: '500px',
      color: 'white',
      border: '4px solid white',
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      cursor: 'pointer',
      fontSize: '30px',
      border: 'none',
      background: 'none',
      color: 'white',
      fontWeight: 'bold',
      outline: 'none',
    },
    closeButtonFocus: {
      outline: '2px solid white',
    },
    header: {
      fontSize: '26px',
      marginBottom: '15px',
      fontWeight: 'bold',
      color: 'white',
    },
    paragraph: {
      fontSize: '18px',
      color: 'white',
    },
  };

  return (
    showPopup && (
      <div
        style={{ ...styles.popupOverlay, opacity: fadeClass ? 0 : 1 }}
        className={fadeClass}
      >
        <div
          style={{
            ...styles.popupContent,
            opacity: fadeClass ? 0 : 1,
            transform: fadeClass ? 'translateY(-20px)' : 'translateY(0)',
          }}
        >
          <button
            style={styles.closeButton}
            onClick={closePopup}
            aria-label="Close popup"
          >
            &times;
          </button>
          <h2 style={styles.header}>Early Bird Discount</h2>
          <p style={styles.paragraph}>
            Get a special discount of <span style={styles.boldText}>47%</span> on all the shirts, avail the launch discount before it's too late!
          </p>
        </div>
      </div>
    )
  );
};

export default DiscountPopup;

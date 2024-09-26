import React from 'react';
import './NotificationBar.css'; // Import CSS for styling

const NotificationBar = () => {
  return (
    <div className="notification-bar">
      <div className="marquee-wrapper">
        <div className="marquee-custom">
          <span className="inline-block font-semibold">Free shipping till the end of September all over Pakistan. Also, get a free DripSaint Goodie on a purchase of Rs5,000 or more</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;

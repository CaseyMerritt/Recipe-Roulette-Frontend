import React from 'react';
import './ErrorPopup.css'; // Make sure to create appropriate styling

function ErrorPopup({ message, onClose }) {
  return (
    <div className="error-popup">
      <div className="error-content">
        <div className='error-title'>Error</div>
        <div className='error-message'>{message}</div>
        <div className="error-button-container">  {/* Correct class name */}
          <button className="error-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPopup;

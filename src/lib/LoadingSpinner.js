import React from 'react';

// This can be in your CSS file
const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid #f3f3f3', // Light grey
  borderTop: '5px solid #3498db', // Blue color
  borderRadius: '50%',
  animation: 'spin 1s ease-in-out infinite',
  margin: 'auto'
};

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div style={spinnerStyle}></div>
      <p>Loading...</p>
      {/* Adding the keyframes definition for the spin animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;


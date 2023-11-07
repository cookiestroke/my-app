import '../components/MarketDepthCharts.css'; // Assuming you have a CSS file for styles

import React from 'react';

const DatePicker = ({ label, value, onChange }) => (
  <div className="date-picker">
    <label htmlFor={label.toLowerCase()} className="date-picker-label">{label}:</label>
    <input
      type="date"
      id={label.toLowerCase()}
      className="date-picker-input"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default DatePicker;



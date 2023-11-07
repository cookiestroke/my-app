import React from 'react';

const DatePicker = ({ label, value, onChange }) => (
  <div>
    <label htmlFor={label.toLowerCase()}>{label}:</label>
    <input type="date" id={label.toLowerCase()} value={value} onChange={onChange} />
  </div>
);

export default DatePicker;


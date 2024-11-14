import React from 'react';
import '../styles/checkBox.scss';

const CheckBox = ({ label, name, checked, onChange }) => (
  <label className="checkbox">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </label>
);

export default CheckBox;

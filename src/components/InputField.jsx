import React from 'react';
import '../styles/inputField.scss';


const InputField = ({ labelText, id, name, type, placeholder, value, onChange }) => {
    return (
      <div className="input-field">
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default InputField;
  

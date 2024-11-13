import React from 'react';
import '../../styles/backButton.scss';

const BackButton = ({ onBackClick }) => {
  return (
    <button className="back-button" onClick={onBackClick}>
      ◀
    </button>
  );
};

export default BackButton;

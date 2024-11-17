import React from 'react';
import '../styles/modal.scss';

function Modal({ message, onClose, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        {children}
      </div>
    </div>
  );
}

export default Modal;

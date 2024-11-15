import React from 'react';
import '../styles/modal.scss'; 

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Modal;

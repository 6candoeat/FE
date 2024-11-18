import React from "react";
import "../styles/modal.scss"; // 스타일 파일이 있다면 여기서 가져오기

const Modal = ({ message, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;

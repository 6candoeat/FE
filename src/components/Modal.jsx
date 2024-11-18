import React from "react";
import "../styles/modal.scss";

// function Modal({ message, onClose, children }) {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <p>{message}</p>
//         <button onClick={onClose}>확인</button>
//       </div>
//     </div>
//   );
// }

function Modal({ message, onClose }) {
  const handleConfirm = () => {
    onClose(); // 부모로부터 전달된 onClose 함수 호출
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
}

export default Modal;

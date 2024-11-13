import React, { useState } from "react";
import "../styles/menueOption.scss";

const MenueOption = ({ isOpen, onClose }) => {
  const [spiceLevel, setSpiceLevel] = useState("보통");
  const [additionalOption, setAdditionalOption] = useState("저당");

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="menue-option-modal">
        <div className="modal-header">
          <h2>주문 요청사항</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <hr className="divider" />

        <div className="options">
          <div className="option-group">
            <label>맵기를 선택해주세요</label>
            <div className="option-buttons">
              <button className={spiceLevel === "적게" ? "active" : ""} onClick={() => setSpiceLevel("적게")}>
                적게
              </button>
              <button className={spiceLevel === "보통" ? "active" : ""} onClick={() => setSpiceLevel("보통")}>
                보통
              </button>
              <button className={spiceLevel === "많이" ? "active" : ""} onClick={() => setSpiceLevel("많이")}>
                많이
              </button>
            </div>
          </div>

          <div className="option-group">
            <label>추가 선택사항</label>
            <div className="option-buttons">
              <button
                className={additionalOption === "저염" ? "active" : ""}
                onClick={() => setAdditionalOption("저염")}
              >
                저염
              </button>
              <button
                className={additionalOption === "저당" ? "active" : ""}
                onClick={() => setAdditionalOption("저당")}
              >
                저당
              </button>
            </div>
          </div>
        </div>

        <p className="caution-text">정확한 정보는 의사 등 전문가와 상담 후 섭취하세요</p>

        <div className="action-buttons">
          <button className="cart-button">장바구니 담기</button>
          <button className="order-button">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default MenueOption;

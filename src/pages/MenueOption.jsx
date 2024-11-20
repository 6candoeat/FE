import React, { useState } from "react";
import "../styles/menueOption.scss";

const MenueOption = ({ isOpen, onClose }) => {
  const [additionalOptions, setAdditionalOptions] = useState(["기본"]); // 기본 버튼 활성화 상태로 초기화

  if (!isOpen) return null;

  const toggleAdditionalOption = (option) => {
    if (option === "기본") {
      // 기본 선택 시 다른 옵션 초기화 후 기본만 선택
      setAdditionalOptions(["기본"]);
    } else {
      setAdditionalOptions((prev) =>
        prev.includes(option)
          ? prev.filter((opt) => opt !== option) // 이미 선택된 옵션 해제
          : [...prev.filter((opt) => opt !== "기본"), option] // 기본 해제 후 추가
      );
    }
  };

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

        <div className="m-options">
          <div className="option-group">
            <label>추가 선택사항</label>
            <div className="option-buttons">
              <button
                className={additionalOptions.includes("저염") ? "active" : ""}
                onClick={() => toggleAdditionalOption("저염")}
              >
                저염
              </button>
              <button
                className={additionalOptions.includes("저당") ? "active" : ""}
                onClick={() => toggleAdditionalOption("저당")}
              >
                저당
              </button>
              <button
                className={additionalOptions.includes("기본") ? "active" : ""}
                onClick={() => toggleAdditionalOption("기본")}
              >
                기본
              </button>
            </div>
          </div>
        </div>

        <p className="caution-text">* 정확한 정보는 의사 등 전문가와 상담 후 섭취하세요</p>

        <div className="action-buttons">
          <button className="cart-button">장바구니 담기</button>
          <button className="order-button">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default MenueOption;

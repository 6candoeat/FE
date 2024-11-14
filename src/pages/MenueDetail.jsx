import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import BackButton from "../components/button/BackButton";
import MenueOption from "../pages/MenueOption";
import "../styles/menueDetail.scss";

// 위험도에 따른 스타일 및 아이콘 설정
const getRiskLevelStyle = (riskLevel) => {
  switch (riskLevel) {
    case "위험":
      return { color: "#ff4d4f", icon: "😟" };
    case "보통":
      return { color: "#ffcc00", icon: "😐" };
    case "안전":
      return { color: "#28a745", icon: "😊" };
    default:
      return { color: "#666", icon: "❓" };
  }
};

const MenueDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const menuItem = location.state;
  const [isOptionOpen, setOptionOpen] = useState(false);

  const handleOrderClick = () => {
    setOptionOpen(true);
  };

  const handleClose = () => {
    setOptionOpen(false);
  };

  if (!menuItem || menuItem.id !== parseInt(id, 10)) {
    return <p>메뉴를 찾을 수 없습니다.</p>;
  }

  const { color, icon } = getRiskLevelStyle(menuItem.riskLevel);

  return (
    <AppContainer>
      <div className="menue-detail-page">
        <header className="header">
          <div className="header-content">
            <BackButton onBackClick={() => window.history.back()} />
            <h1 className="title">{menuItem.name}</h1>
          </div>
          <hr className="divider" />
        </header>
        <div className="risk-level-container" style={{ backgroundColor: color }}>
          <span className="icon">{icon}</span> {menuItem.riskLevel}
        </div>
        <div className="menu-image-container">
          <img src={menuItem.img} alt={menuItem.name} className="menu-image" />
        </div>
        <p className="caution-text">정확한 정보는 의사 등 전문가와 상담 후 섭취하세요</p>
        <button className="order-button" onClick={handleOrderClick}>
          주문하기
        </button>
        <MenueOption isOpen={isOptionOpen} onClose={handleClose} />
      </div>
    </AppContainer>
  );
};

export default MenueDetail;

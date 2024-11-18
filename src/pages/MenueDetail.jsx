import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import Header from "../components/header/Header";
import MenueOption from "../pages/MenueOption";

import "../styles/menueDetail.scss";
import axios from "axios";

const getRiskLevelStyle = (riskLevel) => {
  switch (riskLevel) {
    case "HIGH_RISK":
      return { color: "#ff4d4f", icon: "😟", label: "위험" };
    case "MODERATE":
      return { color: "#ffcc00", icon: "😐", label: "보통" };
    case "SAFE":
      return { color: "#28a745", icon: "😊", label: "안전" };
    default:
      return { color: "#666", icon: "❓", label: "알 수 없음" };
  }
};

const MenueDetail = () => {
  const location = useLocation();
  const { menuName, storeId } = location.state; // 전달된 menuName과 storeId
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOptionOpen, setOptionOpen] = useState(false);

  const handleOrderClick = () => {
    setOptionOpen(true);
  };

  const handleClose = () => {
    setOptionOpen(false);
  };

  useEffect(() => {
    const fetchMenuDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/stores/${storeId}/1`);
        if (response.data.returnCode === "0000") {
          const menus = response.data.data.contents;
          const selectedMenu = menus.find((menu) => menu.menuName === menuName);
          if (selectedMenu) {
            setMenuItem(selectedMenu);
          } else {
            throw new Error("메뉴를 찾을 수 없습니다.");
          }
        } else {
          throw new Error("메뉴 정보를 가져오는 데 실패했습니다.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetail();
  }, [storeId, menuName]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;
  if (!menuItem) return <p>메뉴를 찾을 수 없습니다.</p>;

  const { color, icon, label } = getRiskLevelStyle(menuItem.riskLevel);

  return (
    <AppContainer>
      <div className="menue-detail-page">
        <Header title={menuItem.menuName} onBackClick={() => window.history.back()} />
        {/* <div className="header-content">
            <BackButton onBackClick={() => window.history.back()} />
            <h1 className="title">{menuItem.menuName}</h1>
          </div> */}
        <div className="risk-level-container" style={{ backgroundColor: color }}>
          <span className="icon">{icon}</span> {label}
        </div>
        <div className="menu-image-container">
          <img
            src={menuItem.menuImageUrl || "/image/default-menu.png"}
            alt={menuItem.menuName}
            className="menu-image"
          />
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

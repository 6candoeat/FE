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
  const { menuId } = location.state;
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

  const renderNutritionTable = (nutrition) => {
    const filteredNutrition = Object.entries(nutrition).filter(([key, value]) => value !== 0.0);

    return (
      <table className="nutrition-table">
        <thead>
          <tr>
            <th>영양성분</th>
            <th>값</th>
          </tr>
        </thead>
        <tbody>
          {filteredNutrition.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const fetchMenuDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/menus/${menuId}/1`);
        if (response.data.returnCode === "0000") {
          setMenuItem(response.data.data);
        } else {
          throw new Error("메뉴 정보를 가져오는 데 실패했습니다.");
        }
      } catch (err) {
        console.error("Error fetching menu details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetail();
  }, [menuId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;
  if (!menuItem) return <p>메뉴를 찾을 수 없습니다.</p>;

  const { color, icon, label } = getRiskLevelStyle(menuItem.riskLevel);

  return (
    <AppContainer>
      <div className="menue-detail-page">
        <Header title={menuItem.menuName} onBackClick={() => window.history.back()} />
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
        <div className="nutrition-info">
          <h3 className="nutrition-title">영양성분 정보</h3>
          {menuItem &&
            renderNutritionTable({
              calories: menuItem.calories,
              fat: menuItem.fat,
              saturatedFat: menuItem.saturatedFat,
              transFat: menuItem.transFat,
              sodium: menuItem.sodium,
              carbohydrates: menuItem.carbohydrates,
              protein: menuItem.protein,
              dietaryFiber: menuItem.dietaryFiber,
              sugar: menuItem.sugar,
            })}
        </div>
        <button className="order-button" onClick={handleOrderClick}>
          주문하기
        </button>
        <MenueOption isOpen={isOptionOpen} onClose={handleClose} />
      </div>
    </AppContainer>
  );
};

export default MenueDetail;

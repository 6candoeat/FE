import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../styles/menues.scss";
import Footer from "../components/footer/Footer";
import AppContainer from "../components/AppContainer";
import Header from "../components/header/Header";
import axios from "axios";

const Menues = () => {
  const { storeId } = useParams();
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storeName = location.state?.storeName || "가게 이름 없음";
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stores/${storeId}/1`);
        if (response.data.returnCode === "0000") {
          setMenuItems(response.data.data.contents);
        } else {
          throw new Error("메뉴를 가져오는 데 실패했습니다.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [storeId]);

  const handleMenuClick = (menuItem) => {
    navigate(`/menu-detail/${storeId}`, { state: { ...menuItem, storeId } });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <AppContainer>
      <div className="menues-page">
        <Header title={storeName} onBackClick={() => window.history.back()} />
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item" onClick={() => handleMenuClick(item)}>
              <div className="menu-details">
              <span
                className={`m-risk-level-container ${
                  item.riskLevel === "HIGH_RISK" ? "high-risk" :
                  item.riskLevel === "MODERATE" ? "moderate" : "safe"
                }`}
              >
                {item.riskLevel === "SAFE" ? "안전" : 
                item.riskLevel === "MODERATE" ? "보통" : "위험"}
              </span>
                <h2 className="menu-name">{item.menuName}</h2>
                <p className="menu-price">가격: {item.price.toLocaleString()}원</p>
              </div>
              <img src={item.menuImageUrl || "/image/default-menu.png"} alt={item.menuName} className="menu-image" />
            </div>
          ))}
        </div>
        <div className="menues-bottom-section">
          <Footer />
        </div>
      </div>
    </AppContainer>
  );
};

export default Menues;

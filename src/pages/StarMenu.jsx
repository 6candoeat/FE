import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../styles/menues.scss"; // 스타일 파일 유지
import Footer from "../components/footer/Footer";
import AppContainer from "../components/AppContainer";
import Header from "../components/header/Header";
import axios from "axios";

const StarMenu = () => {
  const { id } = useParams(); // URL에서 userId 가져오기
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storeName = location.state?.storeName || "가게 이름 없음"; // storeName 받아오기
  const storeId = location.state?.storeId; // storeId 받아오기
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("유효한 사용자 ID가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recommendation/${id}`);
        if (response.data.returnCode === "0000") {
          setMenuItems(response.data.data.contents);
        } else {
          throw new Error("추천 메뉴 데이터를 가져오는 데 실패했습니다.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [storeId, id]);

  const handleMenuClick = (menuItem) => {
    // 메뉴 클릭 시 상세 페이지로 이동
    navigate(`/menu-detail/${storeId}`, { state: { ...menuItem, storeId, storeName } });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <AppContainer>
      <div className="menues-page">
        <Header title="추천 메뉴" onBackClick={() => window.history.back()} />
        <div className="menu-list">
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
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
                <img
                  src={item.menuImageUrl || `/image/${item.storeId}/${item.menuId}.PNG`}
                  alt={item.menuName}
                  className="menu-image"
                  onError={(e) => {
                    const fallbackSrc = `/image/${item.storeId}/0.PNG`;
                    if (e.target.src !== fallbackSrc) {
                      e.target.src = fallbackSrc; // 첫 번째 대체 이미지
                    } else {
                      e.target.src = `/image/${item.storeId}/0.PNG`; // 최종 대체 이미지
                    }
                  }}
                />
              </div>
            ))
          ) : (
            <p>추천 메뉴가 없습니다.</p>
          )}
        </div>
        <div className="menues-bottom-section">
          <Footer />
        </div>
      </div>
    </AppContainer>
  );
};

export default StarMenu;

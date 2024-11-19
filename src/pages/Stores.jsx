import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContainer from "../components/AppContainer";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import "../styles/stores.scss";

const Stores = () => {
  const { category, userId } = useParams(); // userId를 URL 파라미터로부터 가져오기
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  // 카테고리 이름 매핑
  const categoryNames = {
    KOREAN: "한식",
    JAPANESE: "일식",
    WESTERN: "양식",
    ASIAN: "아시안",
    CHINESE: "중식",
  };

  const categoryName = categoryNames[category];

  // API 호출로 가게 데이터 가져오기
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/stores/1?category=${category}`);
        if (response.data.returnCode === "0000") {
          setStores(response.data.data.contents);
        }
      } catch (error) {
        console.error("가게 데이터를 가져오는 데 실패했습니다.", error);
      }
    };
    fetchStores();
  }, [category, userId]); // category와 userId가 변경될 때마다 API 요청

  // 잘못된 카테고리 처리
  if (!categoryName) {
    return <div>잘못된 카테고리입니다.</div>;
  }

  // 해당 카테고리에 맞는 가게가 없을 때 처리
  if (stores.length === 0) {
    return <div>해당 카테고리에 가게 정보가 없습니다.</div>;
  }

  const handleStoreClick = (store) => {
    navigate(`/menues/${store.storeId}`, { state: { storeName: store.storeName } });
  };

  return (
    <AppContainer className="app-container">
      <Header title={categoryName} onBackClick={() => window.history.back()} />

      <div className="store-list">
        {stores.map((store) => (
          <div className="store-item" key={store.storeId} onClick={() => handleStoreClick(store)}>
            <img
              src={store.menuImageUrl || `/image/store/${store.storeId}.PNG`} // 이미지 URL이 없을 경우 기본 이미지 경로
              alt={store.storeName} // alt 텍스트
              className="menu-image"
              onError={(e) => {
                e.target.src = "/image/default-menu.png"; // 대체 이미지로 바로 설정
              }}
            />
            <h2>{store.storeName}</h2>
            <div className="status">
              <span className="danger">위험 {store.highRisk}</span>
              <span className="warning">보통 {store.moderate}</span>
              <span className="safe">안전 {store.safe}</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </AppContainer>
  );
};

export default Stores;

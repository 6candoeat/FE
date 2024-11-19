import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContainer from "../components/AppContainer";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import "../styles/stores.scss";

const Stores = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [userId, setUserId] = useState(null);

  // 로컬 스토리지에서 userId 가져오기
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserId(parsedUserInfo.userId); // userId 설정
      } catch (error) {
        console.error("userInfo 파싱 중 오류 발생:", error);
        navigate("/login"); // 오류 시 로그인 페이지로 이동
      }
    } else {
      console.error("로컬 스토리지에 userInfo가 없습니다.");
      navigate("/login"); // userInfo가 없으면 로그인 페이지로 이동
    }
  }, [navigate]);

  // API 호출로 가게 데이터 가져오기
  useEffect(() => {
    if (userId && category) {
      const fetchStores = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/stores/${userId}?category=${category}`
          );
          if (response.data.returnCode === "0000") {
            setStores(response.data.data.contents);
          } else {
            console.error("API에서 가게 데이터를 불러오지 못했습니다.");
          }
        } catch (error) {
          console.error("가게 데이터를 가져오는 데 실패했습니다.", error);
        }
      };
      fetchStores();
    }
  }, [userId, category]);

  // 카테고리 이름 매핑
  const categoryNames = {
    KOREAN: "한식",
    JAPANESE: "일식",
    WESTERN: "양식",
    ASIAN: "아시안",
    CHINESE: "중식",
  };

  const categoryName = categoryNames[category];

  if (!categoryName) {
    return <div>잘못된 카테고리입니다.</div>;
  }

  if (!userId) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  return (
    <AppContainer className="app-container">
      <Header title={categoryName} onBackClick={() => window.history.back()} />
      <div className="store-list">
        {stores.length === 0 ? (
          <div>해당 카테고리에 가게 정보가 없습니다.</div>
        ) : (
          stores.map((store) => (
            <div
              className="store-item"
              key={store.storeId}
              onClick={() => navigate(`/menues/${store.storeId}`, { state: { storeName: store.storeName } })}
            >
              <img
                src={store.menuImageUrl || `/image/store/${store.storeId}.PNG`}
                alt={store.storeName}
                className="menu-image"
                onError={(e) => (e.target.src = "/image/default-menu.png")}
              />
              <h2>{store.storeName}</h2>
              <div className="status">
                <span className="danger">위험 {store.highRisk}</span>
                <span className="warning">보통 {store.moderate}</span>
                <span className="safe">안전 {store.safe}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </AppContainer>
  );
};

export default Stores;

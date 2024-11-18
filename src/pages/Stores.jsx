import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import Footer from "../components/footer/Footer";
import BackButton from "../components/button/BackButton";
import "../styles/menustore.scss";

const dummyData = [
  { store_id: 1, store_name: "김가네", category: "KOREAN", danger: 4, warning: 2, safe: 3 },
  { store_id: 2, store_name: "김밥천국", category: "KOREAN", danger: 2, warning: 3, safe: 4 },
  { store_id: 3, store_name: "아비꼬", category: "JAPANESE", danger: 1, warning: 5, safe: 3 },
  { store_id: 4, store_name: "스시집", category: "JAPANESE", danger: 0, warning: 2, safe: 6 },
  { store_id: 5, store_name: "죽이야기", category: "KOREAN", danger: 3, warning: 4, safe: 2 },
  { store_id: 6, store_name: "서브웨이", category: "WESTERN", danger: 2, warning: 1, safe: 5 },
  { store_id: 7, store_name: "버거킹", category: "WESTERN", danger: 1, warning: 3, safe: 3 },
  { store_id: 8, store_name: "스타벅스", category: "WESTERN", danger: 0, warning: 1, safe: 8 },
  { store_id: 9, store_name: "포메인", category: "ASIAN", danger: 1, warning: 4, safe: 3 },
  { store_id: 10, store_name: "홍콩반점", category: "CHINESE", danger: 3, warning: 3, safe: 2 },
];

const Stores = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const filteredStores = dummyData.filter((store) => store.category === category);

  if (filteredStores.length === 0) {
    return <div>해당 카테고리에 가게 정보가 없습니다.</div>;
  }

  const handleStoreClick = (store) => {
    navigate(`/menues/${store.store_id}`, { state: { storeName: store.store_name } });
  };

  return (
    <AppContainer className="app-container">
      <header className="store-header">
        <div className="header-content">
          <BackButton onBackClick={() => window.history.back()} />
          <h1 className="title">{category}</h1>
        </div>
        <hr className="divider" />
      </header>

      <div className="store-list">
        {filteredStores.map((store) => (
          <div className="store-item" key={store.store_id} onClick={() => handleStoreClick(store)}>
            <img src="/image/default-store.png" alt={store.store_name} />
            <h2>{store.store_name}</h2>
            <div className="status">
              <span className="danger">위험 {store.danger}</span>
              <span className="warning">보통 {store.warning}</span>
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

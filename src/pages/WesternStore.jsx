import React from 'react';
import '../styles/menustore.scss';
import AppContainer from '../components/AppContainer'; 
import Footer from '../components/footer/Footer';  
import BackButton from "../components/button/BackButton";

const WesternStore = () => {
  return (
    <AppContainer className="app-container">
        <header className="store-header">
          <div className="header-content">
            <BackButton onBackClick={() => window.history.back()} />
            <h1 className="title">양식</h1>
          </div>
          <hr className="divider" />
        </header>
      
      <div className="s-search-bar">
          <input type="text" placeholder="메뉴를 검색하세요" />
          <button type="button">🔍</button>
        </div>

      <div className="store-list">
        <div className="store-item">
          <img src="/image/star.PNG" alt="스타벅스" />
          <h2>스타벅스</h2>
          <div className="status">
            <span className="danger">위험 4</span>
            <span className="warning">보통 2</span>
            <span className="safe">안전 3</span>
          </div>
        </div>
        
        <div className="store-item">
          <img src="/image/subway.PNG" alt="서브웨이" />
          <h2>서브웨이</h2>
          <div className="status">
            <span className="danger">위험 2</span>
            <span className="warning">보통 6</span>
            <span className="safe">안전 3</span>
          </div>
        </div>

        <div className="store-item">
          <img src="/image/burgerking.PNG" alt="버거킹" />
          <h2>버거킹</h2>
          <div className="status">
            <span className="danger">위험 2</span>
            <span className="warning">보통 6</span>
            <span className="safe">안전 3</span>
          </div>
        </div>
      </div>
    <Footer />
    </AppContainer>
  );
};

export default WesternStore;

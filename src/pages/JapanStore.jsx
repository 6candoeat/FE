import React from 'react';
import '../styles/menustore.scss';
import AppContainer from '../components/AppContainer'; 
import Footer from '../components/footer/Footer';  
import BackButton from "../components/button/BackButton";

import abiko from '../assets/image/abiko.PNG';
import sushi from '../assets/image/sushi.PNG';

const JapanStore = () => {
  return (
    <AppContainer className="app-container">
        <header className="store-header">
          <div className="header-content">
            <BackButton onBackClick={() => window.history.back()} />
            <h1 className="title">일식</h1>
          </div>
          <hr className="divider" />
        </header>
      
      <div className="s-search-bar">
          <input type="text" placeholder="메뉴를 검색하세요" />
          <button type="button">🔍</button>
        </div>

      <div className="store-list">
        <div className="store-item">
          <img src={abiko} alt="아비꼬" />
          <h2>아비꼬</h2>
          <div className="status">
            <span className="danger">위험 4</span>
            <span className="warning">보통 2</span>
            <span className="safe">안전 3</span>
          </div>
        </div>
        
        <div className="store-item">
          <img src={sushi} alt="스시집" />
          <h2>스시집</h2>
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

export default JapanStore;

import React from 'react';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';  
import AppContainer from '../components/AppContainer'; 
import '../styles/menumain.scss';
import { Link } from 'react-router-dom';

function MenuMain() {
  return (
    <AppContainer className="app-container">
      <Banner />
      <div className="search-bar">
        <input type="text" placeholder="메뉴를 검색하세요" />
        <button type="button">🔍</button>
      </div>

      <main className="menu-grid">
        <Link to="/menumain/star" style={{ textDecoration: 'none' }}>
          <div className="main-item">
            <div className="icon">
              <img src="/image/006.png" alt="추천 아이콘" />
            </div>
            <p>추천</p>
          </div>
        </Link>
        
        <Link to="/menumain/korea" style={{ textDecoration: 'none' }}>
          <div className="main-item">
            <div className="icon">
              <img src="/image/002.png" alt="한식 아이콘" />
            </div>
            <p>한식</p>
          </div>
        </Link>

        <Link to="/menumain/china" style={{ textDecoration: 'none' }}>
          <div className="main-item">
            <div className="icon">
              <img src="/image/003.png" alt="중식 아이콘" />
            </div>
            <p>중식</p>
          </div>
        </Link>

        <Link to="/menumain/western" style={{ textDecoration: 'none' }}>
          <div className="main-item">
            <div className="icon">
              <img src="/image/004.png" alt="양식 아이콘" />
            </div>
            <p>양식</p>
          </div>
        </Link>

        <Link to="/menumain/japan" style={{ textDecoration: 'none' }}>
          <div className="main-item">
            <div className="icon">
              <img src="/image/005.png" alt="일식 아이콘" />
            </div>
            <p>일식</p>
          </div>
        </Link>

        <Link to="/menumain/asia" style={{ textDecoration: 'none' }}>
          <div className="main-item">
            <div className="icon">
              <img src="/image/001.png" alt="아시안 아이콘" />
            </div>
            <p>아시안</p>
          </div>
        </Link>
      </main>

      <Footer />
    </AppContainer>
  );
}

export default MenuMain;

import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import AppContainer from "../components/AppContainer";
import "../styles/menumain.scss";

import star from "../assets/image/006.png";
import korea from "../assets/image/002.png";
import china from "../assets/image/003.png";
import western from "../assets/image/004.png";
import japan from "../assets/image/005.png";
import asia from "../assets/image/001.png";

function Category() {
  const categories = [
    { name: "추천", category: "Recommand", icon: star },
    { name: "한식", category: "KOREAN", icon: korea },
    { name: "일식", category: "JAPANESE", icon: japan },
    { name: "양식", category: "WESTERN", icon: western },
    { name: "아시안", category: "ASIAN", icon: asia },
    { name: "중식", category: "CHINESE", icon: china },
  ];

  return (
    <AppContainer className="app-container">
      <Banner />
      <div className="search-bar">
        <input type="text" placeholder="메뉴를 검색하세요" />
        <button type="button">🔍</button>
      </div>

      <main className="menu-grid">
        {categories.map(({ name, category, icon }) => (
          <Link to={`/stores/${category}`} key={category} style={{ textDecoration: "none" }}>
            <div className="main-item">
              <div className="icon">
                <img src={icon} alt={`${name} 아이콘`} />
              </div>
              <p>{name}</p>
            </div>
          </Link>
        ))}
      </main>

      <Footer />
    </AppContainer>
  );
}

export default Category;

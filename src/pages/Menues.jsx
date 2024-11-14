import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/menues.scss";
import seafoodSoupImg from "../assets/seafoodSoupImg.png";
import soyBeanSoupImg from "../assets/soyBeanSoupImg.png";
import kimchiStewImg from "../assets/kimchiStewImg.png";
import Footer from "../components/footer/Footer";
import BackButton from "../components/button/BackButton";
import AppContainer from "../components/AppContainer";

const Menues = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      riskLevel: "위험",
      name: "해물 순두부찌개",
      price1: "10000원",
      price2: "25000원",
      img: seafoodSoupImg,
    },
    {
      id: 2,
      riskLevel: "안전",
      name: "된장찌개",
      price1: "9000원",
      price2: "24000원",
      img: soyBeanSoupImg,
    },
    {
      id: 3,
      riskLevel: "보통",
      name: "돼지고기 김치찌개",
      price1: "9000원",
      price2: "24000원",
      img: kimchiStewImg,
    },
  ];

  const handleMenuClick = (item) => {
    navigate(`/menu/${item.id}`, { state: item }); // 선택된 메뉴 데이터를 state로 전달
  };

  return (
    <AppContainer>
      <div className="menues-page">
        <header className="menues-header">
          <div className="header-content">
            <BackButton onBackClick={() => window.history.back()} />
            <h1 className="title">시골 찌개 마을</h1>
          </div>
          <hr className="divider" />
        </header>

        <div className="menu-list">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item" onClick={() => handleMenuClick(item)}>
              <div className="menu-details">
                <span
                  className={`risk-level ${
                    item.riskLevel === "위험" ? "danger" : item.riskLevel === "보통" ? "normal" : "safe"
                  }`}
                >
                  {item.riskLevel}
                </span>
                <h2 className="menu-name">{item.name}</h2>
                <p className="menu-price">1인분 : {item.price1}</p>
                <p className="menu-price">2~3인분 : {item.price2}</p>
              </div>
              <img src={item.img} alt={item.name} className="menu-image" />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </AppContainer>
  );
};

export default Menues;

import React from 'react';
import '../../styles/footer.scss';

import homeIcon from '../../assets/home_icon.png';
import orderHistoryIcon from '../../assets/order_history_icon.png';
import cartIcon from '../../assets/cart_icon.png';
import profileIcon from '../../assets/profile_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <button className="footer-item btn">
        <img src={homeIcon} alt="홈 화면" className="footer-icon" />
        <span className="footer-text">홈 화면</span>
      </button>
      <button className="footer-item btn">
        <img src={orderHistoryIcon} alt="주문 내역" className="footer-icon" />
        <span className="footer-text">주문 내역</span>
      </button>
      <button className="footer-item btn">
        <img src={cartIcon} alt="장바구니" className="footer-icon" />
        <span className="footer-text">장바구니</span>
      </button>
      <button className="footer-item btn">
        <img src={profileIcon} alt="내 정보" className="footer-icon" />
        <span className="footer-text">내 정보</span>
      </button>
    </div>
  );
};

export default Footer;

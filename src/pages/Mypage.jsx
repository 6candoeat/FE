import React from 'react';
import AppContainer from '../components/AppContainer'; 
import Header from '../components/header/Header'; 
import '../styles/mypage.scss';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';  

const Mypage = () => {
  const handleBackClick = () => {
    console.log('Back button clicked');
  };

  return (
    <AppContainer>
      <div className="mypage">
        <Header title="내 정보" onBackClick={handleBackClick} />
        <div className="divider"></div>

        <div className="info-card card border-primary mb-3">
          <div className="card-body">
            {/* Info rows */}
            <div className="info-row d-flex justify-content-between">
              <span className="label">이름</span>
              <span className="value">홍길동</span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">생년월일</span>
              <span className="value">0000.00.00</span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">신체정보</span>
              <span className="value">170cm | 63kg</span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">전화번호</span>
              <span className="value">010-0000-0000</span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">주소</span>
              <span className="value">서울시 00구 00로 100길<br />(100동 1002호)</span>
            </div>
          </div>
        </div>

        {/* Disease card */}
        <div className="disease-card card border-primary mb-3">
          <div className="card-body text-center">
            <span className="disease-label">나의 질병</span>
            <span className="disease-value ms-2">당뇨</span>
          </div>
        </div>

        {/* Diet management card */}
        <div className="diet-management card border-primary mb-3">
          <div className="card-body d-flex justify-content-between">
            <span className="diet-label">식단 관리 강도</span>
            <div className="diet-values">
              <span className="diet-value1">엄격한 관리</span>
              <span className="diet-value2">일반 관리</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="action-buttons d-flex justify-content-between mb-3">
          <button className="action-button btn btn-primary">개인 정보 수정</button>
          <button className="action-button btn btn-primary">결제 수단 정보</button>
        </div>

        {/* Banner & Footer */}
        <div className="bottom-section">
          <Banner />
          <Footer />
        </div>
      </div>
    </AppContainer>
  );
};

export default Mypage;

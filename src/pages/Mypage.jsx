import React, { useEffect, useState } from 'react';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import '../styles/mypage.scss';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';

const Mypage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      setUserData(storedUser);
    } else {
      alert('로그인이 필요합니다.');
      window.location.replace('/login'); // 로그인 페이지로 이동
    }
  }, []);

  if (!userData) return null;

  return (
    <AppContainer>
      <div className="mypage">
        <Header title="내 정보" />
        <div className="divider"></div>

        <div className="info-card card border-primary mb-3">
          <div className="card-body">
            <div className="info-row d-flex justify-content-between">
              <span className="label">이름</span>
              <span className="value">{userData.name}</span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">성별</span>
              <span className="value">{userData.gender === 'FEMALE' ? '여성' : '남성'}</span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">신체정보</span>
              <span className="value">
                {userData.height}cm | {userData.weight}kg
              </span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">전화번호</span>
              <span className="value">{userData.phone}</span>
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">주소</span>
              <span className="value">{userData.address}</span>
            </div>
          </div>
        </div>

        <div className="disease-card card border-primary mb-3">
          <div className="card-body text-center">
            <span className="disease-label">나의 질병</span>
            <span className="disease-value ms-2">
              {userData.disease ? userData.disease : '없음'}
            </span>
          </div>
        </div>

        <div className="diet-management card border-primary mb-3">
          <div className="card-body d-flex justify-content-between">
            <span className="diet-label">식단 관리 강도</span>
            <span className="diet-value">
              {userData.dietIntensity === 'STRICT' ? '엄격한 관리' : '일반 관리'}
            </span>
          </div>
        </div>

        <div className="action-buttons d-flex justify-content-between mb-3">
          <button className="action-button btn btn-primary">개인 정보 수정</button>
          <button className="action-button btn btn-primary">결제 수단 정보</button>
        </div>

        <div className="bottom-section">
          <Banner />
          <Footer />
        </div>
      </div>
    </AppContainer>
  );
};

export default Mypage;

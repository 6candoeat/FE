import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import '../styles/mypage.scss';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';

const Mypage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      const { loginId, password } = storedUser;

      axios
        .get('http://localhost:8080/api/member/login-info', {
          params: {
            loginId: loginId,
            password: password
          }
        })
        .then((response) => {
          // 서버에서 받은 사용자 데이터를 userData 상태에 저장
          const userInfo = response.data;

          // 로컬스토리지의 userInfo 업데이트
          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          setUserData(userInfo);  // 응답 데이터를 상태에 설정
          setLoading(false);
        })
        .catch((err) => {
          console.error('API 호출 오류:', err);
          setError('회원 정보를 가져오는 데 실패했습니다.');
          setLoading(false);
        });
    } else {
      alert('로그인이 필요합니다.');
      window.location.replace('/login');
    }
  }, []);

  const getDiseaseName = (disease) => {
    switch (disease) {
      case 'HYPERTENSION':
        return '고혈압';
      case 'GOUT':
        return '통풍';
      case 'DIABETES':
        return '당뇨병';
      default:
        return '없음';
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>회원 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <AppContainer>
      <div className="mypage">
        <Header title="내 정보" />
        <div className="divider"></div>

        <div className="info-card card border-primary mb-3">
          <div className="card-body">
            <div className="info-row d-flex justify-content-between">
              <span className="label">이름</span>
              <span className="value">{userData.username}</span>
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
              <span className="value">{userData.phoneNum}</span> {/* 필드명 수정 */}
            </div>
            <div className="info-row d-flex justify-content-between">
              <span className="label">주소</span>
              <span className="value">{userData.userAddress}</span> {/* 필드명 수정 */}
            </div>
          </div>
        </div>

        <div className="disease-card card border-primary mb-3">
          <div className="card-body text-center">
            <span className="disease-label">나의 질병</span>
            <span className="disease-value ms-2">
              {getDiseaseName(userData.userDisease)} {/* 필드명 수정 */}
            </span>
          </div>
        </div>

        <div className="diet-management card border-primary mb-3">
          <div className="card-body d-flex justify-content-between">
            <span className="diet-label">식단 관리 강도</span>
            <span className="diet-value">
              {userData.dietControl === 'STRICT' ? '엄격한 관리' : '일반 관리'}
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

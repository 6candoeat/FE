import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 상태와 네비게이션 추가
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';
import '../styles/diseasePage.scss';

const DiseasePage = () => {
  const [username, setUsername] = useState('');
  const location = useLocation(); // 현재 페이지의 상태를 가져옴
  const navigate = useNavigate();

  // `photo`가 `CameraPage`에서 전달된 이미지 URL
  const photo = location.state?.photo || '/path/to/your/uploaded/image'; // 기본 이미지 경로 설정

  // Fetch username from localStorage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Assume userInfo is stored as JSON
    if (userInfo && userInfo.username) {
      setUsername(userInfo.username);
    }
  }, []);

  const handleRetakePhoto = () => {
    navigate('/camera'); // '/camera' 페이지로 이동
  };

  const handleRegister = () => {
    navigate('/mypage'); // '/mypage' 페이지로 이동
  };

  return (
    <AppContainer>
      <div className="disease-content">
        <Header title={username} />
        <div className="divider"></div>
        
        <div className="disease-info">
          <div className="card">
            <h2>나의 질병</h2>
            <img 
              src={photo} 
              alt="Disease Info" 
              className="disease-image"
            />
            <p>제2형 당뇨</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="retry-button" onClick={handleRetakePhoto}>다시찍기</button>
          <button className="register-button" onClick={handleRegister}>등록하기</button>
        </div>

        {/* Footer Section */}
        <div className="bottom-section">
          <Banner />
          <Footer />
        </div>
      </div>
    </AppContainer>
  );
};

export default DiseasePage;

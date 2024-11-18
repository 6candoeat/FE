import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';
import '../styles/diseasePage.scss';

const DiseasePage = () => {
  const [username, setUsername] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState({ photo: '', user_disease: '정보 없음' });
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.username) {
      setUsername(userInfo.username);
    }

    const storedDiseaseInfo = JSON.parse(localStorage.getItem('diseaseInfo'));
    if (storedDiseaseInfo) {
      setDiseaseInfo(storedDiseaseInfo);
    }
  }, []);

  const handleRetakePhoto = () => {
    navigate('/camera');
  };

  const handleRegister = () => {
    navigate('/mypage');
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
              src={diseaseInfo.photo} 
              alt="Disease Info" 
              className="disease-image"
            />
            <p>{diseaseInfo.user_disease}</p> 
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

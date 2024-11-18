import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';
import axios from 'axios';
import '../styles/diseasePage.scss';

const DiseasePage = () => {
  const [username, setUsername] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState({ photo: '', disease: '정보 없음' });
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬스토리지에서 사용자 정보 및 질병 정보 불러오기
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

  const handleRegister = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')); // 로컬스토리지에서 사용자 정보 가져오기
      if (!userInfo || !userInfo.userId) {
        console.error('User info is missing in localStorage');
        return;
      }

      const { userId } = userInfo;
      const { disease } = diseaseInfo;

      // 한글 질병명을 영어로 변환
      const diseaseMap = {
        '통풍': 'GOUT',
        '고혈압': 'HYPERTENSION',
        '당뇨': 'DIABETES',
      };

      const diseaseParam = diseaseMap[disease] || 'UNKNOWN';

      // 서버에 POST 요청
      const response = await axios.post(
        `http://localhost:8080/api/member/saveDisease`,
        null,
        {
          params: {
            userId,
            disease: diseaseParam,
          },
        }
      );

      console.log('Response from server:', response.data);

      // 성공적으로 등록 후 로컬스토리지 업데이트
      localStorage.removeItem('diseaseInfo'); // diseaseInfo 삭제
      const updatedUserInfo = { ...userInfo, disease: diseaseParam }; // 새로운 정보 추가
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo)); // userInfo 업데이트

      // 마이페이지로 이동
      navigate('/mypage');
    } catch (error) {
      console.error('Error during disease registration:', error);
    }
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
            <p>{diseaseInfo.disease}</p> 
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

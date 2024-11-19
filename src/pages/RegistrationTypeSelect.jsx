import React from 'react';
import AppContainer from '../components/AppContainer';
import '../styles/registrationTypeSelect.scss';
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';

function RegistrationTypeSelect() {
  const navigate = useNavigate();

  const handlePhotoClick = () => {
    navigate('/camera');  // 카메라 페이지로 이동
  };

  const handleDirectInputClick = () => {
    console.log("직접 입력 버튼 클릭됨");
  };

  return (
    <AppContainer>
      <Header title={<>
      질병 등록 방법<br />
      선택하기
    </>} onBackClick={() => window.history.back()} />
      <div className="disease-container">
        <div className="option-container">
          <button className="option" onClick={handlePhotoClick}>
            <h2 className="option-title">사진 찍기</h2>
            <div className="icon camera-icon" />
            <p className="option-description">약 봉투를 찍어서 질병 정보를 입력합니다.</p>
          </button>
          <button className="option" onClick={handleDirectInputClick}>
            <h2 className="option-title">직접 입력</h2>
            <div className="icon pencil-icon" />
            <p className="option-description">직접 질병 정보를 입력합니다.</p>
          </button>
        </div>
      </div>
    </AppContainer>
  );
}

export default RegistrationTypeSelect;

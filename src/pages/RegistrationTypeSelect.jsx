import React from 'react';
import AppContainer from '../components/AppContainer'; 
import '../styles/registrationTypeSelect.scss';
import Header from '../components/header/Header';

function RegistrationTypeSelect() {

  const handlePhotoClick = () => {
    console.log("사진 찍기 버튼 클릭됨");

  };

  const handleDirectInputClick = () => {
    console.log("직접 입력 버튼 클릭됨");

  };

  

  const handleBackClick = () => {
    console.log("뒤로가기 버튼 클릭됨");
  };

  return (
    <AppContainer>
      <div className="disease-container">
      <Header 
        title={(
            <>
            질병 등록 방법
          <br />
            선택하기
            </>
          )} 
         onBackClick={handleBackClick} 
        />
        <div className="option-container">
          {/* 사진 찍기 버튼 */}
          <button className="option" onClick={handlePhotoClick}>
            <h2 className="option-title">사진 찍기</h2>
            <div className="icon camera-icon" />
            <p className="option-description">약 봉투를 찍어서 질병 정보를 입력합니다.</p>
          </button>
          
          {/* 직접 입력 버튼 */}
          <button className="option" onClick={handleDirectInputClick}>
            <div className="icon pencil-icon" />
            <h2 className="option-title">직접 입력</h2>
            <p className="option-description">직접 질병 정보를 입력합니다.</p>
          </button>
        </div>
      </div>
    </AppContainer>
  );
}

export default RegistrationTypeSelect;

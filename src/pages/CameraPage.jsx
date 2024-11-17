import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import { Camera } from 'react-camera-pro';
import '../styles/cameraPage.scss';
import Footer from '../components/footer/Footer';

function CameraPage() {
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const navigate = useNavigate();

  const takePhoto = () => {
    const capturedPhoto = cameraRef.current.takePhoto();
    setPhoto(capturedPhoto);
    console.log("Captured photo URL:", capturedPhoto);
  };

  const handleBackClick = () => {
    navigate('/registration'); // '/registration' 페이지로 이동
  };

  const handleRetakePhoto = () => {
    setPhoto(null); // Reset photo to null to show the camera view again
  };

  const handleCheckClick = () => {
    // 사진 확인 버튼 클릭 시 /registration/disease로 이동하며 사진 URL 전달
    navigate('/registration/disease', { state: { photo } });
  };

  return (
    <AppContainer>
      <div className="camera-container">
        <Header 
          title="사진 등록" 
          onBackClick={handleBackClick} 
        />
        {photo ? (
          <div className="captured-photo">
            <img src={photo} alt="캡처된 사진" />
            <div className="button-group">
              <button className="recapture-button" onClick={handleRetakePhoto}>다시찍기</button>
              <button className="check-button" onClick={handleCheckClick}>확인하기</button>
            </div>
          </div>
        ) : (
          <div className="video-container">
            <Camera ref={cameraRef} aspectRatio={3 / 4} className="camera-view" />
            <button className="capture-button" onClick={takePhoto}>사진찍기</button>
          </div>
        )}
        <div className="camera-bottom-section">
          <div className="camera-footer">
            <Footer />
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default CameraPage;

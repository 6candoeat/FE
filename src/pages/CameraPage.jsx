import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import { Camera } from 'react-camera-pro';
import '../styles/cameraPage.scss';
// import Banner from '../components/banner/Banner';
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
            <button className="recapture-button" onClick={handleRetakePhoto}>다시찍기</button>
          </div>
        ) : (
          <div className="video-container">
            <Camera ref={cameraRef} aspectRatio={3 / 4} className="camera-view" />
            <button className="capture-button" onClick={takePhoto}>사진찍기</button>
          </div>
        )}
        <div className="bottom-section">
          {/* <Banner /> */}
          <Footer />
        </div>
      </div>
    </AppContainer>
  );
}

export default CameraPage;

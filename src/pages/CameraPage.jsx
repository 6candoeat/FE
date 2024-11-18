import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import { Camera } from 'react-camera-pro';
import axios from 'axios';
import mockImageUrl from '../mock/mockImage'; 
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
    navigate('/registration'); 
  };

  const handleRetakePhoto = () => {
    setPhoto(null); 
  };

  const handleCheckClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/ocr/parseImage',
        null,
        {
          params: {
            imageUrl: mockImageUrl,
          },
        }
      );
  
      console.log('OCR Full Response:', response.data);
  
      // disease 정보 저장
      const disease = response.data || '정보 없음'; 
      localStorage.setItem('diseaseInfo', JSON.stringify({
        photo: mockImageUrl,
        disease: disease, 
      }));
  
      console.log('Saved Disease Info:', JSON.parse(localStorage.getItem('diseaseInfo')));
  
      navigate('/registration/disease');
    } catch (error) {
      console.error('Error during OCR request:', error);
    }
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

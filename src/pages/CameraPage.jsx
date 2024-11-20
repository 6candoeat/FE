import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Header from '../components/header/Header';
import { Camera } from 'react-camera-pro';
import axios from 'axios';
import '../styles/cameraPage.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function CameraPage() {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const cameraRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      MySwal.fire({
        title: '잠시만 기다려주세요',
        text: '약 인식 중입니다...',
        icon: 'info',
        customClass: {
          popup: 'custom-popup',
          title: 'custom-title',
          confirmButton: 'custom-button',
        },
        backdrop: `rgba(0, 0, 0, 0.5)`,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
    } else {
      // 로딩 종료 시 명확히 모달 닫기
      Swal.close();
    }

    return () => {
      // 컴포넌트 언마운트 시 모달 닫기
      Swal.close();
    };
  }, [isLoading]);

  const takePhoto = () => {
    const capturedPhoto = cameraRef.current.takePhoto();
    setPhoto(capturedPhoto);
    console.log('Captured photo URL:', capturedPhoto);
  };

  const handleBackClick = () => {
    navigate('/registration');
  };

  const handleRetakePhoto = () => {
    setPhoto(null);
  };

  const handleCheckClick = async () => {
    setIsLoading(true); // 로딩 시작

    try {
      const response = await axios.post(
        'http://localhost:8080/api/ocr/parseImage',
        null,
        {
          params: {
            imageUrl: photo,
          },
        }
      );

      console.log('OCR Full Response:', response.data);

      // disease 정보 저장
      const disease = response.data || '정보 없음';
      localStorage.setItem(
        'diseaseInfo',
        JSON.stringify({
          photo: photo,
          disease: disease,
        })
      );

      console.log(
        'Saved Disease Info:',
        JSON.parse(localStorage.getItem('diseaseInfo'))
      );

      setIsLoading(false); // 로딩 종료
      Swal.close(); // 모달 닫기
      navigate('/registration/disease');
    } catch (error) {
      console.error('Error during OCR request:', error);
      setIsLoading(false); // 에러 발생 시 로딩 종료
      Swal.close(); // 에러 발생 시 모달 닫기
    }
  };

  return (
    <AppContainer>
      <Header title="사진 등록" onBackClick={handleBackClick} />
      <div className="camera-container">
      <h3>약 이름이 보이게 찍어주세요</h3>
        {photo ? (
          <div className="captured-photo">
            <img src={photo} alt="캡처된 사진" />
            <div className="button-group">
              <button className="recapture-button" onClick={handleRetakePhoto}>
                다시찍기
              </button>
              <button className="check-button" onClick={handleCheckClick}>
                확인하기
              </button>
            </div>
          </div>
        ) : (
          <div className="video-container">
            <Camera ref={cameraRef} aspectRatio={3 / 4} className="camera-view" />
            <button className="capture-button" onClick={takePhoto}>
              사진찍기
            </button>
          </div>
        )}
      </div>
    </AppContainer>
  );
}

export default CameraPage;

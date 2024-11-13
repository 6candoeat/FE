import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import RegistrationTypeSelect from './RegistrationTypeSelect';
import '../styles/main.scss';
import '../App.css';
import AppContainer from '../components/AppContainer';
import logo from '../assets/logo.png';

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    // 5초 후에 로그인 페이지로 이동하는 타이머 설정
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1200);

    // 터치 이벤트 핸들러 설정
    const handleTouch = () => {
      clearTimeout(timer); // 타이머를 취소하여 중복 이동 방지
      navigate('/login');
    };

    // 터치 이벤트 리스너 등록
    window.addEventListener('touchstart', handleTouch);

    // 컴포넌트 언마운트 시 이벤트 리스너와 타이머 정리
    return () => {
      clearTimeout(timer);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [navigate]);

  return (
   <AppContainer>
      <img src={logo} alt="logo" className="logo" />
      <div className="main-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<RegistrationTypeSelect />} />
        </Routes>
      </div>
    </AppContainer>
  );
}

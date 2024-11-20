import { useState } from 'react';
import axios from 'axios';


const useLogin = () => {
  const [formData, setFormData] = useState({
    loginId: '',  
    password: '',
    autoLogin: false,
    saveId: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/member/login', {
        loginId: formData.loginId,  
        password: formData.password,
      });

      if (response.status === 200) {
        // 성공적으로 로그인했을 때
        const userData = response.data;
        localStorage.setItem('userInfo', JSON.stringify(userData));
        window.location.replace('/registration'); 
      } else {
        setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 401 
        setErrorMessage('아이디와 비밀번호가 일치하지 않습니다.');
      } else {
        // 다른 에러 처리
        setErrorMessage('서버와의 통신에 문제가 발생했습니다.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const closeModal = () => {
    setErrorMessage('');
  };
  
  return {
    formData,
    errorMessage,
    handleChange,
    handleSubmit,
    closeModal,
  };
};

export default useLogin;

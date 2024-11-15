import { useState } from 'react';
import mockUsers from '../mock/mockUsers';

const useLogin = () => {
  const [formData, setFormData] = useState({
    id: '',
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

  const handleLogin = () => {
    const user = mockUsers.find(
      (user) => user.id === formData.id && user.password === formData.password
    );

    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
      window.location.replace('/mypage'); // 로그인 후 MyPage로 이동
    } else {
      setErrorMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return {
    formData,
    errorMessage,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;

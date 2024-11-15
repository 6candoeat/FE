// useLogin.js
import { useState } from 'react';

const useLogin = () => {
  const dummyUsers = [
    { id: 'user1', password: '1234' },
    { id: 'user2', password: '1234' },
    { id: 'user3', password: '1234' }
  ];

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    autoLogin: false,
    saveId: false
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLogin = () => {
    const user = dummyUsers.find(user => user.id === formData.id && user.password === formData.password);

    if (user) {
      localStorage.setItem('userInfo', JSON.stringify({ id: user.id, password: user.password }));
      window.location.replace('/registration');
    } else {
      setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const closeModal = () => {
    setErrorMessage('');
    setFormData({
      id: '',
      password: '',
      autoLogin: formData.autoLogin,
      saveId: formData.saveId
    });
  };

  return {
    formData,
    errorMessage,
    handleChange,
    handleSubmit,
    closeModal
  };
};

export default useLogin;

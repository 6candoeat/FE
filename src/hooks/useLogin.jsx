import { useState } from 'react';

const useLogin = () => {
  // 여러 명의 더미 사용자 데이터
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
    // 입력된 아이디와 비밀번호를 더미 데이터 배열에서 찾기
    const user = dummyUsers.find(user => user.id === formData.id && user.password === formData.password);

      if (user) {
        // 로그인 성공 시 아이디와 비밀번호를 JSON 형태로 저장
        localStorage.setItem('userInfo', JSON.stringify({ id: user.id, password: user.password }));
        window.location.replace('/registration'); 
      
    } else {
      setErrorMessage('아이디와 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
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
    handleSubmit
  };
};

export default useLogin;

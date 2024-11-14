import React from 'react';
import useLogin from '../hooks/useLogin';
import '../styles/login.scss';
import '../App.css';
import AppContainer from '../components/AppContainer';
import InputField from '../components/InputField';

const Login = () => {
  const { formData, errorMessage, handleChange, handleSubmit } = useLogin();

  return (
    <AppContainer>
      <h1 className="app-title">닥터푸드</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          labelText="아이디"
          id="id"
          name="id"
          type="text"
          placeholder="아이디를 입력해주세요."
          value={formData.id}
          onChange={handleChange}
        />
        <InputField
          labelText="비밀번호"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={formData.password}
          onChange={handleChange}
        />
        <div className="options">
          <label>
            <input
              type="checkbox"
              name="autoLogin"
              checked={formData.autoLogin}
              onChange={handleChange}
            />
            자동 로그인
          </label>
          <label>
            <input
              type="checkbox"
              name="saveId"
              checked={formData.saveId}
              onChange={handleChange}
            />
            아이디 저장
          </label>
        </div>
       
        <div className="links">
          <button type="button" className="link-button">아이디 찾기</button> | 
          <button type="button" className="link-button">비밀번호 찾기</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">로그인</button>
        <button type="button" className="signup-button">회원가입</button>
      </form>
    </AppContainer>
  );
};

export default Login;

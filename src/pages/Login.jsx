import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import "../styles/login.scss";
import "../App.css";
import AppContainer from "../components/AppContainer";
import InputField from "../components/InputField";
import CheckBox from "../components/CheckBox";
import Modal from "../components/Modal";

const Login = () => {
  const navigate = useNavigate();
  const { formData, errorMessage, handleChange, handleSubmit, closeModal } = useLogin();

  useEffect(() => {
    // 로그인 정보가 로컬스토리지에 있으면, 로그인된 상태로 로그인 페이지에 다시 오면 localStorage 삭제
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      localStorage.removeItem("userInfo"); // 로그인 상태일 경우 로컬 스토리지에서 삭제
    }
  }, []);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <AppContainer>
      <h1 className="app-title">닥터푸드</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          labelText="아이디"
          id="loginId"
          name="loginId"
          type="text"
          placeholder="아이디를 입력해주세요."
          value={formData.loginId}
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
          <div className="option-group">
            <div className="option-label-auto">
              <CheckBox label="자동 로그인" name="autoLogin" checked={formData.autoLogin} onChange={handleChange} />
            </div>
            <div className="option-label-id-save">
              <CheckBox label="아이디 저장" name="saveId" checked={formData.saveId} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="links">
          <button type="button" className="link-button">
            아이디 찾기
          </button>{" "}
          |
          <button type="button" className="link-button">
            비밀번호 찾기
          </button>
        </div>
        <button type="submit" className="login-button">
          로그인
        </button>
        <button type="button" className="signup-button" onClick={handleSignupClick}>
          회원가입
        </button>
      </form>

      {/* 에러 메시지가 있을 때 모달 표시 */}
      {errorMessage && (
        <Modal message={errorMessage} onClose={closeModal}>
          <p>모든 입력 정보를 확인하세요!</p>
        </Modal>
      )}
    </AppContainer>
  );
};

export default Login;

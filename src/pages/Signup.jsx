import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import "../styles/signup.scss";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const steps = [
    { title: "회원가입", inputs: ["이름", "아이디", "비밀번호", "전화번호", "주소"] },
    { title: "신체 정보 입력", description: <>신체 정보를 입력해주세요</>, inputs: ["나이", "키", "몸무게"], options: ["남", "여"] },
    { title: "운동 빈도", description: <>일주일 동안 <br /> 얼마나 운동하시나요?</>, options: ["1회 이하", "2회 ~ 3회", "4회 이상"] },
    { title: "식단 관리 강도", description: <>어떤 식단 관리 방식이 <br /> 더 적합하신가요?</>, options: ["엄격한 관리", "일반 관리"] },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(steps.map(() => ({ inputs: {}, selectedOption: null })));

  const handleInputChange = (name, value) => {
    setFormData(prev => prev.map((stepData, index) =>
      index === currentStep ? { ...stepData, inputs: { ...stepData.inputs, [name]: value } } : stepData
    ));
  };

  const handleOptionChange = (option) => {
    setFormData(prev => prev.map((stepData, index) =>
      index === currentStep ? { ...stepData, selectedOption: option } : stepData
    ));
  };

  const saveToLocalStorageAndRegister = async () => {
    const genderMapping = {
      남: "MALE",
      여: "FEMALE",
    };

    const exerciseStatusMapping = {
      "1회 이하": "NONE",
      "2회 ~ 3회": "REGULAR",
      "4회 이상": "FREQUENT",
    };

    const dietControlMapping = {
      "엄격한 관리": "STRICT",
      "일반 관리": "NORMAL",
    };

    const signupData = {
      loginId: formData[0].inputs["아이디"] || "",
      password: formData[0].inputs["비밀번호"] || "",
      username: formData[0].inputs["이름"] || "",
      gender: genderMapping[formData[1].selectedOption] || "",
      age: formData[0].inputs["나이"] || "",
      userDisease: null, // 초기값
      phoneNum: formData[0].inputs["전화번호"] || "",
      height: formData[1].inputs["키"] || "",
      weight: formData[1].inputs["몸무게"] || "",
      userAddress: formData[0].inputs["주소"] || "",
      exerciseStatus: exerciseStatusMapping[formData[2].selectedOption] || "",
      dietControl: dietControlMapping[formData[3].selectedOption] || "",
      dailyEnergy: null,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/member/register", signupData);
      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      saveToLocalStorageAndRegister();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100; // 진행 상태 계산

  return (
    <AppContainer>
      <header className="sign-header">
        <h1 className="title">
          {steps[currentStep].title} <span className="step-indicator"> {currentStep + 1}/{steps.length}</span>
        </h1>
        <div className="step-indicator-container">
          <div className="step-indicator-progress" style={{ width: `${progress}%` }}></div>
        </div>
      </header>
      <div className="signup-content">
        <p className="signup-description">{steps[currentStep].description}</p>
        {steps[currentStep].inputs && steps[currentStep].inputs.map((input, index) => (
          <div key={index} className="input-field">
            <label>{input}</label>
            <input
              type="text"
              placeholder={`${input}을(를) 입력해주세요.`}
              value={formData[currentStep].inputs[input] || ""}
              onChange={(e) => handleInputChange(input, e.target.value)}
            />
          </div>
        ))}
        {steps[currentStep].options && (
          <div className="checkbox-group">
            {currentStep === 1 && <h3 className="options-title">성별</h3>} 
            {steps[currentStep].options.map((option, index) => (
              <label key={index} className="checkbox-option">
                <input
                  type="checkbox"
                  name={`step-${currentStep}`}
                  checked={formData[currentStep].selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="button-group">
        {currentStep > 0 && (
          <button className="signup-back-button" onClick={handleBack}>이전</button>
        )}
        <button className="signup-next-button" onClick={handleNext}>
          {currentStep === steps.length - 1 ? "가입 완료" : "다음"}
        </button>
      </div>
    </AppContainer>
  );
};

export default Signup;

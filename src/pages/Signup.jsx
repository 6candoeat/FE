import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import Header from "../components/header/Header";
import "../styles/signup.scss";

const Signup = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: "회원가입",
      inputs: ["이름", "아이디", "비밀번호", "전화번호", "주소"],
    },
    {
      title: "신체 정보 입력",
      description: "키와 몸무게를 입력해주세요",
      inputs: ["키", "몸무게"],
    },
    {
      title: "운동 빈도",
      description: (
        <>
          일주일 동안
          <br />
          얼마나 운동하시나요?
        </>
      ),
      options: ["1회 이하", "2회 ~ 3회", "4회 이상"],
    },
    {
      title: "식단 관리 강도",
      description: (
        <>
          식단 관리를
          <br />
          어느 정도로 추천해드릴까요?
        </>
      ),
      options: ["엄격한 관리", "일반 관리"],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(
    steps.map(() => ({
      inputs: {}, // 입력 데이터
      selectedOption: null, // 선택된 단일 옵션
    }))
  );

  const handleInputChange = (name, value) => {
    setFormData((prev) =>
      prev.map((stepData, index) =>
        index === currentStep ? { ...stepData, inputs: { ...stepData.inputs, [name]: value } } : stepData
      )
    );
  };

  const handleOptionChange = (option) => {
    setFormData((prev) =>
      prev.map((stepData, index) => (index === currentStep ? { ...stepData, selectedOption: option } : stepData))
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("회원가입 완료:", formData);
      navigate("/login");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AppContainer>
      <Header title={steps[currentStep].title} onBackClick={handleBack} />
      <div className="signup-content">
        <p className="signup-description">{steps[currentStep].description}</p>

        {steps[currentStep].inputs &&
          steps[currentStep].inputs.map((input, index) => (
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
            {steps[currentStep].options.map((option, index) => (
              <label key={index} className="checkbox-option">
                <input
                  type="radio"
                  name={`step-${currentStep}`} // 동일 그룹 내에서 단일 선택만 허용
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
          <button className="signup-back-button" onClick={handleBack}>
            이전
          </button>
        )}
        <button className="signup-next-button" onClick={handleNext}>
          {currentStep === steps.length - 1 ? "가입 완료" : "다음"}
        </button>
      </div>
    </AppContainer>
  );
};

export default Signup;

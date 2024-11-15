import React, { useState } from "react";
import AppContainer from "../components/AppContainer";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import InputField from "../components/InputField";
import BackButton from "../components/button/BackButton";
import "../styles/signup.scss";

const Signup = () => {
  const steps = [
    {
      title: "회원가입",
      description: "이름과 아이디를 입력해주세요",
      inputs: ["이름", "아이디", "비밀번호", "전화번호", "주소"],
    },
    {
      title: "신체 정보 입력",
      description: "키와 몸무게를 입력해주세요",
      inputs: ["키", "몸무게"],
    },
    {
      title: "운동 빈도",
      description: "일주일 동안 얼마나 운동하시나요?",
      options: ["1회 이하", "2회 ~ 3회", "4회 이상"],
    },
    {
      title: "식단 관리 강도",
      description: "식단 관리를 어느 정도로 추천해드릴까요?",
      options: ["엄격한 관리", "일반 관리"],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("회원가입 완료:", formData);
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
            <InputField
              key={index}
              placeholder={`${input}을(를) 입력해주세요.`}
              name={input}
              onChange={(e) => handleInputChange(input, e.target.value)}
            />
          ))}
        {steps[currentStep].options && (
          <div className="checkbox-group">
            {steps[currentStep].options.map((option, index) => (
              <label key={index} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData[option] || false}
                  onChange={() => handleInputChange(option, !formData[option])}
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
      <Footer />
    </AppContainer>
  );
};

export default Signup;

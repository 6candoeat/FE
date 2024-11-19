import React from "react";
import "../../styles/header.scss";
import BackButton from "../button/BackButton";

const Header = ({ title, onBackClick }) => {
  return (
    <header className="header">
      <BackButton className="back-button" onBackClick={onBackClick} />
      <h1 className="title">{title}</h1>
      <hr className="divider" />
    </header>
  );
};

export default Header;

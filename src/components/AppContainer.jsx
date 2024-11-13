import React from 'react';
import '../styles/appContainer.scss';

function AppContainer({ children }) {
  return <div className="white-frame">{children}</div>;
}

export default AppContainer;

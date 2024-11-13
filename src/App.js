import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import RegistrationTypeSelect from './pages/RegistrationTypeSelect'
import Mypage from './pages/Mypage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path='/registration' element={<RegistrationTypeSelect />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import RegistrationTypeSelect from "./pages/RegistrationTypeSelect";
import Mypage from "./pages/Mypage";
import Menues from "./pages/Menues";
import CameraPage from "./pages/CameraPage";
import MenueDetail from "./pages/MenueDetail";
import MenuMain from "./pages/MenuMain";
import KoreaStore from "./pages/KoreaStore";
import JapanStore from "./pages/JapanStore";
import ChinaStore from "./pages/ChinaStore";
import WesternStore from "./pages/WesternStore";
import AsiaStore from "./pages/AsiaStore";
import StarMenu from "./pages/StarMenu";
import Signup from "./pages/Signup";
import DiseasePage from "./pages/DiseasePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registration" element={<RegistrationTypeSelect />} />
        <Route path="/registration/disease" element={<DiseasePage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/menue" element={<Menues />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/menu/:id" element={<MenueDetail />} />
        <Route path="/menumain" element={<MenuMain />} />
        <Route path="/menumain/korea" element={<KoreaStore />} />
        <Route path="/menumain/japan" element={<JapanStore />} />
        <Route path="/menumain/china" element={<ChinaStore />} />
        <Route path="/menumain/western" element={<WesternStore />} />
        <Route path="/menumain/asia" element={<AsiaStore />} />
        <Route path="/menumain/star" element={<StarMenu />} />
      </Routes>
    </Router>
  );
}

export default App;

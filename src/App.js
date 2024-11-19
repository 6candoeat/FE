import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import RegistrationTypeSelect from "./pages/RegistrationTypeSelect";
import Mypage from "./pages/Mypage";
import Menues from "./pages/Menues";
import CameraPage from "./pages/CameraPage";
import MenueDetail from "./pages/MenueDetail";
import Signup from "./pages/Signup";
import DiseasePage from "./pages/DiseasePage";
import Stores from "./pages/Stores";
import Category from "./pages/Category";
import StarMenu from "./pages/StarMenu";

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
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/main-category" element={<Category />} />
        <Route path="/stores/:category" element={<Stores />} />
        <Route path="/menues/:storeId" element={<Menues />} />
        <Route path="/menu-detail/:id" element={<MenueDetail />} />
        <Route path="/recommendation/:id" element={<StarMenu />} />
      </Routes>
    </Router>
  );
}

export default App;

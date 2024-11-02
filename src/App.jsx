import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import SignIn from "./SignIn/Signin.jsx";
import SignUp from "./SignUp/Signup.jsx";
import Profile from "./Setting/Profile.jsx";
import Noti from "./Setting/Noti.jsx";
import Solar from "./SolarProMax/SolarProMax.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="setting/" element={<Profile />} />
        <Route path="setting/notification" element={<Noti />} />
        <Route path="solar" element={<Solar />} />
      </Routes>
    </BrowserRouter>
  );
}
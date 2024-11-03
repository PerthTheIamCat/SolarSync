import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import SignIn from "./SignIn/Signin.jsx";
import SignUp from "./SignUp/Signup.jsx";
import Profile from "./Setting/Profile.jsx";
import SettingEmail from "./Setting/Email.jsx";
import Noti from "./Setting/Noti.jsx";
import Solar from "./SolarProMax/SolarProMax.jsx";
import Weather from "./Weather/Weather.jsx";
import Timeline from "./Timeline/Timeline.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="setting/E-mail&Password" element={<SettingEmail/>} />
        <Route path="setting/" element={<Profile />} />
        <Route path="setting/notification" element={<Noti />} />
        <Route path="solar" element={<Solar />} />
        <Route path="weather" element={<Weather />} />
        <Route path="timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
}
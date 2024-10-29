import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import SignIn from "./Signin.jsx";
import SignUp from "./Signup.jsx";
import Profile from "./Setting/Profile.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
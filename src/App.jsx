import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import SignIn from "./SignIn.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
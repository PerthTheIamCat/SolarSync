import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
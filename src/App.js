import React from "react";
import "./App.css";
import Map from "./components/Map";
import { Routes, Route } from "react-router-dom";
import { useProvideAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const { state } = useProvideAuth();
  const { user } = state;

  return (
    <div className="App">
      <ToastContainer />
      {user && (
        <Routes>
          <Route path="/" element={<Map />} />
        </Routes>
      )}
      {!user && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

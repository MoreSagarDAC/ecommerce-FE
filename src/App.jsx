import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Button from "./framework/Button";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  const handleNavigation = () => {
    navigate(isLoginPage ? "/register" : "/login");
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
      >
        <Button
          label={isLoginPage ? "Switch to Register" : "Switch to Login"}
          onClick={handleNavigation}
          color="violet"
          sx={{ maxWidth: "200px" }}
        />
      </div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

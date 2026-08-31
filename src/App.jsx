import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import { Products } from "./pages/products/Products";
import Cart from "./components/Cart";
import AuthGuard from "./components/AuthGuard";
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Application Routes */}
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

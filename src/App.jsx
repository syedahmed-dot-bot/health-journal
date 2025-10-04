import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Journal from "./pages/Journal";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: "1rem", background: "#222", color: "white" }}>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Login</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

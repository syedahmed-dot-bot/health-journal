import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#1e1e1e",
        padding: "1rem 2rem",
        color: "#fff",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        Health Journal
      </div>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/journal" style={linkStyle}>
          Journal
        </Link>
        <button onClick={handleLogout} style={logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  cursor: "pointer",
};

const logoutButton = {
  background: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
};

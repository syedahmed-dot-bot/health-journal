import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#222",
        color: "#fff",
        padding: "1rem 2rem",
      }}
    >
      <h2> Pulse Journal</h2>
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>
          Dashboard
        </Link>
        <Link to="/journal" style={{ color: "#fff" }}>
          Journal
        </Link>
      </div>
    </nav>
  );
}

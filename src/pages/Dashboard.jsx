import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const fetchEntries = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/entries", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized or fetch failed");
        const data = await res.json();
        setEntries(data.entries || []);
      } catch (err) {
        console.error("Fetch error:", err);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      {/* Navbar always at the top */}
      <Navbar />

      {/* Main content */}
      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Dashboard</h1>

        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((e) => (
            <div
              key={e.id}
              style={{
                background: "#222",
                color: "#fff",
                padding: "1rem",
                margin: "1rem 0",
                borderRadius: "8px",
              }}
            >
              <strong>Entry #{e.id}</strong>
              <p>{e.text}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

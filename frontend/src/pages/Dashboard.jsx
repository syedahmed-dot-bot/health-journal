import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
        const res = await fetch("https://pulse-journal.onrender.com/entries", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) throw new Error("Unauthorized");
          throw new Error("Failed to fetch entries");
        }

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
  }, [navigate]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <Navbar />
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
        <button
          style={{
            background: "#f44336",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

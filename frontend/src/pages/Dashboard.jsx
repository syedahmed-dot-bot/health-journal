import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/entries");
        const data = await res.json();
        setEntries(data.entries || []);
      } catch (err) {
        console.error("Error fetching entries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

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
      </div>
    </>
  );
}

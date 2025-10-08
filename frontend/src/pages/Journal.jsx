import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE = "http://127.0.0.1:8000"; // adjust if needed

export default function Journal() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [insight, setInsight] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("Saving...");
    setInsight("");

    try {
      // 1️ Save the entry
      const res = await fetch(`${API_BASE}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text }),
      });

      if (!res.ok) throw new Error("Failed to save entry");
      const entryData = await res.json();

      setMessage("Entry saved successfully!");

      // 2️ Generate AI insight (send proper JSON)
      const insightRes = await fetch(`${API_BASE}/insight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const insightData = await insightRes.json();
      setInsight(insightData.insight || "No insight generated.");

      const entriesRes = await fetch(`${API_BASE}/entries`);
      const entriesData = await entriesRes.json();

      if (entriesData.entries.length % 3 === 0) {
        const summaryRes = await fetch(`${API_BASE}/summary`, {
          method: "POST",
      });

      const summaryData = await summaryRes.json();
      alert("Your digital friend's reflection on your mood for the last 3 times: \n\n" + summaryData.summary);}

      setText("");
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error saving entry or generating insight.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1>New Journal Entry</h1>
        <form onSubmit={handleSave}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts..."
            required
            style={{
              width: "100%",
              height: "150px",
              padding: "1rem",
              borderRadius: "8px",
              border: "none",
              marginBottom: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>

        {message && <p style={{ marginTop: "1rem", color: "#4caf50" }}>{message}</p>}
        {insight && (
          <p style={{ marginTop: "1rem", color: "#2196f3", fontStyle: "italic" }}>
            💡 {insight}
          </p>
        )}

        <button
          style={{
            marginTop: "1rem",
            background: "#f70e5b",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </>
  );
}

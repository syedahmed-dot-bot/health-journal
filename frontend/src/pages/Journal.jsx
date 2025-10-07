import Navbar from "../components/Navbar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Journal() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const res = await fetch("https://pulse-journal.onrender.com/entries", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: new URLSearchParams({text: entryText}),
      });

      if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Failed to save entry");
      }
      const data = await res.json();
      console.log("Saved Entry", data);
      alert ("Entry Saved!");
    } catch (err) {
      console.error("Error saving entry", err);
      setMessage("Error saving entry.");
    }
  };

  return (
    <>
      <Navbar />
      <div
      style={{
        minHeight: "100vh",
        background: "#b8e4bcff",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <h1>Journal</h1>
      <form onSubmit={handleSubmit}>
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
            padding: "0.5rem 1.2rem",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Entry
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "1rem", color: "#4caf50" }}>{message}</p>
      )}
      <button
        style={{
          marginTop: "1rem",
          background: "#f70e5bff",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
    </>
  );
}

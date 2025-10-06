import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) navigate ("/dashboard");
}, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch("https://pulse-journal.onrender.com/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Check your username and password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        color: "#fff",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#222",
          padding: "2rem",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "none",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "none",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#4caf50",
            border: "none",
            padding: "0.7rem",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        {error && (
          <p style={{ color: "#f44336", marginTop: "1rem", fontSize: "0.9rem" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

import { useState } from "react";

export default function Journal () {
    const {text, setText} = useState("");
    return (
        <div style = {{padding: "2rem", maxWidth: "700px", "margin": "0 auto"}}>
            <h1>Daily Journal</h1>
            <p style={{ color: "#aaa", fontSize: "0.9rem"}}>
                Writing your thoughts below. Nothing is saved yet.
            </p>

            <textarea
                style = {{
                    width: "100%",
                    minHeight: "300px",
                    marginTop: "1rem",
                    padding: "1rem",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    background: "#222",
                    color: "#eee",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    resize: "vertical"
                }}
                placeholder= "Dear Diary..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                />

                <div 
                style = {{
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#333",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    color: "#ccc"
                }}>

                    <strong>Preview:</strong>
                    <p>{text || "Start typing above to preview your entry here."} </p>
                </div>
            </div>
    );
}


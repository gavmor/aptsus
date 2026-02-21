import React, { useState } from "react";

export default function App(): React.JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        color: "#1a202c",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1>Aptsus App</h1>
      <p>A simple React app with Vite</p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          count is {count}
        </button>
      </div>
    </div>
  );
}

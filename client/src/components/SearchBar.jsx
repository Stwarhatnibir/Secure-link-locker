import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="field-wrapper" style={{ flex: 1, maxWidth: 380 }}>
      <div style={{ position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search vault..."
          className="field-input"
          style={{ paddingLeft: "1.5rem" }}
        />
      </div>
    </div>
  );
}

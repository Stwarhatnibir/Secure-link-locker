import React from "react";

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginTop: "1rem",
      }}
    >
      {categories.map((cat) => {
        const isActive = active === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            style={{
              fontFamily: "DM Mono",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.3rem 0.85rem",
              cursor: "pointer",
              border: "1px solid",
              transition: "all 0.2s ease",
              borderColor: isActive ? "var(--burgundy)" : "rgba(55,9,11,0.15)",
              background: isActive ? "var(--burgundy)" : "transparent",
              color: isActive ? "var(--cream)" : "var(--text-muted)",
              transform: isActive ? "none" : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "rgba(55,9,11,0.35)";
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.background = "rgba(55,9,11,0.04)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = "rgba(55,9,11,0.15)";
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

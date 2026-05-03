import React from "react";

export default function EmptyState({ onAdd, hasSearch }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 2rem",
        textAlign: "center",
      }}
    >
      {/* Decorative box */}
      <div
        style={{
          width: 64,
          height: 64,
          border: "1px solid rgba(55,9,11,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
          position: "relative",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            width: 12,
            height: 12,
            borderTop: "2px solid var(--burgundy)",
            borderLeft: "2px solid var(--burgundy)",
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: 12,
            height: 12,
            borderBottom: "2px solid var(--burgundy)",
            borderRight: "2px solid var(--burgundy)",
            opacity: 0.4,
          }}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(55,9,11,0.3)"
          strokeWidth="1.5"
        >
          <rect x="3" y="11" width="18" height="11" rx="1" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h3
        style={{
          fontFamily: "Cormorant Garamond",
          fontSize: "1.6rem",
          fontWeight: 400,
          fontStyle: "italic",
          color: "var(--burgundy)",
          marginBottom: "0.5rem",
        }}
      >
        {hasSearch ? "Nothing found." : "Your vault awaits."}
      </h3>

      <p
        style={{
          fontFamily: "Syne",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          maxWidth: 280,
          lineHeight: 1.7,
          marginBottom: "2rem",
        }}
      >
        {hasSearch
          ? "No items match your search. Try different keywords or clear the filter."
          : "Add links, notes, logins, and sensitive credentials — all encrypted and organized."}
      </p>

      {!hasSearch && (
        <button
          onClick={onAdd}
          className="btn-primary"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Add First Item</span>
        </button>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

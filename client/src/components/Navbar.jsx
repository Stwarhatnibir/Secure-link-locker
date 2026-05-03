import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ user, itemCount }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function h(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <header
      style={{
        background: "var(--cream)",
        borderBottom: "1px solid rgba(55,9,11,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "var(--burgundy)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F2F2D8"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "1.05rem",
              fontWeight: 500,
              color: "var(--burgundy)",
              letterSpacing: "0.02em",
            }}
          >
            Secure Link Locker
          </span>
        </div>

        {/* Center — item count badge */}
        <div
          style={{
            fontFamily: "DM Mono",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--burgundy)",
              opacity: 0.4,
              display: "inline-block",
            }}
          />
          {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"} IN VAULT
        </div>

        {/* User dropdown */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "1px solid rgba(55,9,11,0.15)",
              padding: "0.35rem 0.75rem",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(55,9,11,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(55,9,11,0.15)")
            }
          >
            <div
              style={{
                width: 24,
                height: 24,
                background: "var(--burgundy)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Syne",
                fontSize: "0.6rem",
                fontWeight: 700,
                color: "var(--cream)",
                letterSpacing: "0.05em",
              }}
            >
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <span
              style={{
                fontFamily: "Syne",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                maxWidth: 120,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.name}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
              style={{
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {open && (
            <div
              className="animate-fade-in"
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 6px)",
                width: 200,
                background: "var(--cream)",
                border: "1px solid rgba(55,9,11,0.15)",
                boxShadow: "0 8px 24px rgba(55,9,11,0.1)",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid rgba(55,9,11,0.08)",
                }}
              >
                <p
                  style={{
                    fontFamily: "DM Mono",
                    fontSize: "0.62rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user?.email}
                </p>
              </div>
              <button
                onClick={logout}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  background: "none",
                  border: "none",
                  fontFamily: "Syne",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--burgundy)";
                  e.currentTarget.style.background = "rgba(55,9,11,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "none";
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

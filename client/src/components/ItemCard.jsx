import React, { useState } from "react";
import {
  CATEGORY_COLORS,
  getCategoryLabel,
  formatDate,
} from "../utils/categories";

const CATEGORY_ICONS = {
  login: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  note: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  link: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  card: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  identity: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <line x1="13" y1="10" x2="19" y2="10" />
      <line x1="13" y1="14" x2="19" y2="14" />
    </svg>
  ),
  other: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

export default function ItemCard({ item, onEdit, onDelete, index = 0 }) {
  const [deleting, setDeleting] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [hovered, setHovered] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setDeleting(true);
    try {
      await onDelete(item._id);
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div
      className={`vault-card animate-fade-up stagger-${Math.min(index + 1, 6)}`}
      style={{ padding: "1.25rem 1.5rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {/* Category badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "DM Mono",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.18rem 0.55rem",
              background: "rgba(55,9,11,0.06)",
              color: "var(--text-secondary)",
              border: "1px solid rgba(55,9,11,0.12)",
            }}
          >
            {CATEGORY_ICONS[item.category]}
            {getCategoryLabel(item.category)}
          </span>
          {item.isSensitive && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                fontFamily: "DM Mono",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.18rem 0.55rem",
                background: "rgba(55,9,11,0.08)",
                color: "var(--burgundy)",
                border: "1px solid rgba(55,9,11,0.2)",
              }}
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Encrypted
            </span>
          )}
        </div>

        {/* Actions — always visible but subtle */}
        <div
          style={{
            display: "flex",
            gap: 4,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <button
            onClick={() => onEdit(item)}
            title="Edit"
            style={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "1px solid rgba(55,9,11,0.15)",
              cursor: "pointer",
              color: "var(--text-muted)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(55,9,11,0.06)";
              e.currentTarget.style.color = "var(--burgundy)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete"
            style={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "1px solid rgba(55,9,11,0.15)",
              cursor: "pointer",
              color: "var(--text-muted)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(55,9,11,0.08)";
              e.currentTarget.style.color = "var(--burgundy)";
              e.currentTarget.style.borderColor = "rgba(55,9,11,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "rgba(55,9,11,0.15)";
            }}
          >
            {deleting ? (
              <span
                style={{
                  width: 10,
                  height: 10,
                  border: "1.5px solid rgba(55,9,11,0.3)",
                  borderTopColor: "var(--burgundy)",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                }}
              />
            ) : (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "Cormorant Garamond",
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "var(--burgundy)",
          lineHeight: 1.2,
          marginBottom: "0.6rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.title}
      </h3>

      {/* URL */}
      {item.url && (
        <a
          href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "DM Mono",
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            marginBottom: "0.6rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            letterSpacing: "0.03em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--burgundy)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {item.url}
        </a>
      )}

      {/* Note */}
      {item.note && (
        <div style={{ marginTop: "0.5rem" }}>
          {item.isSensitive ? (
            <>
              <button
                onClick={() => setShowNote(!showNote)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "DM Mono",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  transition: "color 0.2s",
                  padding: 0,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--burgundy)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {showNote ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
                {showNote ? "Conceal" : "Reveal"} note
              </button>
              {showNote && (
                <div
                  className="animate-fade-in"
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.75rem",
                    background: "rgba(55,9,11,0.04)",
                    borderLeft: "2px solid rgba(55,9,11,0.15)",
                    fontFamily: "DM Mono",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    wordBreak: "break-all",
                    lineHeight: 1.6,
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.note}
                </div>
              )}
            </>
          ) : (
            <p
              style={{
                fontFamily: "Syne",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.note}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "1rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(55,9,11,0.07)",
          fontFamily: "DM Mono",
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
          opacity: 0.7,
        }}
      >
        {formatDate(item.createdAt)}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

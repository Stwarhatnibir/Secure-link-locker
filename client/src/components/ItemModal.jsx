import React, { useState, useEffect, useRef } from "react";
import { CATEGORIES } from "../utils/categories";

export default function ItemModal({ item, onSave, onClose }) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    note: "",
    category: "other",
    isSensitive: false,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || "",
        url: item.url || "",
        note: item.note || "",
        category: item.category || "other",
        isSensitive: !!item.isSensitive,
      });
    }
    setTimeout(() => titleRef.current?.focus(), 100);
  }, [item]);

  useEffect(() => {
    function h(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setError("");
  }

  function toggleSensitive() {
    setForm((p) => ({ ...p, isSensitive: !p.isSensitive }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave({
        title: form.title.trim(),
        url: form.url.trim() || null,
        note: form.note.trim() || null,
        category: form.category,
        isSensitive: form.isSensitive,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save.");
      setSaving(false);
    }
  }

  const nonAllCats = CATEGORIES.filter((c) => c.value !== "all");

  return (
    <div
      ref={overlayRef}
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        className="animate-fade-up"
        style={{
          width: "100%",
          maxWidth: 520,
          background: "var(--cream)",
          border: "1px solid rgba(55,9,11,0.15)",
          boxShadow: "0 32px 64px rgba(55,9,11,0.25)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.75rem",
            borderBottom: "1px solid rgba(55,9,11,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "DM Mono",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                marginBottom: 4,
                textTransform: "uppercase",
              }}
            >
              {item ? "Edit entry" : "New entry"}
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "var(--burgundy)",
              }}
            >
              {item ? "Update Item" : "Add to Vault"}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "1px solid rgba(55,9,11,0.12)",
              cursor: "pointer",
              color: "var(--text-muted)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(55,9,11,0.05)";
              e.currentTarget.style.color = "var(--burgundy)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "1.75rem" }}>
          {error && (
            <div
              className="animate-fade-in"
              style={{
                marginBottom: "1.25rem",
                padding: "0.75rem 1rem",
                background: "rgba(55,9,11,0.05)",
                borderLeft: "2px solid var(--burgundy)",
                fontFamily: "DM Mono",
                fontSize: "0.7rem",
                color: "var(--burgundy)",
                letterSpacing: "0.02em",
              }}
            >
              {error}
            </div>
          )}

          {/* Title */}
          <div className="field-wrapper" style={{ marginBottom: "1.5rem" }}>
            <label className="field-label">Title</label>
            <input
              ref={titleRef}
              className="field-input"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. GitHub Login"
              required
            />
          </div>

          {/* Category */}
          <div className="field-wrapper" style={{ marginBottom: "1.5rem" }}>
            <label className="field-label">Category</label>
            <select
              className="field-input"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {nonAllCats.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* URL */}
          <div className="field-wrapper" style={{ marginBottom: "1.5rem" }}>
            <label className="field-label">URL (optional)</label>
            <input
              className="field-input"
              name="url"
              type="text"
              value={form.url}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          {/* Note */}
          <div className="field-wrapper" style={{ marginBottom: "1.5rem" }}>
            <label className="field-label">
              Note{form.isSensitive && " — will be encrypted"}
            </label>
            <textarea
              className="field-input"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Credentials, notes, or sensitive data..."
              rows={4}
              style={{
                resize: "vertical",
                lineHeight: 1.6,
                fontFamily: form.isSensitive ? "DM Mono" : "Syne",
              }}
            />
          </div>

          {/* Sensitive toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.9rem 1rem",
              background: "rgba(55,9,11,0.03)",
              border: "1px solid rgba(55,9,11,0.08)",
              marginBottom: "1.75rem",
              cursor: "pointer",
            }}
            onClick={toggleSensitive}
          >
            <div>
              <p
                style={{
                  fontFamily: "Syne",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: 2,
                }}
              >
                Mark as sensitive
              </p>
              <p
                style={{
                  fontFamily: "DM Mono",
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                Encrypts note with AES-256-GCM before storage
              </p>
            </div>
            <div
              className={`toggle-track ${form.isSensitive ? "active" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="toggle-thumb" />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {saving && (
                <span
                  style={{
                    width: 13,
                    height: 13,
                    border: "1.5px solid rgba(242,242,216,0.3)",
                    borderTopColor: "#F2F2D8",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              )}
              <span>{item ? "Save Changes" : "Add Item"}</span>
            </button>
          </div>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

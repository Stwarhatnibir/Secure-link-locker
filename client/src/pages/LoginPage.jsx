import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

function FieldInput({ label, ...props }) {
  return (
    <div className="field-wrapper" style={{ marginBottom: "1.75rem" }}>
      <label className="field-label">{label}</label>
      <input className="field-input" {...props} />
    </div>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome back." subtitle="Sign in to your vault">
      <form onSubmit={handleSubmit}>
        {error && (
          <div
            className="animate-fade-in mb-6 px-4 py-3 text-sm font-mono"
            style={{
              background: "rgba(55,9,11,0.06)",
              borderLeft: "2px solid var(--burgundy)",
              color: "var(--burgundy)",
              fontSize: "0.75rem",
              letterSpacing: "0.02em",
            }}
          >
            {error}
          </div>
        )}

        <FieldInput
          label="Email address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <FieldInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? (
            <span
              style={{
                width: 14,
                height: 14,
                border: "1.5px solid rgba(242,242,216,0.3)",
                borderTopColor: "#F2F2D8",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }}
            />
          ) : null}
          <span>Sign in</span>
        </button>

        <p
          className="mt-8 text-center"
          style={{
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            fontFamily: "Syne",
          }}
        >
          No account?{" "}
          <Link
            to="/signup"
            style={{
              color: "var(--burgundy)",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Create one
          </Link>
        </p>
      </form>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </AuthLayout>
  );
}

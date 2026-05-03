import React, { useEffect, useRef } from "react";

export default function AuthLayout({ children, title, subtitle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(55,9,11,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "var(--burgundy)" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
        />

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 128 128" fill="none">
            <path d="M0 0 L128 0 L0 128 Z" fill="#F2F2D8" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
          <svg viewBox="0 0 192 192" fill="none">
            <path d="M192 192 L0 192 L192 0 Z" fill="#F2F2D8" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ border: "1px solid rgba(242,242,216,0.3)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F2F2D8"
                strokeWidth="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(242,242,216,0.6)", fontFamily: "Syne" }}
            >
              Secure Link Locker
            </span>
          </div>
        </div>

        <div className="relative z-10">
          <p
            className="font-display text-5xl leading-tight mb-6"
            style={{ color: "#F2F2D8", fontWeight: 300, fontStyle: "italic" }}
          >
            Your vault,
            <br />
            <span style={{ color: "rgba(242,242,216,0.5)" }}>perfectly</span>
            <br />
            sealed.
          </p>
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(242,242,216,0.3)",
            }}
          />
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{
              color: "rgba(242,242,216,0.45)",
              fontFamily: "Syne",
              maxWidth: 260,
            }}
          >
            End-to-end encrypted storage for links, notes, and sensitive
            credentials.
          </p>
        </div>

        <div className="relative z-10 flex gap-8">
          {["AES-256", "JWT Auth", "Encrypted"].map((t) => (
            <div key={t}>
              <p
                className="font-mono text-xs"
                style={{
                  color: "rgba(242,242,216,0.3)",
                  letterSpacing: "0.1em",
                }}
              >
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-12"
        style={{ background: "var(--cream)" }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{ background: "var(--burgundy)" }}
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
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--text-muted)", fontFamily: "Syne" }}
            >
              Secure Link Locker
            </span>
          </div>

          <div className="animate-fade-up">
            <p
              className="font-mono text-xs mb-3"
              style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}
            >
              — {subtitle}
            </p>
            <h1
              className="font-display mb-8"
              style={{
                fontSize: "2.8rem",
                fontWeight: 400,
                color: "var(--burgundy)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>

            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, var(--burgundy), transparent)",
                marginBottom: "2.5rem",
                opacity: 0.2,
              }}
            />

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

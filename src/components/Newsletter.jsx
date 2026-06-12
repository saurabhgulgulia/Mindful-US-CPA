import React from 'react';
import { Icon } from './Icon.jsx';

function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{ padding: "var(--space-8) 0", background: "var(--brand-navy)", color: "var(--paper)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -100, top: -60, width: 280, height: 280, borderRadius: "50% 42% 50% 45% / 45% 50% 42% 50%", background: "var(--brand-gold)", opacity: 0.18, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "var(--space-7)", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--brand-gold)", marginBottom: "var(--space-3)" }}>
              The Mindful Letter
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 500, color: "var(--paper)", margin: "0 0 var(--space-3)", letterSpacing: "-0.01em", lineHeight: 1.15, maxWidth: "20ch" }}>
              One quiet email each month. No pitch, no noise.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.72)", lineHeight: 1.55, margin: 0, maxWidth: "44ch" }}>
              IRS deadline reminders, treaty updates that actually matter, and the occasional clear, considered note
              from a CPA about something we wish more clients knew.
            </p>
          </div>
          {submitted ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.08)", padding: "var(--space-5)", borderRadius: 12, border: "1px solid rgba(201,162,74,.3)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--brand-gold-soft)", color: "var(--brand-navy)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check" size={20} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--paper)", marginBottom: 4 }}>Thank you.</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>Your first letter arrives at the next month-end.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", gap: 0, alignItems: "stretch", background: "var(--paper)", borderRadius: 8, padding: 4, boxShadow: "0 4px 12px rgba(0,0,0,.15)" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ flex: 1, border: "none", outline: "none", padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 16, background: "transparent", color: "var(--ink)" }}
              />
              <button type="submit" className="btn btn-primary" style={{ borderRadius: 6 }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export { Newsletter };

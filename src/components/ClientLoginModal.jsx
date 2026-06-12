import React from 'react';
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';
import { Icon } from './Icon.jsx';
import { IMG } from '../images.js';

function ClientLoginModal({ open, onClose, onSignedIn }) {
  const [mode, setMode] = React.useState("login"); // "login" | "signup"
  const [form, setForm] = React.useState({
    email: "",
    phone: "",
    clientId: "",
    password: "",
    service: "US Expat Returns",
  });
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setMode("login");
      setSubmitted(false);
      setForm({ email: "", phone: "", clientId: "", password: "", service: "US Expat Returns" });
    }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // After short success-pause, sign in to the dashboard
    setTimeout(() => {
      if (onSignedIn) onSignedIn({
        name: form.email ? form.email.split("@")[0].replace(/[._]/g, " ") : "Client",
        email: form.email || "you@example.com",
      });
    }, 1100);
  };

  const SERVICES = [
    "US Expat Returns",
    "Personal Returns",
    "Entity / Corporate Returns",
    "Streamlined Filing",
    "Bookkeeping & Accounting",
    "State Compliance",
    "Payroll & 1099 Filings",
    "Auditing & Attestation",
    "Tax Planning",
    "CPA Consulting",
    "Other",
  ];

  return (
    <React.Fragment>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(14,34,64,0.55)",
          backdropFilter: "blur(6px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 220ms cubic-bezier(.22,.61,.36,1)",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -48%) scale(0.97)",
          width: "min(480px, 92vw)",
          maxHeight: "92vh",
          overflow: "auto",
          background: "var(--cream)",
          borderRadius: 20,
          zIndex: 201,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 280ms cubic-bezier(.22,.61,.36,1), opacity 200ms ease",
          boxShadow: "0 32px 80px rgba(14,34,64,0.30)",
          border: "1px solid var(--rule-soft)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "var(--space-6) var(--space-7) var(--space-4)",
          borderBottom: "1px solid var(--rule-soft)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 12, right: 12,
              background: "none", border: "none", cursor: "pointer",
              color: "var(--ink-2)", padding: 6, borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-2)"; e.currentTarget.style.color = "var(--brand-navy)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--ink-2)"; }}
          >
            <Icon name="x" size={20} />
          </button>

          {/* Brand mark */}
          <img src={IMG["logo-mark-splash"]} alt="" style={{ width: 56, height: 56, objectFit: "contain", marginBottom: 10 }} />

          <div className="section-eyebrow" style={{ marginBottom: 6 }}>
            {mode === "login" ? "Client portal" : "Create your account"}
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 500,
            color: "var(--brand-navy)",
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.005em",
          }}>
            {mode === "login" ? "Welcome back." : "Get started with us."}
          </h2>
          <p style={{
            fontSize: 14,
            color: "var(--ink-2)",
            margin: "10px 0 0",
            lineHeight: 1.5,
            maxWidth: "36ch",
          }}>
            {mode === "login"
              ? "Sign in to upload documents, sign engagements, and message your CPA."
              : "Create a secure account and tell us which service you're starting with."}
          </p>
        </div>

        {/* Body */}
        {submitted ? (
          <div style={{
            padding: "var(--space-7) var(--space-7)",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "var(--brand-gold-soft)",
              color: "var(--brand-gold-deep)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="check" size={28} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--brand-navy)", lineHeight: 1.2 }}>
              {mode === "login" ? "Signed in." : "Account created."}
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0, maxWidth: "32ch" }}>
              {mode === "login"
                ? "Taking you to the portal now."
                : <>We've set up your account. Your assigned <strong style={{ color: "var(--brand-navy)" }}>{form.service}</strong> CPA will be in touch within one business day.</>
              }
            </p>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ marginTop: 10 }}>
              Continue
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: "var(--space-6) var(--space-7) var(--space-5)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {/* Mode toggle (segmented) */}
              <div style={{
                display: "inline-flex",
                padding: 4,
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                borderRadius: 8,
                width: "100%",
                marginBottom: 6,
              }}>
                {["login", "signup"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 600,
                      background: mode === m ? "var(--brand-navy)" : "transparent",
                      color: mode === m ? "var(--paper)" : "var(--ink-2)",
                      transition: "all var(--dur) var(--ease)",
                    }}
                  >
                    {m === "login" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="field-input"
                />
              </Field>

              {mode === "signup" && (
                <Field label="Contact number" required>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="field-input"
                  />
                </Field>
              )}

              <Field label={mode === "signup" ? "Client ID (assigned by us, if any)" : "Client ID"} required={mode === "login"}>
                <input
                  type="text"
                  value={form.clientId}
                  onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                  placeholder={mode === "signup" ? "Optional — leave blank if new" : "e.g. MUC-00482"}
                  className="field-input"
                />
              </Field>

              <Field label="Password" required>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
                  className="field-input"
                />
              </Field>

              {mode === "signup" && (
                <Field label="Which service are you starting with?" required>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="field-select"
                  >
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              )}

              {mode === "login" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -2 }}>
                  <a href="#" style={{
                    fontSize: 12, color: "var(--brand-gold-deep)", textDecoration: "underline",
                    textDecorationColor: "var(--brand-gold)", textUnderlineOffset: 3,
                  }}>
                    Forgot password?
                  </a>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ marginTop: "var(--space-3)", width: "100%", justifyContent: "center" }}>
                {mode === "login" ? "Sign in to portal" : "Create account"}
                <Icon name="arrow-right" size={16} />
              </button>

              <p style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", margin: "12px 0 0", lineHeight: 1.5 }}>
                {mode === "login"
                  ? <>New here? <button type="button" onClick={() => setMode("signup")} style={{ background: "none", border: "none", padding: 0, color: "var(--brand-navy)", textDecoration: "underline", textDecorationColor: "var(--brand-gold)", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", textUnderlineOffset: 3 }}>Create an account</button></>
                  : <>Have an account? <button type="button" onClick={() => setMode("login")} style={{ background: "none", border: "none", padding: 0, color: "var(--brand-navy)", textDecoration: "underline", textDecorationColor: "var(--brand-gold)", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", textUnderlineOffset: 3 }}>Sign in</button></>
                }
              </p>
            </div>
          </form>
        )}

        {/* Footer security note */}
        {!submitted && (
          <div style={{
            padding: "var(--space-4) var(--space-7)",
            borderTop: "1px solid var(--rule-soft)",
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, color: "var(--ink-3)",
            background: "var(--cream-2)",
            borderRadius: "0 0 20px 20px",
          }}>
            <span style={{ color: "var(--brand-gold-deep)" }}><Icon name="lock" size={14} /></span>
            <span>End-to-end encrypted. We never email tax records.</span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

function Field({ label, required, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--brand-navy)" }}>
        {label}{required ? <span style={{ color: "var(--brand-gold-deep)", marginLeft: 4 }}>*</span> : null}
      </span>
      {children}
    </label>
  );
}

export { ClientLoginModal };

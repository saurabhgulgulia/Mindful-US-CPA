import React from 'react';
import { Icon } from './Icon.jsx';
import { IMG } from '../images.js';

const CHECKLISTS = [
  {
    id: "tax-return",
    label: "Tax Return Preparation",
    title: "US Expat Tax Return Documents Checklist",
    subtitle: "Everything we'll ask you for — laid out plainly, so you can gather it without a last-minute scramble.",
    bullets: [
      "Personal & dependent identification",
      "Income documents (W-2, 1099, foreign equivalents)",
      "Foreign earned income & housing expenses",
      "Foreign tax paid & receipts",
      "Foreign bank & investment account statements",
      "Schedule-relevant docs: property, business, K-1s",
    ],
  },
  {
    id: "tax-planning",
    label: "Tax Planning",
    title: "Expat Tax Planning Documents Checklist",
    subtitle: "If you're considering a move, a sale, or a major financial event — this is the document set we work from.",
    bullets: [
      "Anticipated income & residency dates",
      "Equity compensation grants & vesting schedules",
      "Foreign retirement & pension account details",
      "Property holdings & sale projections",
      "Existing trust, estate & charitable structures",
      "Prior-year returns (US + foreign)",
    ],
  },
];

function ChecklistDownload() {
  const [active, setActive] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const c = CHECKLISTS[active];

  return (
    <section className="section" id="checklist" style={{ background: "var(--cream-2)" }}>
      <div className="container">
        <div style={{
          background: "var(--cream)",
          borderRadius: 24,
          padding: "var(--space-9) var(--space-9) var(--space-8)",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "var(--space-8)",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--rule-soft)",
        }}>
          {/* Soft background gold blob in corner */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: -120, left: -120,
            width: 360, height: 360,
            background: "radial-gradient(circle, #e8d49a 0%, transparent 70%)",
            opacity: 0.5,
            pointerEvents: "none",
          }} />

          {/* Left: copy + form */}
          <div style={{ position: "relative" }}>
            <div className="section-eyebrow">Free download</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 3.6vw, 44px)",
              fontWeight: 500,
              color: "var(--brand-navy)",
              margin: "0 0 var(--space-4)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              maxWidth: "18ch",
            }}>
              {c.title}
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 var(--space-5)", maxWidth: "44ch" }}>
              {c.subtitle}
            </p>

            {/* Toggle between checklist types */}
            <div style={{ display: "inline-flex", padding: 4, background: "var(--paper)", border: "1px solid var(--rule)", borderRadius: 8, marginBottom: "var(--space-5)" }}>
              {CHECKLISTS.map((cl, i) => (
                <button
                  key={cl.id}
                  type="button"
                  onClick={() => { setActive(i); setSubmitted(false); }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    background: active === i ? "var(--brand-navy)" : "transparent",
                    color: active === i ? "var(--paper)" : "var(--ink-2)",
                    transition: "all var(--dur) var(--ease)",
                  }}
                >
                  {cl.label}
                </button>
              ))}
            </div>

            {/* What's inside */}
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 var(--space-6)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 24px",
            }}>
              {c.bullets.map((b) => (
                <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, lineHeight: 1.45, color: "var(--ink)" }}>
                  <span style={{ color: "var(--brand-gold-deep)", flexShrink: 0, paddingTop: 2 }}>
                    <Icon name="check" size={14} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Form */}
            {submitted ? (
              <div style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                padding: "var(--space-5)",
                background: "var(--paper)",
                border: "1px solid var(--brand-gold)",
                borderRadius: 12,
                maxWidth: 480,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "var(--brand-gold-soft)",
                  color: "var(--brand-gold-deep)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon name="check" size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 19, color: "var(--brand-navy)", marginBottom: 2 }}>Check your inbox.</div>
                  <div style={{ fontSize: 14, color: "var(--ink-2)" }}>
                    The checklist is on its way to <strong style={{ color: "var(--brand-navy)" }}>{email}</strong>.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", gap: 12, maxWidth: 480, alignItems: "stretch" }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    padding: "12px 16px",
                    border: "1px solid var(--rule)",
                    borderRadius: 8,
                    background: "var(--paper)",
                    color: "var(--ink)",
                    outline: "none",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--brand-navy)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,74,.25)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button type="submit" className="btn btn-primary">
                  Get the checklist
                </button>
              </form>
            )}

            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: "var(--space-3)", lineHeight: 1.5 }}>
              No marketing list. We send the PDF, then leave you alone. Unsubscribe is automatic.
            </p>
          </div>

          {/* Right: circular hero photo */}
          <div style={{ position: "relative", aspectRatio: "1 / 1", maxWidth: 480, justifySelf: "end" }}>
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(14,34,64,.18)",
              border: "1px solid var(--rule-soft)",
              position: "relative",
            }}>
              <img
                src={IMG["checklist-hero"]}
                alt="Traveler at a mountain vista"
                style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
            {/* Decorative orbiting ring */}
            <div aria-hidden="true" style={{
              position: "absolute",
              inset: "-6%",
              border: "1px dashed var(--brand-gold)",
              borderRadius: "50%",
              opacity: 0.4,
              pointerEvents: "none",
            }} />
            {/* Floating accent badge */}
            <div style={{
              position: "absolute",
              bottom: "8%",
              left: "-8%",
              background: "var(--brand-navy)",
              color: "var(--paper)",
              padding: "12px 18px",
              borderRadius: 12,
              boxShadow: "0 12px 32px rgba(14,34,64,.20)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ color: "var(--brand-gold)" }}>
                <Icon name="file-down" size={20} />
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--brand-gold)", textTransform: "uppercase" }}>
                  PDF · 12 pages
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 500 }}>
                  Free, no email tricks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ChecklistDownload };

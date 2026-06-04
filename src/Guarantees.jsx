import React from 'react';
import { Icon } from './Icon.jsx';

const GUARANTEES = [
  {
    icon: "shield-check",
    title: "Reviewed by a licensed CPA",
    body: "Every return is reviewed line-by-line by a licensed CPA before it leaves the office. No exceptions, no junior pass-throughs.",
  },
  {
    icon: "scale",
    title: "Fee quoted in writing, first",
    body: "You get a written engagement letter with the full fee before any work begins. No hourly surprises. No per-form mystery charges.",
  },
  {
    icon: "lock",
    title: "Your data, secured",
    body: "All documents move through an encrypted client portal. We never email tax records, and we never share your file with third parties.",
  },
  {
    icon: "message-square",
    title: "Real human, every reply",
    body: "Your CPA answers your email — not an offshore assistant, not a chatbot. Typical reply within one business day.",
  },
];

function Guarantees() {
  return (
    <section className="section" id="guarantees" style={{ background: "var(--cream-2)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <div className="section-eyebrow">Our promises</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-4)", maxWidth: "22ch" }}>
            What you can count on, every engagement.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-5)" }}>
          {GUARANTEES.map((g) => (
            <div key={g.title} style={{ background: "var(--paper)", border: "1px solid var(--rule-soft)", borderRadius: 12, padding: "var(--space-6)" }}>
              <div style={{ color: "var(--brand-gold-deep)", marginBottom: "var(--space-4)" }}>
                <Icon name={g.icon} size={28} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--brand-navy)", margin: "0 0 var(--space-3)", lineHeight: 1.2 }}>
                {g.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Guarantees };

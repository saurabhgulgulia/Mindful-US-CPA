import React from 'react';
import { Icon } from './Icon.jsx';

function CTA({ onConsultClick }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div>
            <div className="section-eyebrow">Start with a conversation</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1.1, fontWeight: 500, color: "var(--brand-navy)", margin: "0 0 var(--space-5)", letterSpacing: "-0.01em", maxWidth: "20ch" }}>
              Schedule a free 30-minute CPA call.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: "44ch" }}>
              We'll listen to your situation, answer your questions, and tell you
              honestly whether we're the right fit. No pitch, no pressure.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <button className="btn btn-primary" onClick={onConsultClick}>
              Talk to a CPA
              <Icon name="arrow-right" size={18} />
            </button>
            <span style={{ fontSize: 13, color: "var(--ink-3)", marginLeft: 4 }}>
              Typically reply within one business day
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CTA };

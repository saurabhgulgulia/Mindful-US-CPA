import React from 'react';
import { Icon } from './Icon.jsx';

const WHAT_WE_FILE = [
  { icon: "globe-2",          label: "Federal Tax Return" },
  { icon: "landmark",         label: "FBAR (FinCEN 114)" },
  { icon: "files",            label: "All Required FATCA Forms" },
  { icon: "send",             label: "IRS E-Filing" },
  { icon: "shield-check",     label: "Streamlined Filing" },
  { icon: "building-2",       label: "Corporate Returns" },
];

function WhatWeFile() {
  return (
    <section style={{ padding: "var(--space-7) 0", background: "var(--paper)", borderTop: "1px solid var(--rule-soft)", borderBottom: "1px solid var(--rule-soft)" }} id="what-we-file">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>What we file</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, color: "var(--brand-navy)", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
            Every expat-relevant form, in one engagement.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "var(--space-4)",
        }}>
          {WHAT_WE_FILE.map((f) => (
            <div
              key={f.label}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule)",
                borderRadius: 12,
                padding: "var(--space-5) var(--space-3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-4)",
                textAlign: "center",
                transition: "all var(--dur) var(--ease)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-gold)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(14,34,64,.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--rule)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon in gold blob */}
              <div style={{
                width: 56,
                height: 56,
                background: "radial-gradient(circle at 35% 35%, var(--brand-gold-soft) 0%, var(--brand-gold) 100%)",
                borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--brand-navy)",
                boxShadow: "0 4px 12px rgba(201,162,74,0.25)",
              }}>
                <Icon name={f.icon} size={26} />
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--brand-navy)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1.35,
              }}>
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhatWeFile };

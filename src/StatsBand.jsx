import React from 'react';

function StatsBand() {
  const stats = [
    { value: "Licensed CPA", label: "On every return" },
    { value: "50+", label: "Countries served" },
    { value: "100%", label: "Reviewed by a CPA, not a junior" },
    { value: "24h", label: "Typical response time" },
  ];
  return (
    <section style={{ background: "var(--cream-2)", padding: "var(--space-7) 0", borderTop: "1px solid var(--rule-soft)", borderBottom: "1px solid var(--rule-soft)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-6)" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ borderLeft: "1px solid var(--rule)", paddingLeft: "var(--space-5)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, color: "var(--brand-navy)", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 8 }} className="numeric">
                {s.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { StatsBand };

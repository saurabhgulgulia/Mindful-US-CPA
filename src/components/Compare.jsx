import React from 'react';
import { Header } from './Header.jsx';
import { Icon } from './Icon.jsx';

function Compare() {
  const rows = [
    { label: "Licensed CPA reviews every return", mind: true, soft: false, big: "Sometimes" },
    { label: "Same person prepares & answers email", mind: true, soft: false, big: false },
    { label: "Streamlined Filing handled in-house", mind: true, soft: false, big: "Extra fee" },
    { label: "Foreign accounts: FBAR + 8938", mind: "Included", soft: "DIY", big: "Per form" },
    { label: "PFIC & foreign corp analysis", mind: true, soft: false, big: "Specialist only" },
    { label: "Written fee quote before work starts", mind: true, soft: "Tiered", big: false },
    { label: "Tax queries answered by the CPA who prepared your return", mind: true, soft: false, big: false },
  ];

  const Cell = ({ v }) => {
    if (v === true) return <span style={{ color: "var(--brand-gold-deep)" }}><Icon name="check" size={20} /></span>;
    if (v === false) return <span style={{ color: "var(--ink-3)", opacity: 0.5 }}><Icon name="x" size={20} /></span>;
    return <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{v}</span>;
  };

  return (
    <section className="section" id="compare" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <div className="section-eyebrow">Why Mindful</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-4)", maxWidth: "22ch" }}>
            Most expats don't need a tax giant.<br />They need a CPA who's seen this before.
          </h2>
        </div>

        <div style={{ border: "1px solid var(--rule)", borderRadius: 16, overflow: "hidden", background: "var(--paper)" }}>
          {/* Header row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.1fr 1.1fr 1.1fr",
            background: "var(--cream-2)",
            borderBottom: "1px solid var(--rule)",
          }}>
            <div style={{ padding: "var(--space-5) var(--space-6)" }} />
            <div style={{ padding: "var(--space-5)", textAlign: "center", borderLeft: "1px solid var(--rule)", background: "var(--brand-navy)", color: "var(--paper)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>Mindful US CPA</div>
              <div style={{ fontSize: 11, color: "var(--brand-gold-soft)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Boutique CPA</div>
            </div>
            <div style={{ padding: "var(--space-5)", textAlign: "center", borderLeft: "1px solid var(--rule)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--ink)", lineHeight: 1.2 }}>DIY Tax Software</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Self-file</div>
            </div>
            <div style={{ padding: "var(--space-5)", textAlign: "center", borderLeft: "1px solid var(--rule)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--ink)", lineHeight: 1.2 }}>Big-Box Tax Firms</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Volume preparers</div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <div key={r.label} style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.1fr 1.1fr 1.1fr",
              borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--rule-soft)",
              alignItems: "center",
            }}>
              <div style={{ padding: "var(--space-4) var(--space-6)", fontSize: 15, color: "var(--ink)" }}>{r.label}</div>
              <div style={{ padding: "var(--space-4)", textAlign: "center", borderLeft: "1px solid var(--rule-soft)", background: "rgba(201,162,74,0.04)" }}><Cell v={r.mind} /></div>
              <div style={{ padding: "var(--space-4)", textAlign: "center", borderLeft: "1px solid var(--rule-soft)" }}><Cell v={r.soft} /></div>
              <div style={{ padding: "var(--space-4)", textAlign: "center", borderLeft: "1px solid var(--rule-soft)" }}><Cell v={r.big} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Compare };

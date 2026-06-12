import React from 'react';
import { Icon } from './Icon.jsx';

const KNOWLEDGE_CATEGORIES = [
  {
    icon: "book-open",
    name: "Expat Tax Essentials",
    body: "FEIE, FTC, residency tests, deadlines — the foundations every American abroad needs.",
    count: 18,
    topArticles: [
      "Foreign Earned Income Exclusion explained (2026)",
      "FEIE vs Foreign Tax Credit — which to use",
      "Bona fide residence vs physical presence test",
      "US tax filing deadlines for expats",
    ],
  },
  {
    icon: "compass",
    name: "Specific Situations",
    body: "Digital nomads, dual citizens, accidental Americans, foreign spouses, retirement abroad.",
    count: 14,
    topArticles: [
      "Digital nomad taxes — FEIE & tax home rules",
      "Filing jointly with a foreign spouse (no SSN)",
      "Accidental Americans — getting compliant",
      "Retiring abroad as a US citizen",
    ],
  },
  {
    icon: "banknote",
    name: "Investing & Accounts",
    body: "FBAR, FATCA, PFICs, foreign pensions, and how the IRS treats your offshore accounts.",
    count: 12,
    topArticles: [
      "FBAR filing — thresholds, deadlines, penalties",
      "FBAR vs Form 8938 — file both?",
      "PFIC reporting (Form 8621) explained",
      "Foreign pensions and US taxation",
    ],
  },
  {
    icon: "file-text",
    name: "Forms Reference",
    body: "Clear walkthroughs of every IRS form an American abroad is likely to encounter.",
    count: 22,
    topArticles: [
      "Form 1040 for expats",
      "Form 2555 (FEIE)",
      "Form 1116 (Foreign Tax Credit)",
      "Form 5471 — foreign corporation owners",
    ],
  },
];

function KnowledgeHub() {
  const [active, setActive] = React.useState(0);
  return (
    <section className="section" id="knowledge" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-9)", alignItems: "start" }}>
          <div>
            <div className="section-eyebrow">Knowledge Center</div>
            <h2 className="section-head" style={{ maxWidth: "16ch" }}>
              Clear, considered guides — written by the people who file your return.
            </h2>
            <p className="section-sub" style={{ marginBottom: "var(--space-7)" }}>
              The tax code is 6,800 pages. Our writing aims to be much shorter.
              Every guide is written and reviewed by a licensed CPA — not an SEO writer.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {KNOWLEDGE_CATEGORIES.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "var(--space-5)",
                    background: active === i ? "var(--cream-2)" : "transparent",
                    border: "none",
                    borderLeft: active === i ? "3px solid var(--brand-gold)" : "3px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all var(--dur) var(--ease)",
                    borderRadius: 0,
                  }}
                >
                  <div style={{ color: active === i ? "var(--brand-gold-deep)" : "var(--ink-2)" }}>
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--brand-navy)", marginBottom: 2 }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink-2)" }}>
                      {c.body}
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)" }}>
                    {c.count}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "var(--cream)", border: "1px solid var(--rule-soft)", borderRadius: 16, padding: "var(--space-7)", position: "sticky", top: 96 }}>
            <div className="section-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
              {KNOWLEDGE_CATEGORIES[active].name}
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, color: "var(--brand-navy)", margin: "0 0 var(--space-5)", lineHeight: 1.2 }}>
              Top guides in this category
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {KNOWLEDGE_CATEGORIES[active].topArticles.map((title) => (
                <li key={title}>
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      padding: "var(--space-4) 0",
                      borderBottom: "1px solid var(--rule-soft)",
                      textDecoration: "none",
                      color: "var(--brand-navy)",
                      fontSize: 16,
                      lineHeight: 1.4,
                      transition: "color var(--dur) var(--ease)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--brand-gold-deep)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--brand-navy)"; }}
                  >
                    <span>{title}</span>
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                </li>
              ))}
            </ul>
            <a href="#" className="btn btn-ghost" style={{ marginTop: "var(--space-5)", padding: "12px 0" }}>
              Browse all {KNOWLEDGE_CATEGORIES[active].count} guides
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export { KnowledgeHub };

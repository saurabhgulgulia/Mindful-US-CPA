import React from 'react';

const AUDIENCES = [
  {
    tag: "01 — Individuals & expats",
    title: "Personal & US expat returns",
    body: "Whether you're an American abroad, a family with multi-state income, or a return with equity comp, K-1s, trusts, or foreign holdings — we handle FEIE, FTC, FBAR, 8938, and Streamlined catch-up filing.",
    cta: "Personal & expat services",
  },
  {
    tag: "02 — Businesses",
    title: "Entity tax returns",
    body: "C-corp, S-corp, and partnership returns — plus ongoing CPA consulting and whatever else is applicable.",
    cta: "Corporate services",
  },
  {
    tag: "03 — Accounting",
    title: "Bookkeeping & accounting",
    body: "Monthly bookkeeping in QuickBooks and Xero, reconciliations, payroll filings, and management reports — keeping your books audit-ready and tax-ready, month after month.",
    cta: "Accounting services",
  },
];

function Audiences({ onAudienceClick }) {
  return (
    <section className="section" id="audiences">
      <div className="container">
        <div className="section-eyebrow">Who we serve</div>
        <h2 className="section-head">Three audiences. One careful posture.</h2>
        <p className="section-sub" style={{ marginBottom: "var(--space-8)" }}>
          The common thread isn't the form number — it's that the work rewards patience.
          Each return gets reviewed by a licensed CPA. Always.
        </p>
      </div>
      <div className="container" style={{ padding: 0 }}>
        <div className="container" style={{ padding: "0 clamp(24px, 5vw, 64px)" }}>
          <div className="audience-row">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="audience" onClick={() => onAudienceClick && onAudienceClick(a)}>
                <div className="audience-tag">{a.tag}</div>
                <h3 className="audience-title">{a.title}</h3>
                <p className="audience-body">{a.body}</p>
                <span className="audience-link">{a.cta} →</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Audiences, AUDIENCES };

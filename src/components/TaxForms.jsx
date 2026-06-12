import React from 'react';
import { Icon } from './Icon.jsx';

const FORMS = [
  { num: "1040", title: "Individual return", body: "Your annual US return, filed by every citizen wherever they live." },
  { num: "1065", title: "Partnership return", body: "US return for partnerships — issues Schedule K-1 to each partner." },
  { num: "1120-S", title: "S-corp return", body: "US return for S-corporations — issues K-1s to shareholders." },
  { num: "1120", title: "C-corp return", body: "US return for C-corporations — entity-level federal income tax." },
  { num: "2555", title: "FEIE", body: "Excludes up to $126,500 of foreign earned income (2026)." },
  { num: "1116", title: "Foreign Tax Credit", body: "Offsets US tax for income tax already paid to another country." },
  { num: "FinCEN 114", title: "FBAR", body: "Reports foreign accounts totaling > $10,000 at any point in the year." },
  { num: "8938", title: "FATCA", body: "Reports specified foreign financial assets above thresholds." },
  { num: "5471", title: "Foreign corp", body: "For US owners of foreign corporations — often required even with no tax due." },
  { num: "8621", title: "PFIC", body: "Annual reporting for passive foreign investment companies." },
  { num: "14653", title: "Streamlined cert", body: "Non-willful certification for the Streamlined Foreign Offshore Procedures." },
  { num: "941", title: "Quarterly payroll", body: "Employer's quarterly federal payroll & withholding tax return." },
];

function TaxForms() {
  return (
    <section className="section-tight" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div className="services-head" style={{ marginBottom: "var(--space-6)" }}>
          <div>
            <div className="section-eyebrow">Quick reference</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, color: "var(--brand-navy)", margin: 0, letterSpacing: "-0.01em" }}>
              The forms you'll hear us mention.
            </h2>
          </div>
          <a className="btn btn-ghost" href="#knowledge">All form guides<Icon name="arrow-right" size={16} /></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)", borderRadius: 12, overflow: "hidden" }}>
          {FORMS.map((f) => (
            <a
              key={f.num}
              href="#"
              style={{
                background: "var(--paper)",
                padding: "var(--space-5)",
                textDecoration: "none",
                color: "var(--brand-navy)",
                transition: "background var(--dur) var(--ease)",
                display: "block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--paper)"; }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--brand-gold-deep)", letterSpacing: "0.06em", marginBottom: 6 }}>
                FORM {f.num}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, marginBottom: 6, lineHeight: 1.2 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>
                {f.body}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TaxForms };

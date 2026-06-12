import React from 'react';
import { Icon } from './Icon.jsx';

const COUNTRIES = [
  { region: "Europe", items: ["United Kingdom", "Germany", "France", "Switzerland", "Netherlands", "Spain", "Portugal", "Italy"] },
  { region: "Asia & Pacific", items: ["Singapore", "Hong Kong", "Japan", "Thailand", "Australia", "New Zealand", "South Korea", "Taiwan"] },
  { region: "Middle East & Americas", items: ["United Arab Emirates", "Israel", "Saudi Arabia", "Canada", "Mexico", "Costa Rica", "Brazil", "Other"] },
];

function CountryGuides({ onCountryClick }) {
  return (
    <section className="section" id="countries" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div className="services-head">
          <div>
            <div className="section-eyebrow">Country Guides</div>
            <h2 className="section-head">Where you live changes the work.</h2>
          </div>
          <p className="section-sub" style={{ maxWidth: "44ch" }}>
            Tax treaties, totalization agreements, and reporting thresholds all vary by country.
            We file for Americans in 50+ countries — and these are the most common.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-7)" }}>
          {COUNTRIES.map((c) => (
            <div key={c.region}>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-gold-deep)", margin: "0 0 var(--space-4)", paddingBottom: "var(--space-3)", borderBottom: "1px solid var(--rule)" }}>
                {c.region}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {c.items.map((country) => (
                  <li key={country}>
                    <button
                      onClick={() => onCountryClick && onCountryClick(country)}
                      style={{
                        width: "100%", textAlign: "left", background: "none", border: "none",
                        fontFamily: "var(--font-body)", fontSize: 16, color: "var(--brand-navy)",
                        padding: "10px 0", cursor: "pointer", display: "flex", justifyContent: "space-between",
                        alignItems: "center", borderBottom: "1px solid var(--rule-soft)", transition: "color var(--dur) var(--ease)"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--brand-gold-deep)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--brand-navy)"; }}
                    >
                      <span>{country}</span>
                      <Icon name="arrow-up-right" size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-7)" }}>
          <a href="#" className="btn btn-secondary">
            View all 50+ countries
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export { CountryGuides };

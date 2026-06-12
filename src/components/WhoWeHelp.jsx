import React from 'react';
import { Icon } from './Icon.jsx';
import { IMG } from '../images.js';

const WHO_WE_HELP = [
  {
    id: "wwh-property",
    title: "Americans with Property Abroad",
    body: "Rental income, foreign capital gains, Schedule E for property held outside the US.",
    placeholder: "Couple at a balcony / coastal property",
  },
  {
    id: "wwh-dual-citizen",
    title: "Americans with Dual Residency",
    body: "Holding residency status in two countries means two sets of tax obligations. We coordinate treaty positions and tie-breaker rules.",
    placeholder: "Two passports / couple at home",
  },
  {
    id: "wwh-dual-status",
    title: "Dual-Status Filers (1040 & 1040-NR)",
    body: "The year you move into or out of the US — a dual-status return done right.",
    placeholder: "Couple reviewing laptop together",
  },
  {
    id: "wwh-assignment",
    title: "Working Abroad on Assignment",
    body: "Tax-equalization, FEIE eligibility, employer-paid benefit treatment for assignees.",
    placeholder: "Office meeting / international team",
  },
  {
    id: "wwh-business",
    title: "Small Business Owners",
    body: "Single-member LLC and S-corp owners — and the foreign-entity reporting that comes with going global.",
    placeholder: "Founder at desk / small business",
  },
  {
    id: "wwh-streamlined",
    title: "Streamlined Filing Catch-Up",
    body: "Years of unfiled returns? No panic. A structured, non-willful return-to-compliance program — completed discreetly and professionally under both the SFOP and SDOP.",
    placeholder: "Person looking at a calm horizon",
  },
];

function WhoWeHelp() {
  return (
    <section className="section" id="who-we-help" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Who we help</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-4)", maxWidth: "22ch" }}>
            Where most of our clients are coming from.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto", maxWidth: "60ch" }}>
            Specific situations call for specific reading of the code. We work in all of these — and a few that don't fit here.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-7) var(--space-6)",
          justifyItems: "stretch",
        }}>
          {WHO_WE_HELP.map((w, i) => (
            <a
              key={w.id}
              href="#consult"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-consult")); }}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                transition: "transform var(--dur-slow) var(--ease)",
                gridColumn: i === WHO_WE_HELP.length - 1 && WHO_WE_HELP.length % 3 === 1 ? "2" : "auto",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                aspectRatio: "16 / 11",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: "var(--space-4)",
                boxShadow: "0 1px 2px rgba(14,34,64,.06)",
                position: "relative",
                background: "var(--cream-2)",
              }}>
                <img
                  src={IMG[w.id]}
                  alt={w.title}
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", position: "absolute", inset: 0 }}
                />
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 500,
                color: "var(--brand-navy)",
                margin: "0 0 var(--space-2)",
                lineHeight: 1.25,
                letterSpacing: "-0.005em",
              }}>
                {w.title}
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                margin: 0,
              }}>
                {w.body}
              </p>
            </a>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-8)" }}>
          <a
            className="btn btn-secondary"
            href="#consult"
            onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-consult")); }}
          >
            Not sure where you fit? Let's talk.
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export { WhoWeHelp };

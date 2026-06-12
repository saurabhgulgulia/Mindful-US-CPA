import React from 'react';
import { Icon } from './Icon.jsx';
import { IMG } from '../images.js';

function About({ onConsultClick }) {
  const credentials = [
    "Certified Public Accountant (CPA)",
    "Member, American Institute of CPAs (AICPA)",
    "IRS-authorized e-File Originator",
    "Continuing professional education, current",
  ];
  return (
    <section className="section" id="about" style={{ background: "var(--cream-2)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "var(--space-9)", alignItems: "center" }}>
          {/* Portrait placeholder */}
          <div style={{ position: "relative" }}>
            <div style={{
              aspectRatio: "4 / 5",
              background: "var(--cream-2)",
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 24px 60px rgba(14,34,64,.14)",
            }}>
              <img
                src={IMG["founder-portrait"]}
                alt="Founder portrait"
                style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: -20, left: -20,
              background: "var(--paper)", padding: "var(--space-4) var(--space-5)",
              borderRadius: 12, boxShadow: "0 12px 32px rgba(14,34,64,.10)",
              border: "1px solid var(--rule-soft)",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, color: "var(--brand-navy)", lineHeight: 1.1 }}>
                Our work, done well,<br />is meticulous work.
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="section-eyebrow">About the firm</div>
            <h2 className="section-head" style={{ maxWidth: "20ch", marginBottom: "var(--space-5)" }}>
              A small practice on purpose.
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 var(--space-4)" }}>
              Mindful US CPA was founded on a quiet idea: our work, done well, is meticulous work.
              Returns deserve a careful look — and the person preparing yours should be the same
              person who answers your email.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 var(--space-6)" }}>
              We're a new firm with a deliberate, traditional posture: small client list,
              credentialed work, no junior pass-throughs, no outsourcing. Every return prepared
              and reviewed by a licensed CPA before it leaves the office.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--space-7)", borderTop: "1px solid var(--rule)" }}>
              {credentials.map((c) => (
                <li key={c} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "var(--space-3) 0", borderBottom: "1px solid var(--rule)",
                  fontSize: 15, color: "var(--ink)",
                }}>
                  <span style={{ color: "var(--brand-gold-deep)" }}>
                    <Icon name="check" size={18} />
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <button className="btn btn-primary" onClick={onConsultClick}>
                Schedule a consultation
                <Icon name="arrow-right" size={16} />
              </button>
              <a className="btn btn-ghost" href="#process">How we work →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { About };

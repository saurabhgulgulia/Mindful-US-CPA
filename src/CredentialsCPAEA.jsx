import React from 'react';
import { Icon } from './Icon.jsx';

function Credentials() {
  return (
    <section className="section" id="credentials" style={{ background: "var(--brand-navy)", color: "var(--paper)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", right: -120, bottom: -120, width: 360, height: 360,
        borderRadius: "50% 42% 50% 45% / 45% 50% 42% 50%",
        background: "var(--brand-gold)", opacity: 0.10, pointerEvents: "none",
      }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ maxWidth: 760, marginBottom: "var(--space-8)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--brand-gold)", marginBottom: "var(--space-4)" }}>
            Professional credentials
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.012em", color: "var(--paper)", margin: "0 0 var(--space-5)", maxWidth: "20ch" }}>
            Your return is touched only by a licensed tax professional.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(255,255,255,.78)", margin: 0, maxWidth: "64ch" }}>
            We don't hire junior preparers. We don't outsource. Every return that leaves the office
            is prepared and reviewed by a <strong style={{ color: "var(--brand-gold-soft)" }}>Certified Public Accountant</strong> —
            the credential that lets us sign your return and represent you before the IRS.
          </p>
        </div>

        {/* CPA seal + facts */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "var(--space-7)",
          alignItems: "center",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(201,162,74,0.25)",
          borderRadius: 16,
          padding: "var(--space-7)",
          maxWidth: 900,
        }}>
          {/* Big CPA seal */}
          <div style={{
            flexShrink: 0,
            width: 160, height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--brand-gold) 0%, var(--brand-gold-deep) 100%)",
            color: "var(--brand-navy)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 52,
            boxShadow: "inset 0 -6px 16px rgba(0,0,0,0.18), 0 12px 32px rgba(0,0,0,.25)",
            border: "4px double rgba(14,34,64,0.18)",
            letterSpacing: "0.02em",
          }}>
            CPA
          </div>

          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, color: "var(--paper)", margin: "0 0 var(--space-3)", lineHeight: 1.15 }}>
              Certified Public Accountant
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.7)", margin: "0 0 var(--space-4)" }}>
              Licensed by a state board of accountancy. The CPA designation requires a
              150-credit-hour accounting degree, passage of the four-part Uniform CPA Examination,
              documented professional experience, and ongoing continuing-education.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "Sign tax returns",
                "Represent you before the IRS",
                "Practice in all 50 states",
                "Audit & attest authority",
                "Bound by AICPA ethics code",
              ].map((tag) => (
                <span key={tag} style={{
                  fontSize: 11.5,
                  fontWeight: 500,
                  padding: "5px 10px",
                  borderRadius: 999,
                  background: "rgba(201,162,74,0.14)",
                  color: "var(--brand-gold-soft)",
                  border: "1px solid rgba(201,162,74,0.3)",
                  letterSpacing: "0.02em",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: "var(--space-7)",
          padding: "var(--space-5) var(--space-6)",
          background: "rgba(201,162,74,0.08)",
          border: "1px solid rgba(201,162,74,0.2)",
          borderRadius: 12,
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          maxWidth: "80ch",
        }}>
          <span style={{ color: "var(--brand-gold)", flexShrink: 0, paddingTop: 2 }}>
            <Icon name="info" size={18} />
          </span>
          <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,.78)", fontStyle: "italic" }}>
            Most online tax-prep services rely on seasonal preparers with no professional credential. They cannot represent you before the IRS. A licensed CPA can.
          </div>
        </div>
      </div>
    </section>
  );
}

export { Credentials };

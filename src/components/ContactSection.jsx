import React from 'react';
import { Icon } from './Icon.jsx';

function ContactSection({ onConsultClick }) {
  return (
    <section className="section" id="contact" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Get in touch</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-4)", maxWidth: "22ch" }}>
            Three simple ways to reach us.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-6)",
          maxWidth: 1100,
          margin: "0 auto",
        }}>
          {/* Email */}
          <a
            href="mailto:support@mindfuluscpa.com"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "var(--space-3)",
              padding: "var(--space-6)",
              borderRadius: 16,
              textDecoration: "none",
              color: "inherit",
              transition: "background var(--dur) var(--ease), transform var(--dur) var(--ease)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "var(--cream-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--brand-gold-deep)", marginBottom: "var(--space-3)",
              boxShadow: "inset 0 1px 2px rgba(14,34,64,0.04)",
            }}>
              <Icon name="mail" size={38} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, color: "var(--brand-navy)", margin: 0, lineHeight: 1.15 }}>Email</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: "30ch" }}>
              Email us for help with an engagement, document upload, or general question.
            </p>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--brand-gold-deep)", marginTop: "var(--space-2)" }}>
              support@mindfuluscpa.com
            </div>
          </a>

          {/* Call */}
          <a
            href="tel:+15513103732"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "var(--space-3)",
              padding: "var(--space-6)",
              borderRadius: 16,
              textDecoration: "none",
              color: "inherit",
              transition: "background var(--dur) var(--ease), transform var(--dur) var(--ease)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "var(--cream-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--brand-gold-deep)", marginBottom: "var(--space-3)",
              boxShadow: "inset 0 1px 2px rgba(14,34,64,0.04)",
            }}>
              <Icon name="smartphone" size={38} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, color: "var(--brand-navy)", margin: 0, lineHeight: 1.15 }}>Call</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: "30ch" }}>
              Call to speak with a tax expert. Mon–Fri, 9am–6pm ET.
            </p>
            <div className="numeric" style={{
              fontSize: 16, fontWeight: 600, color: "var(--brand-navy)", marginTop: "var(--space-2)",
              padding: "4px 10px", background: "var(--brand-gold-soft)", borderRadius: 4, letterSpacing: "0.02em",
            }}>
              +1 (551) 310-3732
            </div>
          </a>

          {/* Schedule a call */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); onConsultClick && onConsultClick(); }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "var(--space-3)",
              padding: "var(--space-6)",
              borderRadius: 16,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              color: "inherit",
              transition: "background var(--dur) var(--ease), transform var(--dur) var(--ease)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cream-2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "var(--cream-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--brand-gold-deep)", marginBottom: "var(--space-3)",
              boxShadow: "inset 0 1px 2px rgba(14,34,64,0.04)",
            }}>
              <Icon name="calendar-clock" size={38} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, color: "var(--brand-navy)", margin: 0, lineHeight: 1.15 }}>Schedule a call</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: "30ch" }}>
              Send us your situation and a few good times — we reply within one business day.
            </p>
            <span style={{
              fontSize: 13, fontWeight: 600, color: "var(--paper)",
              marginTop: "var(--space-2)", padding: "8px 16px",
              background: "var(--brand-navy)", borderRadius: 6,
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              Request a free consultation
              <Icon name="arrow-right" size={14} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export { ContactSection };

import React from 'react';
import { Icon } from './Icon.jsx';

const REVIEWS = [
  {
    initials: "AW",
    name: "Avery & Whit W.",
    meta: "Streamlined Filing · Singapore",
    quote: "We'd been abroad nine years and were terrified. Mindful handled Streamlined without drama, kept us informed, and quietly closed the loop with the IRS. We sleep better now.",
  },
  {
    initials: "RC",
    name: "Raj C.",
    meta: "Corporate filing · NY → London",
    quote: "Moved my S-corp from a giant firm. The difference is night and day. I get the CPA on email, the fee is in writing up front, and the work is meticulous. I should have switched sooner.",
  },
  {
    initials: "MH",
    name: "Marisa H.",
    meta: "HNW personal · multi-state K-1",
    quote: "Equity comp across three states, two trust K-1s, and a charitable structure that another preparer kept getting wrong. Mindful figured it out in one engagement and saved us materially on the AMT.",
  },
];

function Reviews() {
  return (
    <section className="section" id="reviews" style={{ background: "var(--paper)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <div className="section-eyebrow">Client letters</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-3)", maxWidth: "20ch" }}>
            Quiet words from quiet clients.
          </h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: "var(--space-3)" }}>
            <span style={{ display: "inline-flex", gap: 2, color: "var(--brand-gold-deep)" }}>
              {[1,2,3,4,5].map((i) => <Icon key={i} name="star" size={18} />)}
            </span>
            <span className="numeric" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-2)" }}>
              4.9 / 5 · 47 verified reviews
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-5)" }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{
              background: "var(--cream)",
              border: "1px solid var(--rule-soft)",
              borderRadius: 16,
              padding: "var(--space-6)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}>
              <div style={{ display: "flex", gap: 2, color: "var(--brand-gold-deep)" }}>
                {[1,2,3,4,5].map((i) => <Icon key={i} name="star" size={14} />)}
              </div>
              <p style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 19,
                lineHeight: 1.45,
                color: "var(--brand-navy)",
                margin: 0,
                flex: 1,
                textWrap: "pretty",
              }}>
                "{r.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: "var(--space-3)", borderTop: "1px solid var(--rule-soft)" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--brand-gold-soft), var(--brand-gold))",
                  color: "var(--brand-navy)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 14,
                }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-navy)" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-2)" }}>{r.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Reviews };

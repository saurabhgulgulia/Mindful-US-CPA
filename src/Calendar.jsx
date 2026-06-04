import React from 'react';
import { Icon } from './Icon.jsx';

function Calendar() {
  const dates = [
    { date: "Mar 15", title: "Partnership & S-corp deadline", body: "Form 1065 (partnerships) and Form 1120-S (S-corps) due — or file Form 7004 for a six-month extension." },
    { date: "Apr 15", title: "Federal & C-corp deadline", body: "Form 1040 and Form 1120 (C-corps) due — or file Form 4868 / 7004 for an automatic extension to October." },
    { date: "Jun 15", title: "Automatic expat extension", body: "Americans living abroad get an automatic two-month extension to file." },
    { date: "Oct 15", title: "Extended filing deadline", body: "Final deadline for returns filed under Form 4868 or 7004 extension." },
    { date: "Dec 31", title: "Year-end planning window", body: "Last day to execute charitable contributions, gain harvesting, retirement deposits." },
  ];

  return (
    <section style={{ padding: "var(--space-8) 0", background: "var(--cream)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "var(--space-6)", gap: "var(--space-6)" }}>
          <div>
            <div className="section-eyebrow">2026 Tax Calendar</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, color: "var(--brand-navy)", margin: 0, letterSpacing: "-0.01em" }}>
              Key dates for Americans abroad.
            </h2>
          </div>
          <a className="btn btn-ghost" href="#knowledge">All deadlines guide<Icon name="arrow-right" size={16} /></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)", borderRadius: 12, overflow: "hidden" }}>
          {dates.map((d) => (
            <div key={d.date} style={{ background: "var(--paper)", padding: "var(--space-5)" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 500,
                color: "var(--brand-navy)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                marginBottom: "var(--space-3)",
              }} className="numeric">
                {d.date}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--brand-navy)", marginBottom: 6, lineHeight: 1.3 }}>
                {d.title}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)" }}>
                {d.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Calendar };

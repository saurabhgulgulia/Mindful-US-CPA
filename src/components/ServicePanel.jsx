import React from 'react';
import { Icon } from './Icon.jsx';

function ServicePanel({ service, onClose, onConsultClick }) {
  const open = !!service;
  // Keep last service in state so the panel doesn't blank during the slide-out
  const [shown, setShown] = React.useState(service);
  React.useEffect(() => {
    if (service) setShown(service);
  }, [service]);

  if (!shown) {
    return (
      <React.Fragment>
        <div className={"service-panel-overlay" + (open ? " open" : "")} onClick={onClose} />
        <aside className={"service-panel" + (open ? " open" : "")} aria-hidden={!open} />
      </React.Fragment>
    );
  }

  const s = shown;
  return (
    <React.Fragment>
      <div className={"service-panel-overlay" + (open ? " open" : "")} onClick={onClose} />
      <aside className={"service-panel" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="drawer-header" style={{ padding: "var(--space-5) var(--space-7)" }}>
          <span className="tag-pill">{s.tag}</span>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="drawer-body" style={{ padding: "var(--space-6) var(--space-7) var(--space-8)" }}>
          <div className="section-eyebrow" style={{ marginBottom: "var(--space-3)" }}>{s.detail.eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, color: "var(--brand-navy)", margin: "0 0 var(--space-5)", lineHeight: 1.1, letterSpacing: "-0.012em" }}>
            {s.title}
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 var(--space-7)" }}>
            {s.detail.lead}
          </p>

          <h3 style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-gold-deep)", margin: "0 0 var(--space-4)" }}>
            What's included
          </h3>
          <ul className="checklist" style={{ marginBottom: "var(--space-7)" }}>
            {s.detail.includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div style={{ background: "var(--paper)", border: "1px solid var(--rule-soft)", borderRadius: 12, padding: "var(--space-5) var(--space-6)", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ color: "var(--brand-gold-deep)", paddingTop: 2 }}>
              <Icon name="info" size={18} />
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", fontStyle: "italic" }}>
              {s.detail.footnote}
            </div>
          </div>
        </div>
        <div className="drawer-footer">
          <button className="btn btn-ghost" onClick={onClose}>Back to services</button>
          <span style={{ flex: 1 }} />
          <button className="btn btn-primary" onClick={() => { onClose(); setTimeout(onConsultClick, 200); }}>
            Schedule a consultation
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </aside>
    </React.Fragment>
  );
}

export { ServicePanel };

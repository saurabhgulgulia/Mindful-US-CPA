import React from 'react';
import { Icon } from './Icon.jsx';

function ConsultDrawer({ open, onClose }) {
  const [step, setStep] = React.useState("form");
  const [selectedAudiences, setSelectedAudiences] = React.useState([]);
  const [form, setForm] = React.useState({ name: "", email: "", country: "United States", situation: "" });

  React.useEffect(() => {
    if (open) {
      setStep("form");
      setSelectedAudiences([]);
      setForm({ name: "", email: "", country: "United States", situation: "" });
    }
  }, [open]);

  const toggleAud = (a) => {
    setSelectedAudiences((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));
  };

  const submit = (e) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <React.Fragment>
      <div className={"drawer-overlay" + (open ? " open" : "")} onClick={onClose} />
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="drawer-header">
          <div>
            <div className="section-eyebrow" style={{ marginBottom: 4 }}>New engagement</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, color: "var(--brand-navy)" }}>
              {step === "form" ? "Schedule a consultation" : "Thank you."}
            </div>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            <Icon name="x" size={20} />
          </button>
        </div>

        {step === "form" ? (
          <React.Fragment>
            <form className="drawer-body" onSubmit={submit}>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 var(--space-5)" }}>
                A thirty-minute video call. No prep needed. We'll confirm a time by email within one business day.
              </p>

              <div className="field">
                <label className="field-label">Which best describes you?</label>
                <div className="chip-row">
                  {["US expat", "Individual / family", "Business owner", "Catch-up filing", "Just exploring"].map((a) => (
                    <button
                      type="button"
                      key={a}
                      className={"chip" + (selectedAudiences.includes(a) ? " selected" : "")}
                      onClick={() => toggleAud(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="cd-name">Full name</label>
                <input id="cd-name" className="field-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Avery Whitfield" />
              </div>

              <div className="field-row">
                <div className="field">
                  <label className="field-label" htmlFor="cd-email">Email</label>
                  <input id="cd-email" type="email" className="field-input" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="avery@example.com" />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="cd-country">Country of residence</label>
                  <select id="cd-country" className="field-select" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                    {["United States", "Singapore", "United Kingdom", "Germany", "Japan", "Switzerland", "United Arab Emirates", "Other"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="cd-situation">Tell us about your situation</label>
                <textarea
                  id="cd-situation"
                  className="field-textarea"
                  value={form.situation}
                  onChange={(e) => setForm({ ...form, situation: e.target.value })}
                  placeholder="I've been abroad for seven years and haven't filed. I'm worried about Streamlined."
                />
              </div>

              <p style={{ fontSize: 13, color: "var(--ink-3)", margin: "var(--space-4) 0 0", lineHeight: 1.5 }}>
                Submitting this form starts a private conversation. Nothing you write here is shared with anyone outside the firm.
              </p>
            </form>
            <div className="drawer-footer">
              <button className="btn btn-ghost" type="button" onClick={onClose}>Cancel</button>
              <span style={{ flex: 1 }} />
              <button className="btn btn-primary" onClick={submit}>
                Request consultation
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </React.Fragment>
        ) : (
          <div className="drawer-body">
            <div className="success-state">
              <div className="success-mark">
                <Icon name="check" size={28} color="var(--brand-navy)" />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, color: "var(--brand-navy)", lineHeight: 1.2 }}>
                We'll be in touch shortly.
              </div>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6, margin: 0, maxWidth: "36ch" }}>
                Expect a reply at <strong style={{ color: "var(--brand-navy)" }}>{form.email || "your inbox"}</strong> within
                one business day with a few suggested times for a video call.
              </p>
              <button className="btn btn-secondary" onClick={onClose} style={{ marginTop: "var(--space-4)" }}>
                Back to the site
              </button>
            </div>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

export { ConsultDrawer };

import React from 'react';
import { About } from './About.jsx';
import { Icon } from './Icon.jsx';
import { Services } from './Services.jsx';

// StateComplianceOrganizer — dedicated intake for "US state tax compliance".
// Ongoing state-level work (not a federal return and not forming a new entity):
// sales & use tax, nexus, annual reports, franchise tax, registered agent, and
// state business-tax registration. Reuses the intake-card / field styles.

function STField({ label, required, hint, children }) {
  return (
    <label className="intake-field">
      <span className="intake-field-label">
        {label}{required && <span className="intake-field-required">*</span>}
      </span>
      {children}
      {hint && <span className="intake-field-hint">{hint}</span>}
    </label>
  );
}

const STC_US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
  "Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

const STC_ENTITY_TYPES = [
  "LLC", "S-Corporation", "C-Corporation", "Partnership", "Sole proprietorship", "Nonprofit",
];

const STC_REVENUE = [
  "Under $100k", "$100k – $500k", "$500k – $1M", "$1M – $5M", "Over $5M",
];

const STC_SERVICES = [
  { v: "sales-reg",     title: "Sales & use tax registration", sub: "Register to collect sales tax in new states.", icon: "receipt" },
  { v: "sales-returns", title: "Sales & use tax returns",      sub: "Ongoing periodic filing in states you're registered.", icon: "repeat" },
  { v: "nexus",         title: "Nexus analysis",               sub: "Where your activity creates a filing obligation.", icon: "git-branch" },
  { v: "annual-report", title: "Annual report filing",         sub: "Keep your entity in good standing.", icon: "calendar-check" },
  { v: "franchise",     title: "Franchise tax filing",         sub: "State franchise / privilege tax returns.", icon: "landmark" },
  { v: "income-reg",    title: "State business-tax registration", sub: "Register for state income / business tax.", icon: "file-text" },
];

function StateComplianceOrganizer({ presetService, onExit }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [showCongrats, setShowCongrats] = React.useState(false);
  const [refNum, setRefNum] = React.useState("");
  const [form, setForm] = React.useState({
    services: [],
    bizName: "",
    entityType: "",
    ein: "",
    homeState: "",
    bizAddress: "",
    industry: "",
    revenue: "",
    states: [],
    contactName: "",
    contactEmail: "",
    consent: false,
  });
  const update = (patch) => setForm((s) => ({ ...s, ...patch }));

  const toggleIn = (key, val) =>
    setForm((s) => {
      const arr = s[key];
      return { ...s, [key]: arr.indexOf(val) > -1 ? arr.filter((x) => x !== val) : [...arr, val] };
    });

  const ready =
    form.services.length > 0 && form.bizName.trim() && form.entityType && form.ein.trim() &&
    form.homeState && form.bizAddress.trim() && form.states.length > 0 &&
    form.contactName.trim() && form.contactEmail.trim() && form.consent;

  const submit = () => {
    if (!ready) {
      if (!form.consent) alert("Please review and check the consent box before submitting.");
      return;
    }
    setRefNum("MUC-STC-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000));
    setSubmitted(true);
    setShowCongrats(true);
    setTimeout(() => {
      const el = document.getElementById("stc-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="intake-portal" id="stc-top">
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: "var(--space-7)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>US state tax compliance</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-3)", maxWidth: "26ch" }}>
            Let's keep you compliant in every state.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto", maxWidth: "60ch" }}>
            Tell us where you do business and what you need handled — sales tax, annual reports,
            franchise tax, registered agent, and more — and we'll keep your filings current.
          </p>
        </div>

        <div className="intake-card">
          <div className="intake-service-banner">
            <span className="intake-service-banner-icon"><Icon name="landmark" size={16} /></span>
            <span className="intake-service-banner-label">Service:</span>
            <strong>US state tax compliance</strong>
            <button type="button" className="intake-service-change" onClick={() => { if (onExit) onExit(); }}>
              Change service
            </button>
          </div>

          {!submitted && (
            <React.Fragment>
              {/* Services */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="list-checks" size={16} /></div>
                <div>
                  <h3>What do you need help with?</h3>
                  <p>Select every state-level service you'd like us to handle.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="inc-type-grid stc-service-grid">
                    {STC_SERVICES.map((t) => (
                      <button
                        type="button"
                        key={t.v}
                        className={"inc-type-card" + (form.services.indexOf(t.v) > -1 ? " selected" : "")}
                        onClick={() => toggleIn("services", t.v)}
                      >
                        <span className="inc-type-icon"><Icon name={t.icon} size={20} /></span>
                        <span className="inc-type-title">{t.title}</span>
                        <span className="inc-type-sub">{t.sub}</span>
                        <span className="ext-kind-check"><Icon name="check" size={13} /></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* About the business */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="building-2" size={16} /></div>
                <div>
                  <h3>About the business</h3>
                  <p>The basics we need to register and file on your behalf.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row">
                  <STField label="Legal business name" required hint="Exactly as it appears on your formation documents.">
                    <input className="field-input" type="text" placeholder="Whitfield Holdings LLC" value={form.bizName} onChange={(e) => update({ bizName: e.target.value })} />
                  </STField>
                  <STField label="Entity type" required>
                    <select className="field-select" value={form.entityType} onChange={(e) => update({ entityType: e.target.value })}>
                      <option value="">— Select —</option>
                      {STC_ENTITY_TYPES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </STField>
                </div>
                <div className="form-row">
                  <STField label="EIN (federal tax ID)" required hint="Nine digits — encrypted and stored securely.">
                    <input className="field-input" type="text" inputMode="numeric" placeholder="XX-XXXXXXX" value={form.ein} onChange={(e) => update({ ein: e.target.value })} />
                  </STField>
                  <STField label="Home / formation state" required>
                    <select className="field-select" value={form.homeState} onChange={(e) => update({ homeState: e.target.value })}>
                      <option value="">— Select a state —</option>
                      {STC_US_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </STField>
                </div>
                <div className="form-row full">
                  <STField label="Business full address" required hint="Principal business address — street, city, state, and ZIP.">
                    <input className="field-input" type="text" placeholder="123 Main St, Suite 200, Austin, TX 78701" value={form.bizAddress} onChange={(e) => update({ bizAddress: e.target.value })} />
                  </STField>
                </div>
                <div className="form-row">
                  <STField label="Industry / what you sell" hint="Helps us assess where sales tax applies.">
                    <input className="field-input" type="text" placeholder="e.g. SaaS, e-commerce apparel, consulting" value={form.industry} onChange={(e) => update({ industry: e.target.value })} />
                  </STField>
                  <STField label="Estimated annual revenue">
                    <select className="field-select" value={form.revenue} onChange={(e) => update({ revenue: e.target.value })}>
                      <option value="">— Select a range —</option>
                      {STC_REVENUE.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </STField>
                </div>
              </div>

              {/* States to comply in */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="map-pin" size={16} /></div>
                <div>
                  <h3>Where do you need to comply?</h3>
                  <p>Select every state where you have customers, employees, property, or sales.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="stc-state-grid">
                    {STC_US_STATES.map((s) => (
                      <button
                        type="button"
                        key={s}
                        className={"stc-state-chip" + (form.states.indexOf(s) > -1 ? " selected" : "")}
                        onClick={() => toggleIn("states", s)}
                      >
                        <span className="stc-state-check"><Icon name="check" size={12} /></span>
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="stc-state-foot">
                    <span className={"inc-owners-total" + (form.states.length ? " ok" : "")}>
                      {form.states.length} {form.states.length === 1 ? "state" : "states"} selected
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary contact */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="user" size={16} /></div>
                <div>
                  <h3>Primary contact</h3>
                  <p>Who should we coordinate the engagement with?</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row">
                  <STField label="Full name" required>
                    <input className="field-input" type="text" placeholder="Avery Whitfield" value={form.contactName} onChange={(e) => update({ contactName: e.target.value })} />
                  </STField>
                  <STField label="Email" required>
                    <input className="field-input" type="email" placeholder="you@example.com" value={form.contactEmail} onChange={(e) => update({ contactEmail: e.target.value })} />
                  </STField>
                </div>

                <label className="consent-box">
                  <input type="checkbox" checked={form.consent} onChange={(e) => update({ consent: e.target.checked })} />
                  <span>
                    I authorize Mindful US CPA to register for and prepare the state filings selected above
                    and confirm the details provided are accurate.
                  </span>
                </label>
              </div>

              <div className="intake-footer">
                <button type="button" className="btn-back" onClick={() => { if (onExit) onExit(); }}>
                  <Icon name="arrow-left" size={14} />
                  Back to services
                </button>
                <span className="save-note"><Icon name="lock" size={12} /> Saved securely</span>
                <button type="button" className={"btn btn-primary" + (ready ? "" : " disabled")} disabled={!ready} onClick={submit}>
                  <Icon name="check" size={14} />
                  Submit compliance request
                </button>
              </div>
            </React.Fragment>
          )}

          {submitted && (
            <div className="intake-body" style={{ padding: 0 }}>
              <div className="success-card">
                <div className="success-icon"><Icon name="check" size={36} /></div>
                <h2>State compliance request submitted.</h2>
                <p>
                  Thank you. Your specialist will review your filings across {form.states.length || "your"}{" "}
                  {form.states.length === 1 ? "state" : "states"} and get your registrations and returns on track.
                  We'll be in touch within one business day.
                </p>
                <div className="ref-box">
                  <div className="ref-label">Your reference number</div>
                  <div className="ref-num numeric">{refNum}</div>
                </div>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
                  <button className="btn btn-secondary" onClick={() => { if (onExit) onExit(); }}>
                    Back to dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCongrats && (
        <div className="inc-modal-overlay" onClick={() => setShowCongrats(false)}>
          <div className="inc-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="inc-modal-close" aria-label="Close" onClick={() => setShowCongrats(false)}>
              <Icon name="x" size={18} />
            </button>
            <div className="inc-modal-badge"><Icon name="party-popper" size={34} /></div>
            <div className="inc-modal-eyebrow">You're covered</div>
            <h2 className="inc-modal-title">You're on the path to compliance!</h2>
            <p className="inc-modal-body">
              Thanks for trusting us with {form.bizName ? <strong>{form.bizName}</strong> : "your business"}.
              Our team will shortly review your information and keep you updated on the progress every step of the way.
            </p>
            <div className="inc-modal-ref">
              <span className="inc-modal-ref-label">Reference number</span>
              <span className="inc-modal-ref-num numeric">{refNum}</span>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => setShowCongrats(false)}>
              <Icon name="check" size={14} />
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export { StateComplianceOrganizer };

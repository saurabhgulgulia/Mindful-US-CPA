import React from 'react';
import { Calendar } from './Calendar.jsx';
import { Icon } from './Icon.jsx';

// BookkeepingOrganizer — dedicated intake for the Bookkeeping service.
// Bookkeeping is a business engagement, so it does NOT use the individual 1040
// residency questionnaire. It collects the business profile and accounting basis
// our team needs to set up monthly books. Reuses the intake-card / field styles.

function BkField({ label, required, hint, children }) {
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

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
  "Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

function BookkeepingOrganizer({ presetService, onExit }) {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [refNum, setRefNum] = React.useState("");
  const [form, setForm] = React.useState({
    businessName: "",
    nature: "",
    state: "",
    method: "",          // cash | accrual | other
    methodOther: "",
    period: "",          // calendar | fiscal
    fiscalStart: "",
    fiscalEnd: "",
    consent: false,
    software: "",        // quickbooks | xero | zoho | freshbooks | other
    softwareOther: "",
  });
  const update = (patch) => setForm((s) => ({ ...s, ...patch }));

  const scrollTop = () => setTimeout(() => {
    const el = document.getElementById("bk-top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);

  const methodReady = form.method && (form.method !== "other" || form.methodOther.trim());
  const periodReady = form.period && (form.period !== "fiscal" || (form.fiscalStart && form.fiscalEnd));
  const detailsReady =
    form.businessName.trim() && form.nature.trim() && form.state &&
    methodReady && periodReady && form.consent;
  const softwareReady = form.software && (form.software !== "other" || form.softwareOther.trim());

  const goToSoftware = () => {
    if (!detailsReady) {
      if (!form.consent) alert("Please review and check the consent box before continuing.");
      return;
    }
    setStep(2);
    scrollTop();
  };

  const submit = () => {
    if (!softwareReady) return;
    setRefNum("MUC-BK-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000));
    setSubmitted(true);
    scrollTop();
  };

  const METHODS = [
    { v: "cash", title: "Cash basis", sub: "Income & expenses recorded when money changes hands." },
    { v: "accrual", title: "Accrual basis", sub: "Income & expenses recorded when earned or incurred." },
    { v: "other", title: "Other / not sure", sub: "We'll help you choose the right basis." },
  ];
  const PERIODS = [
    { v: "calendar", title: "Calendar year", sub: "Jan 1 – Dec 31." },
    { v: "fiscal", title: "Fiscal year", sub: "A 12-month period ending in another month." },
  ];
  const SOFTWARE = [
    { v: "quickbooks", title: "QuickBooks", sub: "QuickBooks Online or Desktop.", icon: "book-open" },
    { v: "xero", title: "Xero", sub: "Cloud accounting platform.", icon: "cloud" },
    { v: "zoho", title: "Zoho Books", sub: "Part of the Zoho suite.", icon: "book" },
    { v: "freshbooks", title: "FreshBooks", sub: "Invoicing & accounting.", icon: "receipt" },
    { v: "other", title: "Other", sub: "Please specify which platform.", icon: "more-horizontal" },
  ];

  return (
    <section className="intake-portal" id="bk-top">
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: "var(--space-7)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Bookkeeping</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-3)", maxWidth: "22ch" }}>
            Tell us about your business.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto", maxWidth: "58ch" }}>
            A few details about how your business operates lets us set up your books on the right
            basis from day one — no tax-residency questionnaire required.
          </p>
        </div>

        <div className="intake-card">
          <div className="intake-service-banner">
            <span className="intake-service-banner-icon"><Icon name="book-open" size={16} /></span>
            <span className="intake-service-banner-label">Service:</span>
            <strong>Bookkeeping (QuickBooks / Xero)</strong>
            <button type="button" className="intake-service-change" onClick={() => { if (onExit) onExit(); }}>
              Change service
            </button>
          </div>

          {!submitted && step === 1 && (
            <React.Fragment>
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="building-2" size={16} /></div>
                <div>
                  <h3>Your business profile</h3>
                  <p>The basics of who you are and what you do.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <BkField label="Name of the business" required>
                    <input className="field-input" type="text" placeholder="Whitfield Holdings LLC" value={form.businessName} onChange={(e) => update({ businessName: e.target.value })} />
                  </BkField>
                </div>
                <div className="form-row full">
                  <BkField label="Nature of business" required hint="In a sentence — what does your business do?">
                    <input className="field-input" type="text" placeholder="e.g. e-commerce apparel, consulting, real-estate rentals" value={form.nature} onChange={(e) => update({ nature: e.target.value })} />
                  </BkField>
                </div>
                <div className="form-row full">
                  <BkField label="Operating state" required>
                    <select className="field-select" value={form.state} onChange={(e) => update({ state: e.target.value })}>
                      <option value="">— Select a state —</option>
                      {US_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </BkField>
                </div>
              </div>

              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="scale" size={16} /></div>
                <div>
                  <h3>Accounting method</h3>
                  <p>How your books recognise income and expenses.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="bk-choice-grid">
                    {METHODS.map((m) => (
                      <button
                        type="button"
                        key={m.v}
                        className={"bk-choice" + (form.method === m.v ? " selected" : "")}
                        onClick={() => update({ method: m.v })}
                      >
                        <span className="bk-choice-title">{m.title}</span>
                        <span className="bk-choice-sub">{m.sub}</span>
                        <span className="ext-kind-check"><Icon name="check" size={13} /></span>
                      </button>
                    ))}
                  </div>
                </div>
                {form.method === "other" && (
                  <div className="form-row full">
                    <BkField label="Please specify" required>
                      <input className="field-input" type="text" placeholder="Describe your accounting method" value={form.methodOther} onChange={(e) => update({ methodOther: e.target.value })} />
                    </BkField>
                  </div>
                )}
              </div>

              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="calendar-range" size={16} /></div>
                <div>
                  <h3>Accounting period</h3>
                  <p>The 12-month period your books cover.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="bk-choice-grid bk-choice-grid-2">
                    {PERIODS.map((p) => (
                      <button
                        type="button"
                        key={p.v}
                        className={"bk-choice" + (form.period === p.v ? " selected" : "")}
                        onClick={() => update({ period: p.v })}
                      >
                        <span className="bk-choice-title">{p.title}</span>
                        <span className="bk-choice-sub">{p.sub}</span>
                        <span className="ext-kind-check"><Icon name="check" size={13} /></span>
                      </button>
                    ))}
                  </div>
                </div>
                {form.period === "fiscal" && (
                  <div className="form-row">
                    <BkField label="Fiscal year start" required>
                      <input className="field-input" type="date" value={form.fiscalStart} onChange={(e) => update({ fiscalStart: e.target.value })} />
                    </BkField>
                    <BkField label="Fiscal year end" required>
                      <input className="field-input" type="date" value={form.fiscalEnd} onChange={(e) => update({ fiscalEnd: e.target.value })} />
                    </BkField>
                  </div>
                )}

                <label className="consent-box">
                  <input type="checkbox" checked={form.consent} onChange={(e) => update({ consent: e.target.checked })} />
                  <span>
                    I confirm the details above are accurate and authorize Mindful US CPA to begin setting
                    up and maintaining my books on this basis.
                  </span>
                </label>
              </div>

              <div className="intake-footer">
                <button type="button" className="btn-back" onClick={() => { if (onExit) onExit(); }}>
                  <Icon name="arrow-left" size={14} />
                  Back to services
                </button>
                <span className="save-note"><Icon name="lock" size={12} /> Saved securely</span>
                <button type="button" className={"btn btn-primary" + (detailsReady ? "" : " disabled")} disabled={!detailsReady} onClick={goToSoftware}>
                  Submit business details
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {!submitted && step === 2 && (
            <React.Fragment>
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="laptop" size={16} /></div>
                <div>
                  <h3>Which accounting software do you use?</h3>
                  <p>So we can connect to your books — or recommend a platform if you're starting fresh.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="bk-soft-grid">
                    {SOFTWARE.map((sw) => (
                      <button
                        type="button"
                        key={sw.v}
                        className={"bk-soft" + (form.software === sw.v ? " selected" : "")}
                        onClick={() => update({ software: sw.v })}
                      >
                        <span className="bk-soft-icon"><Icon name={sw.icon} size={20} /></span>
                        <span className="bk-soft-text">
                          <span className="bk-soft-title">{sw.title}</span>
                          <span className="bk-soft-sub">{sw.sub}</span>
                        </span>
                        <span className="ext-kind-check"><Icon name="check" size={13} /></span>
                      </button>
                    ))}
                  </div>
                </div>
                {form.software === "other" && (
                  <div className="form-row full">
                    <BkField label="Please specify" required>
                      <input className="field-input" type="text" placeholder="Which accounting software do you use?" value={form.softwareOther} onChange={(e) => update({ softwareOther: e.target.value })} />
                    </BkField>
                  </div>
                )}
              </div>

              <div className="intake-footer">
                <button type="button" className="btn-back" onClick={() => { setStep(1); scrollTop(); }}>
                  <Icon name="arrow-left" size={14} />
                  Back to details
                </button>
                <span className="save-note"><Icon name="lock" size={12} /> Saved securely</span>
                <button type="button" className={"btn btn-primary" + (softwareReady ? "" : " disabled")} disabled={!softwareReady} onClick={submit}>
                  <Icon name="check" size={14} />
                  Submit
                </button>
              </div>
            </React.Fragment>
          )}

          {submitted && (
            <div className="intake-body" style={{ padding: 0 }}>
              <div className="success-card">
                <div className="success-icon"><Icon name="check" size={36} /></div>
                <h2>Business details received.</h2>
                <p>
                  Thank you. Your bookkeeping specialist will review {form.businessName || "your business"}'s
                  profile{form.software ? ` and connect to ${form.software === "other" ? (form.softwareOther || "your accounting software") : SOFTWARE.find((s) => s.v === form.software).title}` : ""}{" "}
                  to set up your monthly books.
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
    </section>
  );
}

export { BookkeepingOrganizer };

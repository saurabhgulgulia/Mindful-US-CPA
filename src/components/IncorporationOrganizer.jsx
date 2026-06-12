import React from 'react';
import { Icon } from './Icon.jsx';

// IncorporationOrganizer — dedicated intake for "Business incorporation".
// Forming a NEW entity is not a tax-return filing, so this does not use the
// Entity Tax Organizer. It collects what we need to register the company:
// entity type, proposed names, formation state, owners, registered agent, EIN.
// Reuses the intake-card / field styles.

function IncField({ label, required, hint, children }) {
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

const INC_US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
  "Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

const INC_ENTITY_TYPES = [
  { v: "llc", title: "LLC", sub: "Limited liability company — flexible, pass-through by default.", icon: "shield" },
  { v: "s-corp", title: "S-Corporation", sub: "Pass-through with payroll for owner-employees.", icon: "store" },
  { v: "c-corp", title: "C-Corporation", sub: "Separate taxpayer — best for outside investors.", icon: "building-2" },
  { v: "unsure", title: "Not sure yet", sub: "We'll recommend the right structure for you.", icon: "help-circle" },
];

function IncorporationOrganizer({ presetService, onExit }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [showCongrats, setShowCongrats] = React.useState(false);
  const [refNum, setRefNum] = React.useState("");
  const [form, setForm] = React.useState({
    entityType: "",
    name1: "",
    name2: "",
    name3: "",
    state: "",
    purpose: "",
    bizAddress: "",
    owners: [{ first: "", middle: "", last: "", dob: "", ssn: "", pct: "", address: "" }],
    agent: "",          // mindful | self
    agentAddress: "",
    needEin: "",        // yes | no
    consent: false,
  });
  const update = (patch) => setForm((s) => ({ ...s, ...patch }));

  const setOwner = (i, patch) =>
    setForm((s) => ({ ...s, owners: s.owners.map((o, idx) => (idx === i ? { ...o, ...patch } : o)) }));
  const addOwner = () => setForm((s) => ({ ...s, owners: [...s.owners, { first: "", middle: "", last: "", dob: "", ssn: "", pct: "", address: "" }] }));
  const removeOwner = (i) => setForm((s) => ({ ...s, owners: s.owners.filter((_, idx) => idx !== i) }));

  const ownersTotal = form.owners.reduce((sum, o) => sum + (parseFloat(o.pct) || 0), 0);
  const ownersReady = form.owners.every((o) => o.first.trim() && o.last.trim() && o.dob.trim() && o.ssn.trim() && o.pct !== "" && o.address.trim());
  const ready =
    form.entityType && form.name1.trim() && form.state && form.bizAddress.trim() &&
    ownersReady && form.agent && form.agentAddress.trim() && form.needEin && form.consent;

  const submit = () => {
    if (!ready) {
      if (!form.consent) alert("Please review and check the consent box before submitting.");
      return;
    }
    setRefNum("MUC-INC-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000));
    setSubmitted(true);
    setShowCongrats(true);
    setTimeout(() => {
      const el = document.getElementById("inc-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="intake-portal" id="inc-top">
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: "var(--space-7)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Business incorporation</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-3)", maxWidth: "24ch" }}>
            Let's form your company.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto", maxWidth: "58ch" }}>
            A few details about the business you want to start lets us register the entity, set up
            ownership, and get your EIN — no tax-return questionnaire required.
          </p>
        </div>

        <div className="intake-card">
          <div className="intake-service-banner">
            <span className="intake-service-banner-icon"><Icon name="briefcase" size={16} /></span>
            <span className="intake-service-banner-label">Service:</span>
            <strong>Business incorporation</strong>
            <button type="button" className="intake-service-change" onClick={() => { if (onExit) onExit(); }}>
              Change service
            </button>
          </div>

          {!submitted && (
            <React.Fragment>
              {/* Entity type */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="layers" size={16} /></div>
                <div>
                  <h3>What kind of entity do you want to form?</h3>
                  <p>This determines how the company is taxed and how owners are paid.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="inc-type-grid">
                    {INC_ENTITY_TYPES.map((t) => (
                      <button
                        type="button"
                        key={t.v}
                        className={"inc-type-card" + (form.entityType === t.v ? " selected" : "")}
                        onClick={() => update({ entityType: t.v })}
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

              {/* Name & state */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="type" size={16} /></div>
                <div>
                  <h3>Name &amp; formation state</h3>
                  <p>Give us three name choices in order of preference, in case your top picks are taken.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row inc-names-row">
                  <IncField label="Proposed business name — first choice" required hint="Include the ending you want, e.g. LLC or Inc.">
                    <input className="field-input" type="text" placeholder="Whitfield Holdings LLC" value={form.name1} onChange={(e) => update({ name1: e.target.value })} />
                  </IncField>
                  <IncField label="Second choice" hint="Used if your first choice isn't available.">
                    <input className="field-input" type="text" placeholder="Second preference" value={form.name2} onChange={(e) => update({ name2: e.target.value })} />
                  </IncField>
                  <IncField label="Third choice" hint="Used if the first two aren't available.">
                    <input className="field-input" type="text" placeholder="Third preference" value={form.name3} onChange={(e) => update({ name3: e.target.value })} />
                  </IncField>
                </div>
                <p className="inc-name-note">
                  <Icon name="info" size={14} />
                  We'll have to check with the state department whether the name is available, or whether someone has already used it to form their business.
                </p>
                <div className="form-row">
                  <IncField label="State of formation" required>
                    <select className="field-select" value={form.state} onChange={(e) => update({ state: e.target.value })}>
                      <option value="">— Select a state —</option>
                      {INC_US_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </IncField>
                  <IncField label="Business purpose" hint="In a few words — what will the business do?">
                    <input className="field-input" type="text" placeholder="e.g. consulting, e-commerce, real estate" value={form.purpose} onChange={(e) => update({ purpose: e.target.value })} />
                  </IncField>
                </div>
                <div className="form-row full">
                  <IncField label="Business full address" required hint="Principal business address — street, city, state, and ZIP.">
                    <input className="field-input" type="text" placeholder="123 Main St, Suite 200, Austin, TX 78701" value={form.bizAddress} onChange={(e) => update({ bizAddress: e.target.value })} />
                  </IncField>
                </div>
              </div>

              {/* Owners */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="users" size={16} /></div>
                <div>
                  <h3>Owners &amp; ownership</h3>
                  <p>List each owner or member, their ownership percentage, and full address.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="inc-owners">
                  {form.owners.map((o, i) => (
                    <div className="inc-owner-block" key={i}>
                      <div className="inc-owner-block-head">
                        <span className="inc-owner-tag">Owner {i + 1}</span>
                        {form.owners.length > 1 && (
                          <button type="button" className="inc-owner-remove" onClick={() => removeOwner(i)} aria-label="Remove owner">
                            <Icon name="x" size={16} />
                          </button>
                        )}
                      </div>
                      <div className="inc-owner-grid3">
                        <IncField label="First name" required={i === 0}>
                          <input className="field-input" type="text" placeholder="First" value={o.first} onChange={(e) => setOwner(i, { first: e.target.value })} />
                        </IncField>
                        <IncField label="Middle name">
                          <input className="field-input" type="text" placeholder="Middle" value={o.middle} onChange={(e) => setOwner(i, { middle: e.target.value })} />
                        </IncField>
                        <IncField label="Last name" required={i === 0}>
                          <input className="field-input" type="text" placeholder="Last" value={o.last} onChange={(e) => setOwner(i, { last: e.target.value })} />
                        </IncField>
                      </div>
                      <div className="inc-owner-grid3">
                        <IncField label="Date of birth" required={i === 0}>
                          <input className="field-input" type="date" value={o.dob} onChange={(e) => setOwner(i, { dob: e.target.value })} />
                        </IncField>
                        <IncField label="SSN / ITIN" required={i === 0} hint="Encrypted — stored securely.">
                          <input className="field-input" type="text" inputMode="numeric" placeholder="XXX-XX-XXXX" value={o.ssn} onChange={(e) => setOwner(i, { ssn: e.target.value })} />
                        </IncField>
                        <IncField label="Ownership %" required={i === 0}>
                          <input className="field-input" type="text" inputMode="decimal" placeholder="0" value={o.pct} onChange={(e) => setOwner(i, { pct: e.target.value })} />
                        </IncField>
                      </div>
                      <IncField label="Owner full address" required={i === 0} hint="Street, city, state, and ZIP.">
                        <input className="field-input" type="text" placeholder="456 Oak Ave, Denver, CO 80202" value={o.address} onChange={(e) => setOwner(i, { address: e.target.value })} />
                      </IncField>
                    </div>
                  ))}
                </div>
                <div className="inc-owners-foot">
                  <button type="button" className="inc-add-owner" onClick={addOwner}>
                    <Icon name="plus" size={14} /> Add another owner
                  </button>
                  <span className={"inc-owners-total" + (Math.round(ownersTotal) === 100 ? " ok" : "")}>
                    Total: {ownersTotal || 0}%
                  </span>
                </div>
              </div>

              {/* Registered agent + EIN */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="clipboard-check" size={16} /></div>
                <div>
                  <h3>Registered agent &amp; EIN</h3>
                  <p>The last couple of choices to get your entity filed.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <span className="intake-field-label" style={{ marginBottom: 8, display: "block" }}>Registered agent <span className="intake-field-required">*</span></span>
                  <div className="ext-radio-row">
                    {[{ v: "self", label: "I'll provide my own agent" }].map((o) => (
                      <button type="button" key={o.v} className={"ext-radio" + (form.agent === o.v ? " selected" : "")} onClick={() => update({ agent: o.v })}>
                        <span className="ext-radio-dot" />
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: "var(--space-4)" }}>
                    <IncField label="Registered agent full address" required hint="The agent's physical street address in the state of formation — no P.O. boxes.">
                      <input className="field-input" type="text" placeholder="789 Commerce St, Wilmington, DE 19801" value={form.agentAddress} onChange={(e) => update({ agentAddress: e.target.value })} />
                    </IncField>
                  </div>
                </div>
                <div className="form-row full">
                  <span className="intake-field-label" style={{ marginBottom: 8, display: "block" }}>Do you want us to obtain an EIN (federal tax ID)? <span className="intake-field-required">*</span></span>
                  <div className="ext-radio-row">
                    {[{ v: "yes", label: "Yes" }, { v: "no", label: "No" }].map((o) => (
                      <button type="button" key={o.v} className={"ext-radio" + (form.needEin === o.v ? " selected" : "")} onClick={() => update({ needEin: o.v })}>
                        <span className="ext-radio-dot" />
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="consent-box">
                  <input type="checkbox" checked={form.consent} onChange={(e) => update({ consent: e.target.checked })} />
                  <span>
                    I authorize Mindful US CPA to prepare and file the formation documents for this entity
                    and confirm the details above are accurate.
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
                  Submit incorporation request
                </button>
              </div>
            </React.Fragment>
          )}

          {submitted && (
            <div className="intake-body" style={{ padding: 0 }}>
              <div className="success-card">
                <div className="success-icon"><Icon name="check" size={36} /></div>
                <h2>Incorporation request submitted.</h2>
                <p>
                  Thank you. Your specialist will check name availability for {form.name1 || "your business"} and
                  prepare the formation documents in {form.state || "your state"}. We'll be in touch within one business day.
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
            <div className="inc-modal-eyebrow">Welcome aboard</div>
            <h2 className="inc-modal-title">Congratulations on your first move!</h2>
            <p className="inc-modal-body">
              You've taken the first step toward forming {form.name1 ? <strong>{form.name1}</strong> : "your business"}.
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

export { IncorporationOrganizer };

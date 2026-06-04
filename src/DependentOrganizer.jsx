import React from 'react';
import { Icon } from './Icon.jsx';

// DependentOrganizer — conditional block under "I have dependents → That's me".
// Per dependent: identity, relationship, residency/support tests, student flag,
// citizenship status, and an optional dependent-care expense sub-block with a
// file-upload for proof.

const RELATIONSHIPS = [
  "Son", "Daughter", "Stepchild", "Foster child",
  "Grandchild", "Parent", "Sibling", "Niece / Nephew", "Other relative",
];

const emptyDependent = (i) => ({
  label: `Dependent ${i + 1}`,
  firstName: "", middleName: "", lastName: "",
  dob: "", taxId: "", relation: "",
  livedWithYou: "",       // "yes" | "no"
  fullTimeStudent: "",    // "yes" | "no"
  citizenship: "",        // "citizen" | "resident" | "nonresident"
  support50: "",          // "yes" | "no"
  careExpenses: "",       // "yes" | "no"
  care: {
    providerName: "", providerId: "", amount: { amount: "", currency: "USD", rateBasis: "" }, files: [],
  },
});

function DependentOrganizer({ value, onChange }) {
  const deps = value && value.length > 0 ? value : [emptyDependent(0)];
  const [active, setActive] = React.useState(0);

  const update = (idx, patch) => onChange(deps.map((d, i) => (i === idx ? { ...d, ...patch } : d)));
  const updateCare = (idx, patch) =>
    onChange(deps.map((d, i) => (i === idx ? { ...d, care: { ...d.care, ...patch } } : d)));
  const addDependent = () => {
    const next = [...deps, emptyDependent(deps.length)];
    onChange(next);
    setActive(next.length - 1);
  };
  const removeDependent = (idx) => {
    if (deps.length === 1) return;
    const next = deps.filter((_, i) => i !== idx).map((d, i) => ({ ...d, label: `Dependent ${i + 1}` }));
    onChange(next);
    setActive(Math.max(0, Math.min(active, next.length - 1)));
  };

  const d = deps[active];

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).map((f) => ({ name: f.name, size: f.size }));
    updateCare(active, { files: [...d.care.files, ...incoming] });
  };
  const removeFile = (i) => updateCare(active, { files: d.care.files.filter((_, idx) => idx !== i) });

  return (
    <div className="dep-card">
      <div className="dep-header">
        <span className="dep-header-emoji" aria-hidden="true">👨‍👩‍👧‍👦</span>
        <div>
          <h3>Your dependents</h3>
          <p>Add everyone you'd like us to consider as a dependent. A few quick questions per person tells us which credits you qualify for.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="rental-tabs">
        {deps.map((dep, i) => (
          <button key={i} type="button" className={"rental-tab" + (active === i ? " active" : "")} onClick={() => setActive(i)}>
            <span>{(dep.firstName || dep.label).trim()}</span>
            {deps.length > 1 && (
              <span role="button" tabIndex={0} className="rental-tab-remove" aria-label={`Remove ${dep.label}`}
                onClick={(e) => { e.stopPropagation(); removeDependent(i); }}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); removeDependent(i); } }}>
                <Icon name="x" size={12} />
              </span>
            )}
          </button>
        ))}
        <button type="button" className="rental-tab-add" onClick={addDependent}>
          <Icon name="plus" size={14} />
          Add another dependent
        </button>
      </div>

      {/* Identity */}
      <div className="rental-section">
        <div className="rental-section-head">
          <span className="rental-section-icon"><Icon name="user" size={16} /></span>
          <div><h4>Who they are</h4></div>
        </div>
        <div className="rental-grid">
          <label className="rental-field"><span className="rental-field-label">First name</span>
            <input className="rental-input" type="text" placeholder="First name" value={d.firstName} onChange={(e) => update(active, { firstName: e.target.value })} /></label>
          <label className="rental-field"><span className="rental-field-label">Middle name</span>
            <input className="rental-input" type="text" placeholder="Optional" value={d.middleName} onChange={(e) => update(active, { middleName: e.target.value })} /></label>
          <label className="rental-field"><span className="rental-field-label">Last name</span>
            <input className="rental-input" type="text" placeholder="Last name" value={d.lastName} onChange={(e) => update(active, { lastName: e.target.value })} /></label>
          <label className="rental-field"><span className="rental-field-label">Date of birth</span>
            <input className="rental-input" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" maxLength={10} value={d.dob} onChange={(e) => update(active, { dob: e.target.value })} /></label>
          <label className="rental-field"><span className="rental-field-label">SSN or ITIN</span>
            <input className="rental-input" type="text" placeholder="XXX-XX-XXXX" value={d.taxId} onChange={(e) => update(active, { taxId: e.target.value })} /></label>
          <label className="rental-field"><span className="rental-field-label">Relationship to you</span>
            <select className="rental-input" value={d.relation} onChange={(e) => update(active, { relation: e.target.value })}>
              <option value="">— Select —</option>
              {RELATIONSHIPS.map((r) => <option key={r}>{r}</option>)}
            </select></label>
        </div>
      </div>

      {/* Tests */}
      <div className="rental-section">
        <div className="rental-section-head">
          <span className="rental-section-icon"><Icon name="clipboard-check" size={16} /></span>
          <div><h4>A few quick questions</h4></div>
        </div>
        <div className="dep-questions">
          <DepToggle
            q="Did they live with you for more than 6 months this year?"
            value={d.livedWithYou} onChange={(v) => update(active, { livedWithYou: v })} />
          <DepToggle
            q="Are they a full-time student?"
            value={d.fullTimeStudent} onChange={(v) => update(active, { fullTimeStudent: v })} />
          <DepToggle
            q="Do you provide more than 50% of their living expenses?"
            value={d.support50} onChange={(v) => update(active, { support50: v })} />
          <div className="dep-q">
            <span className="dep-q-text">What is their status?</span>
            <div className="dep-seg">
              {[
                { id: "citizen", label: "US citizen" },
                { id: "resident", label: "Resident" },
                { id: "nonresident", label: "Non-resident" },
              ].map((o) => (
                <button key={o.id} type="button"
                  className={"dep-seg-btn" + (d.citizenship === o.id ? " selected" : "")}
                  onClick={() => update(active, { citizenship: o.id })}>{o.label}</button>
              ))}
            </div>
          </div>
          <DepToggle
            q="Any out-of-pocket dependent-care expenses?"
            hint="Daycare, after-school care, or a care provider you paid directly."
            value={d.careExpenses} onChange={(v) => update(active, { careExpenses: v })} />
        </div>
      </div>

      {/* Care expense sub-block */}
      {d.careExpenses === "yes" && (
        <div className="rental-section dep-care">
          <div className="rental-section-head">
            <span className="rental-section-icon"><Icon name="heart-handshake" size={16} /></span>
            <div>
              <h4>Dependent-care details</h4>
              <p>These feed the Child &amp; Dependent Care Credit (Form 2441).</p>
            </div>
          </div>
          <div className="rental-grid">
            <label className="rental-field"><span className="rental-field-label">Care provider's name</span>
              <input className="rental-input" type="text" placeholder="Provider or facility name"
                value={d.care.providerName} onChange={(e) => updateCare(active, { providerName: e.target.value })} /></label>
            <label className="rental-field"><span className="rental-field-label">Provider's SSN or EIN</span>
              <input className="rental-input" type="text" placeholder="XX-XXXXXXX"
                value={d.care.providerId} onChange={(e) => updateCare(active, { providerId: e.target.value })} /></label>
            <label className="rental-field"><span className="rental-field-label">Amount you paid (out of pocket)</span>
              <MoneyInput value={d.care.amount} onChange={(v) => updateCare(active, { amount: v })} placeholder="0" /></label>
          </div>

          {/* File upload */}
          <div className="dep-upload-field">
            <span className="rental-field-label">Proof of payment</span>
            <div className="dep-upload" onClick={() => document.getElementById("dep-file-" + active).click()}>
              <input id={"dep-file-" + active} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
              <span className="dep-upload-icon"><Icon name="upload-cloud" size={22} /></span>
              <span className="dep-upload-text">
                <strong>Attach a receipt or statement</strong>
                <span>Click to browse — PDF, JPG, PNG, DOC</span>
              </span>
            </div>
            {d.care.files.length > 0 && (
              <div className="file-list" style={{ marginTop: 10 }}>
                {d.care.files.map((f, i) => (
                  <div key={i} className="file-row">
                    <span className="file-check"><Icon name="check" size={14} /></span>
                    <span className="file-name">{f.name}</span>
                    <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
                    <button type="button" className="file-remove" onClick={() => removeFile(i)} aria-label="Remove">
                      <Icon name="x" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DepToggle({ q, hint, value, onChange }) {
  return (
    <div className="dep-q">
      <span className="dep-q-text">
        {q}
        {hint && <span className="dep-q-hint">{hint}</span>}
      </span>
      <div className="dep-seg">
        <button type="button" className={"dep-seg-btn" + (value === "no" ? " selected-no" : "")} onClick={() => onChange("no")}>No</button>
        <button type="button" className={"dep-seg-btn" + (value === "yes" ? " selected-yes" : "")} onClick={() => onChange("yes")}>Yes</button>
      </div>
    </div>
  );
}

export { DependentOrganizer };

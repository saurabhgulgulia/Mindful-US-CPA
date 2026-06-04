import React from 'react';
import { Icon } from './Icon.jsx';

// OwnershipOrganizer — conditional block under
// "I have ownership in a business, partnership, or trust → That's me".
//
// Collects each entity the client holds an interest in, adapts the required
// Schedule K-1 variant to the entity type, and lets the client upload the K-1
// plus any supporting documents (K-3, the entity return, foreign-entity forms).

// Entity types → which form the client should hand us, and the upload prompt.
const OWNERSHIP_ENTITY_TYPES = [
  {
    id: "partnership",
    label: "Partnership / multi-member LLC",
    form: "Schedule K-1 (Form 1065)",
    note: "You should receive a Schedule K-1 (Form 1065) from the partnership.",
  },
  {
    id: "scorp",
    label: "S corporation",
    form: "Schedule K-1 (Form 1120-S)",
    note: "You should receive a Schedule K-1 (Form 1120-S) from the S corporation.",
  },
  {
    id: "trust",
    label: "Trust or estate",
    form: "Schedule K-1 (Form 1041)",
    note: "Beneficiaries receive a Schedule K-1 (Form 1041) from the trust or estate.",
  },
  {
    id: "ccorp",
    label: "C corporation (shareholder)",
    form: "Form 1099-DIV / 1099-B",
    note: "C-corp shares are reported via 1099-DIV (dividends) and 1099-B (sales), not a K-1.",
  },
  {
    id: "smllc",
    label: "Single-member LLC (disregarded)",
    form: "Schedule C / Schedule E records",
    note: "A disregarded single-member LLC flows onto your Schedule C or E — no separate K-1.",
  },
];

const emptyOwnershipEntity = (owner) => ({
  owner: owner || "taxpayer",
  name: "",
  entityType: "",
  ein: "",
  jurisdiction: "us",
  ownershipPct: "",
  income: { amount: "", currency: "USD", rateBasis: "" },
  files: [],
});

function OwnershipOrganizer({ value, onChange, showOwner, filingYear }) {
  const list = value && value.length ? value : [emptyOwnershipEntity("taxpayer")];
  const yr = filingYear || "the filing year";

  const update = (idx, patch) => onChange(list.map((e, i) => (i === idx ? { ...e, ...patch } : e)));
  const add = () => onChange([...list, emptyOwnershipEntity("taxpayer")]);
  const remove = (idx) => {
    const next = list.filter((_, i) => i !== idx);
    onChange(next.length ? next : [emptyOwnershipEntity("taxpayer")]);
  };
  const addFiles = (idx, fl) => {
    const incoming = Array.from(fl).map((f) => ({ name: f.name, size: f.size }));
    update(idx, { files: [...list[idx].files, ...incoming] });
  };
  const removeFile = (idx, fi) => update(idx, { files: list[idx].files.filter((_, i) => i !== fi) });

  return (
    <div className="emp-card">
      <div className="emp-header">
        <span className="emp-header-emoji" aria-hidden="true">🏛️</span>
        <div>
          <h3>Business, partnership &amp; trust ownership</h3>
          <p>Tell us about each entity you held an interest in during {yr}. We'll match the right Schedule K-1 to each one.</p>
        </div>
      </div>

      <div className="emp-protip">
        <span className="emp-protip-tag">What we need</span>
        For most interests this is your <strong>Schedule K-1</strong> — Form 1065 (partnership / LLC),
        1120-S (S corporation), or 1041 (trust or estate). Foreign entities may also need K-3 or a
        separate information return; pick the type below and we'll show you exactly what to attach.
      </div>

      <div className="emp-entries-wrap">
        <div className="emp-entries-head">Entity details</div>
        {list.map((ent, idx) => {
          const typeDef = OWNERSHIP_ENTITY_TYPES.find((t) => t.id === ent.entityType);
          const foreign = ent.jurisdiction === "foreign";
          return (
            <div key={idx} className="emp-entry">
              <div className="emp-entry-head">
                {showOwner ? (
                  <div className="owner-toggle">
                    <span className="owner-toggle-label">This interest belongs to</span>
                    <button type="button" className={"owner-btn" + (ent.owner === "taxpayer" ? " selected" : "")}
                      onClick={() => update(idx, { owner: "taxpayer" })}>
                      <Icon name="user" size={13} /> Tax payer
                    </button>
                    <button type="button" className={"owner-btn" + (ent.owner === "spouse" ? " selected" : "")}
                      onClick={() => update(idx, { owner: "spouse" })}>
                      <Icon name="users" size={13} /> Spouse
                    </button>
                  </div>
                ) : <span />}
                {list.length > 1 && (
                  <button type="button" className="income-entry-remove" onClick={() => remove(idx)}>
                    <Icon name="x" size={13} /> Remove
                  </button>
                )}
              </div>

              <div className="income-fields">
                <label className="rental-field">
                  <span className="rental-field-label">Entity name</span>
                  <input className="rental-input" type="text" placeholder="Legal name of the business, partnership, or trust"
                    value={ent.name} onChange={(e) => update(idx, { name: e.target.value })} />
                </label>
                <label className="rental-field">
                  <span className="rental-field-label">Entity type</span>
                  <select className="rental-input" value={ent.entityType} onChange={(e) => update(idx, { entityType: e.target.value })}>
                    <option value="">Select entity type</option>
                    {OWNERSHIP_ENTITY_TYPES.map((t) => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </label>
                <label className="rental-field">
                  <span className="rental-field-label">EIN / tax ID <span className="rental-field-opt">(optional)</span></span>
                  <input className="rental-input" type="text" placeholder="00-0000000"
                    value={ent.ein} onChange={(e) => update(idx, { ein: e.target.value })} />
                </label>
                <label className="rental-field">
                  <span className="rental-field-label">Where is it organized?</span>
                  <select className="rental-input" value={ent.jurisdiction} onChange={(e) => update(idx, { jurisdiction: e.target.value })}>
                    <option value="us">United States</option>
                    <option value="foreign">Foreign (non-US)</option>
                  </select>
                </label>
                <label className="rental-field">
                  <span className="rental-field-label">Your ownership %</span>
                  <input className="rental-input" type="text" placeholder="e.g. 25%"
                    value={ent.ownershipPct} onChange={(e) => update(idx, { ownershipPct: e.target.value })} />
                </label>
                <label className="rental-field">
                  <span className="rental-field-label">Your share of income / loss <span className="rental-field-opt">(if known)</span></span>
                  <MoneyInput value={ent.income} onChange={(v) => update(idx, { income: v })} placeholder="0" />
                </label>
              </div>

              {typeDef && (
                <div className="ownership-formhint">
                  <span className="ownership-formhint-icon"><Icon name="file-text" size={14} /></span>
                  <span>
                    <strong>{typeDef.form}</strong> — {typeDef.note}
                    {foreign && (
                      <span className="ownership-formhint-foreign">
                        {" "}Because this entity is foreign, we may also need Schedule K-3 and a separate
                        information return (Form 5471, 8865, or 3520/3520-A). Attach anything you have.
                      </span>
                    )}
                  </span>
                </div>
              )}

              <div className="dep-upload-field">
                <span className="rental-field-label">
                  Attach {typeDef ? typeDef.form : "your Schedule K-1"} and any supporting documents
                </span>
                <div className="dep-upload" onClick={() => document.getElementById("own-file-" + idx).click()}>
                  <input id={"own-file-" + idx} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                    style={{ display: "none" }} onChange={(e) => addFiles(idx, e.target.files)} />
                  <span className="dep-upload-icon"><Icon name="upload-cloud" size={22} /></span>
                  <span className="dep-upload-text">
                    <strong>Attach K-1 &amp; supporting documents</strong>
                    <span>K-1, K-3, entity return, foreign-entity forms — PDF, JPG, PNG, DOC, XLS</span>
                  </span>
                </div>
                {ent.files.length > 0 && (
                  <div className="file-list" style={{ marginTop: 10 }}>
                    {ent.files.map((f, fi) => (
                      <div key={fi} className="file-row">
                        <span className="file-check"><Icon name="check" size={14} /></span>
                        <span className="file-name">{f.name}</span>
                        <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
                        <button type="button" className="file-remove" onClick={() => removeFile(idx, fi)} aria-label="Remove">
                          <Icon name="x" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <button type="button" className="income-add" onClick={add}>
          <Icon name="plus" size={14} />
          Add another entity
        </button>
      </div>
    </div>
  );
}

export { OwnershipOrganizer };

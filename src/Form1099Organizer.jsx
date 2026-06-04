import React from 'react';
import { Icon } from './Icon.jsx';

// Form1099Organizer — compact follow-up shown under the "I received dividend
// income" and "I earned interest income" rows. The client lists each payer,
// the amount received, any tax withheld, and uploads the matching 1099
// (1099-DIV for dividends, 1099-INT for interest). Supports multiple payers.

const FORM_1099_CONFIG = {
  INT: {
    emoji: "💵",
    heading: "Interest income",
    intro: "List each bank or payer that paid you interest. Enter the amount and any tax withheld, then attach the Form 1099-INT.",
    form: "Form 1099-INT",
    payerLabel: "Bank / payer name",
    payerPlaceholder: "e.g. Chase, Ally, or a foreign bank",
    amountLabel: "Interest received",
    amountHint: "Choose the currency it was paid in — a USD-equivalent box appears for foreign amounts.",
    note: "Box 1 interest, plus Box 3 (Treasury) or Box 8 (tax-exempt) if shown. Foreign-bank interest counts even without a 1099.",
  },
  DIV: {
    emoji: "💰",
    heading: "Dividend income",
    intro: "List each brokerage or payer that paid you dividends. Enter the amount and any tax withheld, then attach the Form 1099-DIV.",
    form: "Form 1099-DIV",
    payerLabel: "Brokerage / payer name",
    payerPlaceholder: "e.g. Fidelity, Schwab, or a foreign broker",
    amountLabel: "Dividends received",
    amountHint: "Choose the currency it was paid in — a USD-equivalent box appears for foreign amounts.",
    note: "Box 1a ordinary + Box 1b qualified dividends. Foreign dividends count even without a US 1099.",
  },
};

const empty1099Payer = (owner) => ({
  owner: owner || "taxpayer",
  payer: "",
  country: "United States",
  amount:   { amount: "", currency: "USD", rateBasis: "" },
  withheld: { amount: "", currency: "USD", rateBasis: "" },
  files: [],
});

function Form1099Organizer({ value, onChange, kind, filingYear, showOwner }) {
  const cfg = FORM_1099_CONFIG[kind] || FORM_1099_CONFIG.INT;
  const idBase = "f1099-" + kind.toLowerCase();
  const yr = filingYear || "the filing year";

  const list = value && value.length ? value : [empty1099Payer("taxpayer")];
  const update = (idx, patch) => onChange(list.map((e, i) => (i === idx ? { ...e, ...patch } : e)));
  const add = () => onChange([...list, empty1099Payer("taxpayer")]);
  const remove = (idx) => {
    const next = list.filter((_, i) => i !== idx);
    onChange(next.length ? next : [empty1099Payer("taxpayer")]);
  };
  const addFiles = (idx, fl) => {
    const incoming = Array.from(fl).map((f) => ({ name: f.name, size: f.size }));
    update(idx, { files: [...list[idx].files, ...incoming] });
  };
  const removeFile = (idx, fi) => update(idx, { files: list[idx].files.filter((_, i) => i !== fi) });

  return (
    <div className="emp-card">
      <div className="emp-header">
        <span className="emp-header-emoji" aria-hidden="true">{cfg.emoji}</span>
        <div>
          <h3>{cfg.heading}</h3>
          <p>Tell us what you received in {yr} and attach the {cfg.form} for each payer.</p>
        </div>
      </div>

      <div className="emp-entries-wrap" style={{ borderTop: "none", paddingTop: 0, marginTop: 4 }}>
        {list.map((row, idx) => (
          <div key={idx} className="emp-entry">
            <div className="emp-entry-head">
              {showOwner ? (
                <div className="owner-toggle">
                  <span className="owner-toggle-label">This income belongs to</span>
                  <button type="button" className={"owner-btn" + (row.owner === "taxpayer" ? " selected" : "")}
                    onClick={() => update(idx, { owner: "taxpayer" })}>
                    <Icon name="user" size={13} /> Tax payer
                  </button>
                  <button type="button" className={"owner-btn" + (row.owner === "spouse" ? " selected" : "")}
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
                <span className="rental-field-label">{cfg.payerLabel}</span>
                <input className="rental-input" type="text" placeholder={cfg.payerPlaceholder}
                  value={row.payer} onChange={(e) => update(idx, { payer: e.target.value })} />
              </label>
              <label className="rental-field">
                <span className="rental-field-label">Country where income was paid</span>
                <select className="rental-input" value={row.country || "United States"}
                  onChange={(e) => update(idx, { country: e.target.value })}>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="rental-field">
                <span className="rental-field-label">{cfg.amountLabel}</span>
                <MoneyInput value={row.amount} onChange={(v) => update(idx, { amount: v })} placeholder="0" />
                {cfg.amountHint && <span className="rental-field-hint">{cfg.amountHint}</span>}
              </label>
              <label className="rental-field">
                <span className="rental-field-label">Federal tax withheld</span>
                <MoneyInput value={row.withheld} onChange={(v) => update(idx, { withheld: v })} placeholder="0" />
              </label>
            </div>

            <div className="dep-upload-field">
              <span className="rental-field-label">Attach {cfg.form}</span>
              <span className="rental-field-hint" style={{ marginBottom: 8 }}>{cfg.note}</span>
              <div className="dep-upload" onClick={() => document.getElementById(idBase + "-file-" + idx).click()}>
                <input id={idBase + "-file-" + idx} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  style={{ display: "none" }} onChange={(e) => addFiles(idx, e.target.files)} />
                <span className="dep-upload-icon"><Icon name="upload-cloud" size={22} /></span>
                <span className="dep-upload-text">
                  <strong>Attach {cfg.form}</strong>
                  <span>Click to browse — PDF, JPG, PNG, DOC</span>
                </span>
              </div>
              {row.files.length > 0 && (
                <div className="file-list" style={{ marginTop: 10 }}>
                  {row.files.map((f, fi) => (
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
        ))}

        <button type="button" className="income-add" onClick={add}>
          <Icon name="plus" size={14} />
          Add another payer
        </button>
      </div>
    </div>
  );
}

export { Form1099Organizer };

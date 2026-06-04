import React from 'react';
import { Icon } from './Icon.jsx';
import { YesNoRow } from './PersonalInfo.jsx';

// EmployerOrganizer — conditional block under "I get paid by an employer → yes".
// Per employer: owner (only when MFJ), wages, tax withheld, and a W-2 / payslip
// upload covering Jan 1 – Dec 31.

const emptyEmployer = (owner) => ({
  owner: owner || "taxpayer",
  name: "",
  wages:    { amount: "", currency: "USD", rateBasis: "" },
  withheld: { amount: "", currency: "USD", rateBasis: "" },
  files: [],
});

function EmployerOrganizer({ value, onChange, showOwner, filingYear }) {
  const list = value && value.length ? value : [emptyEmployer("taxpayer")];
  const update = (idx, patch) => onChange(list.map((e, i) => (i === idx ? { ...e, ...patch } : e)));
  const add = () => onChange([...list, emptyEmployer(showOwner ? "spouse" : "taxpayer")]);
  const remove = (idx) => {
    const next = list.filter((_, i) => i !== idx);
    onChange(next.length ? next : [emptyEmployer("taxpayer")]);
  };
  const addFiles = (idx, fl) => {
    const incoming = Array.from(fl).map((f) => ({ name: f.name, size: f.size }));
    update(idx, { files: [...list[idx].files, ...incoming] });
  };
  const removeFile = (idx, fi) => update(idx, { files: list[idx].files.filter((_, i) => i !== fi) });

  // Wage-source gate (mirrors the reference "Wage sources" screen)
  const meta = value && value.__meta ? value.__meta : {};
  const setMeta = (patch) => onChange(Object.assign([...list], { __meta: { ...meta, ...patch } }));

  return (
    <div className="emp-card">
      <div className="emp-header">
        <span className="emp-header-emoji" aria-hidden="true">💼</span>
        <div>
          <h3>Wage sources</h3>
          <p>Because you're employed, a couple of quick questions about where your wages came from in {filingYear}.</p>
        </div>
      </div>

      <div className="emp-protip">
        <span className="emp-protip-tag">Good to know</span>
        These questions apply to you. {showOwner ? "We collect your spouse's wages separately." : ""}
      </div>

      <YesNoRow
        label={`Did you receive payments during ${filingYear} from a US employer?`}
        hint="If yes, you likely received a W-2 — we'll ask you to upload it."
        value={meta.usEmployer || ""}
        onChange={(v) => setMeta({ usEmployer: v })}
      />
      <YesNoRow
        label={`Did you receive payments during ${filingYear} from a non-US employer?`}
        hint="Wages, bonus, RSUs, allowances, stock options, etc."
        value={meta.nonUsEmployer || ""}
        onChange={(v) => setMeta({ nonUsEmployer: v })}
      />

      {(meta.usEmployer === "yes" || meta.nonUsEmployer === "yes") && (
        <div className="emp-entries-wrap">
          <div className="emp-entries-head">Employer details</div>
          {list.map((emp, idx) => (
        <div key={idx} className="emp-entry">
          <div className="emp-entry-head">
            {showOwner ? (
              <div className="owner-toggle">
                <span className="owner-toggle-label">This income belongs to</span>
                <button type="button" className={"owner-btn" + (emp.owner === "taxpayer" ? " selected" : "")}
                  onClick={() => update(idx, { owner: "taxpayer" })}>
                  <Icon name="user" size={13} /> Tax payer
                </button>
                <button type="button" className={"owner-btn" + (emp.owner === "spouse" ? " selected" : "")}
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
              <span className="rental-field-label">Employer name</span>
              <input className="rental-input" type="text" placeholder="Employer / company name"
                value={emp.name} onChange={(e) => update(idx, { name: e.target.value })} />
            </label>
            <label className="rental-field">
              <span className="rental-field-label">Wages</span>
              <MoneyInput value={emp.wages} onChange={(v) => update(idx, { wages: v })} placeholder="0" />
            </label>
            <label className="rental-field">
              <span className="rental-field-label">Tax withheld on these wages</span>
              <MoneyInput value={emp.withheld} onChange={(v) => update(idx, { withheld: v })} placeholder="0" />
            </label>
          </div>

          <div className="dep-upload-field">
            <span className="rental-field-label">Attach W-2, payslips, income certificate, or foreign tax return (Jan 1 – Dec 31)</span>
            <div className="dep-upload" onClick={() => document.getElementById("emp-file-" + idx).click()}>
              <input id={"emp-file-" + idx} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                style={{ display: "none" }} onChange={(e) => addFiles(idx, e.target.files)} />
              <span className="dep-upload-icon"><Icon name="upload-cloud" size={22} /></span>
              <span className="dep-upload-text">
                <strong>Attach W-2, payslips, income certificate, or foreign tax return</strong>
                <span>Click to browse — PDF, JPG, PNG, DOC</span>
              </span>
            </div>
            {emp.files.length > 0 && (
              <div className="file-list" style={{ marginTop: 10 }}>
                {emp.files.map((f, fi) => (
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
        Add another employer
      </button>
        </div>
      )}
    </div>
  );
}

export { EmployerOrganizer };

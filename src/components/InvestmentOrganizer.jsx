import React from 'react';
import { Icon } from './Icon.jsx';

// InvestmentOrganizer — conditional block under "I have investments → yes".
// Walks the client through securities sales (US vs foreign / no-1099) and
// non-US pooled funds (PFIC territory). Mirrors the reference investment TQ.

function InvestmentOrganizer({ value, onChange, filingYear }) {
  const v = value || {};
  const set = (patch) => onChange({ ...v, ...patch });
  const yr = filingYear || "the filing year";
  const files = v.files || [];
  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).map((f) => ({ name: f.name, size: f.size }));
    set({ files: [...files, ...incoming] });
  };
  const removeFile = (i) => set({ files: files.filter((_, idx) => idx !== i) });

  return (
    <div className="dep-card invest-card">
      <div className="dep-header">
        <span className="dep-header-emoji" aria-hidden="true">📈</span>
        <div>
          <h3>Your investments</h3>
          <p>A few questions on securities sales and foreign funds. Your answers tell us which schedules and PFIC forms your return needs.</p>
        </div>
      </div>

      <div className="dep-questions">
        <InvToggle
          q={`Did you sell any type of securities during ${yr}?`}
          hint="Stocks, bonds, mutual funds, options, cryptocurrency (i.e. bitcoin, etc.), etc."
          value={v.soldSecurities} onChange={(x) => set({ soldSecurities: x })} />

        {v.soldSecurities === "yes" && (
          <React.Fragment>
            <InvToggle
              three
              q="Did you carry out sales of securities with a U.S. financial institution?"
              value={v.usSales} onChange={(x) => set({ usSales: x })} />

            {v.usSales === "yes" && (
              <div className="invest-followup">
                <label className="rental-field full">
                  <span className="rental-field-label">Do you have Form 1099-B and/or broker statements showing the transaction?</span>
                  <select className="rental-input" value={v.have1099B || ""} onChange={(e) => set({ have1099B: e.target.value })}>
                    <option value="">Select</option>
                    <option value="yes">Yes — I have them</option>
                    <option value="will-upload">I'll upload them later</option>
                    <option value="no">No — I need to request them</option>
                  </select>
                </label>
              </div>
            )}

            <InvToggle
              three
              q="Did you carry out sales of securities with a foreign (non-U.S.) financial institution, or any sale without a U.S. Form 1099?"
              hint="If you answer yes, you'll be able to detail the transactions. This reports all sales for which you didn't receive a US Form 1099 — non-U.S. or U.S."
              value={v.foreignSales} onChange={(x) => set({ foreignSales: x })} />
          </React.Fragment>
        )}

        <InvToggle
          q="Do you have investments in non-U.S. pooled investment funds?"
          hint="E.g. mutual funds, unit trusts, ETFs, REITs, etc. Do NOT report funds held in retirement funds, insurance policies, or annuity products."
          value={v.pooledFunds} onChange={(x) => set({ pooledFunds: x })} />
      </div>

      {/* Supporting documents — attach anything related to these transactions */}
      <div className="invest-docs">
        <div className="dep-upload-field" style={{ marginTop: 0 }}>
          <span className="rental-field-label">Supporting documents</span>
          <span className="rental-field-hint" style={{ marginBottom: 8 }}>
            Attach anything you have for these transactions — 1099-B, broker or consolidated statements,
            trade confirmations, crypto exports, or foreign-account records. You can add as many as you like.
          </span>
          <div className="dep-upload" onClick={() => document.getElementById("invest-file").click()}>
            <input id="invest-file" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.csv,.xls,.xlsx"
              style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
            <span className="dep-upload-icon"><Icon name="upload-cloud" size={22} /></span>
            <span className="dep-upload-text">
              <strong>Attach documents</strong>
              <span>Click to browse — PDF, JPG, PNG, DOC, CSV, XLS</span>
            </span>
          </div>
          {files.length > 0 && (
            <div className="file-list" style={{ marginTop: 10 }}>
              {files.map((f, i) => (
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
    </div>
  );
}

function InvToggle({ q, hint, value, onChange, three }) {
  return (
    <div className="dep-q">
      <span className="dep-q-text">
        {q}
        {hint && <span className="dep-q-hint">{hint}</span>}
      </span>
      <div className="dep-seg">
        <button type="button" className={"dep-seg-btn" + (value === "no" ? " selected-no" : "")} onClick={() => onChange("no")}>No</button>
        <button type="button" className={"dep-seg-btn" + (value === "yes" ? " selected-yes" : "")} onClick={() => onChange("yes")}>Yes</button>
        {three && (
          <button type="button" className={"dep-seg-btn dep-seg-soft" + (value === "unsure" ? " selected-soft" : "")} onClick={() => onChange("unsure")}>I don't know</button>
        )}
      </div>
    </div>
  );
}

export { InvestmentOrganizer };

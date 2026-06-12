import React from 'react';
import { Icon } from './Icon.jsx';

// SpouseIncome — dedicated "Spouse Income" block (mirrors the reference TQ).
// Grouped Yes/No questions about the spouse's income, with conditional
// follow-ups (upload + foreign tax refund, US consultant/royalty questions).

function SpouseIncome({ value, onChange }) {
  const v = value || {};
  const set = (k, ans) => onChange({ ...v, [k]: ans });
  const [files, setFiles] = React.useState([]);
  const addFiles = (fl) => setFiles((c) => [...c, ...Array.from(fl).map((f) => ({ name: f.name, size: f.size }))]);
  const removeFile = (i) => setFiles((c) => c.filter((_, idx) => idx !== i));

  const Row = ({ k, q, hint, three }) => (
    <div className="sincome-row">
      <div className="sincome-row-body">
        <div className="sincome-row-q">{q}</div>
        {hint && <div className="sincome-row-hint">{hint}</div>}
      </div>
      <div className="sincome-row-pick">
        <button type="button" className={"about-pick" + (v[k] === "no" ? " selected-no" : "")} onClick={() => set(k, "no")}>No</button>
        <button type="button" className={"about-pick" + (v[k] === "yes" ? " selected-yes" : "")} onClick={() => set(k, "yes")}>Yes</button>
        {three && <button type="button" className={"about-pick about-pick-soft" + (v[k] === "unsure" ? " selected-soft" : "")} onClick={() => set(k, "unsure")}>I don't know</button>}
      </div>
    </div>
  );

  return (
    <div className="sincome-card">
      <div className="sincome-header">
        <span className="sincome-emoji" aria-hidden="true">👫</span>
        <div>
          <h3>Spouse income</h3>
          <p>A few quick questions about your spouse's income this year. Each “Yes” opens the right detail.</p>
        </div>
      </div>

      <div className="sincome-attention">
        <span className="sincome-attention-tag"><Icon name="alert-triangle" size={12} /> Attention</span>
        The questions in these sections apply only to your spouse.
      </div>

      {/* Foreign sourced income */}
      <div className="sincome-section">
        <div className="sincome-section-label">Foreign (i.e. non-US) sourced income</div>
        <div className="sincome-list">
          <Row k="nonUsEmployer" q="(Spouse) Did your spouse receive payments this year from a non-US employer?" hint="Wages, bonus, RSUs, allowances, stock options, etc." />
          {v.nonUsEmployer === "yes" && (
            <React.Fragment>
              <Row k="nonUsWages" q="(Spouse) Did your spouse earn wages from a non-US employer?" hint="Wages, bonus, RSUs, allowances, stock options, etc." />
              <div className="sincome-row">
                <div className="sincome-row-body">
                  <div className="sincome-row-q">(Spouse) Upload annual non-US wage statement from the foreign employer</div>
                  <div className="sincome-row-hint">Common examples: the T4 (Canada), Certificat de Salaire (Switzerland), or P60 / PAYE (UK) — documents summarizing foreign earnings.</div>
                  {files.length > 0 && (
                    <div className="file-list" style={{ marginTop: 10 }}>
                      {files.map((f, i) => (
                        <div key={i} className="file-row">
                          <span className="file-check"><Icon name="check" size={14} /></span>
                          <span className="file-name">{f.name}</span>
                          <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
                          <button type="button" className="file-remove" onClick={() => removeFile(i)}><Icon name="x" size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="sincome-row-pick">
                  <button type="button" className="about-pick" onClick={() => document.getElementById("sp-wage-file").click()}>
                    <Icon name="upload-cloud" size={14} /> Upload file
                  </button>
                  <input id="sp-wage-file" type="file" multiple style={{ display: "none" }} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => addFiles(e.target.files)} />
                </div>
              </div>
              <Row k="foreignRefund" three q="(Spouse) Did your spouse receive a foreign (non-US) tax refund?" hint="Refunds from HMRC (UK), CRA (Canada), Finanzamt (Germany), SFTA (Switzerland), ATO (Australia), etc." />
            </React.Fragment>
          )}
        </div>
      </div>

      {/* US sourced income */}
      <div className="sincome-section">
        <div className="sincome-section-label">US sourced income</div>
        <div className="sincome-list">
          <Row k="usEmployer" q="(Spouse) Did your spouse receive payments this year from a US employer?" hint="If yes, they likely received a W-2 — we'll ask you to upload it." />
          {v.usEmployer === "yes" && (
            <React.Fragment>
              <Row k="usWages" q="(Spouse) Did your spouse receive wages from a US employer?" hint="Reported on Form W-2." />
              <Row k="usConsultant" three q="(Spouse) Did your spouse work as a consultant or independent contractor for a US firm?" hint="Reported on Form 1099-NEC or 1099-MISC." />
              <Row k="usMisc" three q="(Spouse) Did your spouse receive royalties, unemployment, or other miscellaneous income from a US source?" />
            </React.Fragment>
          )}
        </div>
      </div>

      {/* Other spouse income */}
      <div className="sincome-section">
        <div className="sincome-section-label">Other spouse income</div>
        <div className="sincome-list">
          <Row k="pension" q="Did your spouse have a pension or receive pension income?" hint="Social Security, employer pension, or IRAs — regular or lump sum." />
          <Row k="dividends" q="Did your spouse receive dividends?" hint="From US or non-US investments." />
          <Row k="interest" q="Did your spouse receive interest income?" hint="From US or non-US accounts." />
          <Row k="selfEmp" q="Was your spouse self-employed?" hint="Freelance, consulting, contractor, or sole-proprietor income." />
          <Row k="investments" q="Did your spouse sell investments or property?" hint="Capital gains from stocks, funds, or other holdings sold." />
        </div>
      </div>
    </div>
  );
}

export { SpouseIncome };

import React from 'react';
import { YesNoRow } from './PersonalInfo.jsx';

// RetirementOrganizer — shows under "I receive retirement income → yes".
// Mirrors the reference TQ: pension contributions, pension distributions
// (US + foreign), rollovers, and government-pension flags. Yes/No driven.

function RetirementOrganizer({ value, onChange, filingYear }) {
  const v = value || {};
  const set = (k, ans) => onChange({ ...v, [k]: ans });

  return (
    <div className="ret-card">
      <div className="ret-header">
        <span className="ret-header-emoji" aria-hidden="true">🌅</span>
        <div>
          <h3>Retirement &amp; pensions</h3>
          <p>A few questions about contributions and distributions during {filingYear}.</p>
        </div>
      </div>

      <div className="ret-section-label">Pension contributions</div>
      <YesNoRow
        label="Did you make contributions to a US IRA, Roth IRA, or SEP account during the filing year?"
        hint="Generally reported on Form 5498."
        value={v.contrib || ""} onChange={(x) => set("contrib", x)} />

      <div className="ret-section-label">Pension distributions</div>
      <YesNoRow
        label="Did you receive US retirement distributions?"
        hint="Social Security, IRA, 401(k), government or military pension — Form 1099-R or SSA-1099."
        value={v.usDist || ""} onChange={(x) => set("usDist", x)} />
      <YesNoRow3
        label="Did you receive foreign (non-US) retirement distributions?"
        hint="Such as government / private pension or disability payments."
        value={v.foreignDist || ""} onChange={(x) => set("foreignDist", x)} />

      <div className="ret-section-label">Rollovers &amp; government service</div>
      <YesNoRow
        label="Did you roll over or transfer amounts between retirement accounts during the year (US or non-US)?"
        value={v.rollover || ""} onChange={(x) => set("rollover", x)} />
      <YesNoRow
        label="Are any of the pensions the result of work performed for a government or political subdivision?"
        hint="Refers to US and non-US governments — federal, state, local, municipal, city, etc."
        value={v.govPension || ""} onChange={(x) => set("govPension", x)} />
    </div>
  );
}

// Three-option Yes / No / I don't know
function YesNoRow3({ label, hint, value, onChange }) {
  return (
    <div className="pinfo-yesno">
      <div className="pinfo-yesno-body">
        <div className="pinfo-yesno-label">{label}</div>
        {hint && <div className="pinfo-yesno-hint">{hint}</div>}
      </div>
      <div className="pinfo-yesno-pick">
        <button type="button" className={"about-pick" + (value === "no" ? " selected-no" : "")} onClick={() => onChange("no")}>No</button>
        <button type="button" className={"about-pick" + (value === "yes" ? " selected-yes" : "")} onClick={() => onChange("yes")}>Yes</button>
        <button type="button" className={"about-pick about-pick-soft" + (value === "unsure" ? " selected-soft" : "")} onClick={() => onChange("unsure")}>I don't know</button>
      </div>
    </div>
  );
}

export { RetirementOrganizer };

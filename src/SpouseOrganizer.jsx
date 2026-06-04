import React from 'react';
import { Icon } from './Icon.jsx';

// SpouseOrganizer — conditional block under "I was married this year → That's me".
// Collects spouse identity + permanent address, then asks for a filing status.
// For married clients, "Single" is disabled. MFJ / MFS show plain-language
// trade-offs. A support note routes the unsure client to a tax expert.

function SpouseOrganizer({ value, setField }) {
  const s = value;

  const FILING_OPTIONS = [
    {
      id: "MFJ",
      name: "MFJ",
      full: "Married Filing Jointly",
      pros: ["Lower tax rates", "More tax credits & bigger deductions", "Usually a higher refund"],
      cons: ["Both spouses are jointly responsible for any tax issues"],
      recommended: true,
    },
    {
      id: "MFS",
      name: "MFS",
      full: "Married Filing Separately",
      pros: ["Separate tax-liability protection", "Useful if your spouse has IRS debt or legal issues"],
      cons: ["Higher taxes in most cases", "Many credits and deductions are limited or lost"],
    },
    {
      id: "HOH",
      name: "HOH",
      full: "Head of Household",
      pros: ["Available in specific cases — e.g. a non-resident spouse", "Better rates than filing separately"],
      cons: ["Strict eligibility — your CPA will confirm it applies"],
      childField: true,
    },
    {
      id: "QSS",
      name: "QSS",
      full: "Qualifying Surviving Spouse",
      pros: ["Same favorable rates as a joint return", "Available for up to two years after a spouse's passing"],
      cons: ["Requires a dependent child and that you have not remarried"],
      childField: true,
    },
    {
      id: "Single",
      name: "Single",
      full: "Single",
      disabled: true,
      disabledNote: "Not available — you told us you were married this year.",
    },
  ];

  return (
    <div className="spouse-card">
      <div className="spouse-header">
        <span className="spouse-header-emoji" aria-hidden="true">💑</span>
        <div>
          <h3>How would you like to file?</h3>
          <p>You told us you were married this year. Choose a filing status — your spouse's personal details are collected in the “Spouse” tab above.</p>
        </div>
      </div>

      {/* Filing status */}
      <div className="spouse-section">
        <div className="spouse-section-label">
          <span className="spouse-section-emoji" aria-hidden="true">🗂️</span>
          Filing status
        </div>
        <div className="filing-grid">
          {FILING_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              disabled={opt.disabled}
              className={
                "filing-card"
                + (s.filingStatus === opt.id ? " selected" : "")
                + (opt.disabled ? " disabled" : "")
                + (opt.recommended ? " recommended" : "")
              }
              onClick={() => !opt.disabled && setField("filingStatus", opt.id)}
            >
              <div className="filing-card-head">
                <span className="filing-card-abbr">{opt.name}</span>
                <span className="filing-card-full">{opt.full}</span>
                {opt.recommended && <span className="filing-card-tag">Most common</span>}
                <span className="filing-card-radio">
                  {s.filingStatus === opt.id && <Icon name="check" size={13} />}
                </span>
              </div>
              {opt.disabled ? (
                <div className="filing-card-disabled-note">
                  <Icon name="lock" size={12} />
                  {opt.disabledNote}
                </div>
              ) : (
                <div className="filing-card-points">
                  {opt.pros && opt.pros.map((p, i) => (
                    <div key={"p" + i} className="filing-point pro">
                      <Icon name="check" size={13} />
                      <span>{p}</span>
                    </div>
                  ))}
                  {opt.cons && opt.cons.map((c, i) => (
                    <div key={"c" + i} className="filing-point con">
                      <Icon name="x" size={13} />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Conditional child-name field for HOH / QSS */}
        {(s.filingStatus === "HOH" || s.filingStatus === "QSS") && (
          <div className="filing-childname">
            <span className="filing-childname-icon" aria-hidden="true">👶</span>
            <label className="rental-field full" style={{ flex: 1 }}>
              <span className="rental-field-label">
                Qualifying child's name
                <span style={{ color: "var(--brand-gold-deep)", marginLeft: 3 }}>*</span>
              </span>
              <span className="rental-field-hint" style={{ marginBottom: 6 }}>
                If the qualifying person is a child but <em>not</em> your dependent, enter their name here.
              </span>
              <input
                className="rental-input"
                type="text"
                placeholder="Child's full name"
                value={s.qualifyingChild || ""}
                onChange={(e) => setField("qualifyingChild", e.target.value)}
              />
            </label>
          </div>
        )}

        {/* Support note */}
        <div className="filing-support">
          <span className="filing-support-icon"><Icon name="life-buoy" size={18} /></span>
          <div className="filing-support-text">
            <strong>Still unsure which status fits?</strong>
            <span>It's one of the most consequential choices on your return. Talk to a tax expert and we'll determine the right one with you.</span>
          </div>
          <button
            type="button"
            className="filing-support-btn"
            onClick={() => window.dispatchEvent(new CustomEvent("open-consult"))}
          >
            Speak to a tax expert
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SpouseField({ label, required, hint, full, children }) {
  return (
    <label className={"rental-field" + (full ? " full" : "")}>
      <span className="rental-field-label">
        {label}{required && <span style={{ color: "var(--brand-gold-deep)", marginLeft: 3 }}>*</span>}
      </span>
      {children}
      {hint && <span className="rental-field-hint">{hint}</span>}
    </label>
  );
}

export { SpouseOrganizer };

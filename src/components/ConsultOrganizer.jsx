import React from 'react';
import { Icon } from './Icon.jsx';
import { Question } from './TaxOrganizer.jsx';

// ConsultOrganizer — lightweight intake for "CPA consulting (hourly)".
// The client picks the tax year the question relates to and writes a short
// brief; our team follows up. No multi-step organizer, no document upload.

function ConsultOrganizer({ presetService, onExit }) {
  const [taxYear, setTaxYear] = React.useState("");
  const [brief, setBrief] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [refNum, setRefNum] = React.useState("");

  const TAX_YEARS = ["2025", "2024", "2023", "2022", "2021", "Not year-specific"];
  const ready = !!taxYear && brief.trim().length > 0;

  const submit = () => {
    if (!ready) return;
    setRefNum("MUC-C-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000));
    setSubmitted(true);
    setTimeout(() => {
      const el = document.querySelector(".organizer");
      if (el) el.scrollTop = 0;
    }, 30);
  };

  return (
    <div className="organizer">
      <div className="container-narrow" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-9)" }}>
        <header className="organizer-head">
          <div>
            <div className="section-eyebrow">CPA consulting</div>
            <h1 className="organizer-title">Let's set up your consultation.</h1>
            <div className="organizer-service">
              <Icon name="message-square" size={14} />
              <span>You're requesting:</span>
              <strong>{presetService ? presetService.title : "CPA consulting (hourly)"}</strong>
            </div>
          </div>
          {!submitted && (
            <a
              href="#other-services"
              className="organizer-other"
              onClick={(e) => { e.preventDefault(); if (onExit) onExit(); }}
            >
              Need a different service?
              <Icon name="arrow-up-right" size={14} />
            </a>
          )}
        </header>

        {!submitted ? (
          <div className="organizer-card">
            <div className="organizer-body">
              <Question
                label="Which tax year is this about?"
                hint="Pick the year your question relates to, or choose “Not year-specific.”"
              >
                <select
                  className="organizer-select"
                  value={taxYear}
                  onChange={(e) => setTaxYear(e.target.value)}
                >
                  <option value="">— Select year —</option>
                  {TAX_YEARS.map((y) => <option key={y}>{y}</option>)}
                </select>
              </Question>

              <Question
                label="Tell us briefly how we can help."
                hint="A short summary is enough — our team will review it and get back to you within 1–2 business days."
              >
                <textarea
                  className="field-textarea"
                  rows={6}
                  placeholder="e.g. I'm relocating to Singapore mid-year and want to understand the tax implications before I sign my contract..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                />
              </Question>
            </div>

            <div className="organizer-foot">
              <button type="button" className="btn-back" onClick={() => { if (onExit) onExit(); }}>
                <Icon name="arrow-left" size={14} />
                Back to services
              </button>
              <span className="organizer-save"><Icon name="lock" size={12} /> Saved as you type</span>
              <button
                type="button"
                className={"btn btn-primary organizer-next" + (ready ? "" : " disabled")}
                disabled={!ready}
                onClick={submit}
              >
                Send to our team
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="organizer-card">
            <div className="intake-body" style={{ padding: 0 }}>
              <div className="success-card">
                <div className="success-icon">
                  <Icon name="check" size={36} />
                </div>
                <h2>Your request has been sent.</h2>
                <p>
                  Thank you. A licensed CPA from our team will review your note and reach out
                  within one to two business days to schedule your consultation.
                </p>
                <div className="ref-box">
                  <div className="ref-label">Your reference number</div>
                  <div className="ref-num numeric">{refNum}</div>
                </div>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
                  <button className="btn btn-secondary" onClick={() => { if (onExit) onExit(); }}>
                    Back to services
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { ConsultOrganizer };

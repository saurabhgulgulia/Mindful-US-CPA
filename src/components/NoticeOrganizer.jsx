import React from 'react';
import { About } from './About.jsx';
import { Icon } from './Icon.jsx';

// NoticeOrganizer — dedicated flow for "IRS or state notice response".
// The client first tells us which tax year the notice relates to; once a year
// is chosen, a short set of fields appears: when the notice was received, its
// notice/ID number, whether it's from the IRS or a state department, and an
// upload for the full notice (all pages). Reuses the intake-card / field styles.

function NoticeField({ label, required, hint, children }) {
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

const NOTICE_YEARS = ["2025", "2024", "2023", "2022", "Older / not sure"];

function NoticeOrganizer({ presetService, onExit }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [refNum, setRefNum] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [form, setForm] = React.useState({
    year: "",
    dateReceived: "",
    noticeId: "",
    agency: "",      // "irs" | "state"
    state: "",
    consent: false,
  });
  const update = (patch) => setForm((s) => ({ ...s, ...patch }));

  const addFiles = (list) => {
    const next = Array.from(list || []);
    if (next.length) setFiles((f) => [...f, ...next]);
  };
  const removeFile = (i) => setFiles((f) => f.filter((_, idx) => idx !== i));

  const detailsReady =
    form.dateReceived &&
    form.noticeId.trim() &&
    form.agency &&
    (form.agency !== "state" || form.state.trim()) &&
    files.length > 0;
  const ready = form.year && detailsReady && form.consent;

  const submit = () => {
    if (!ready) {
      if (form.year && detailsReady && !form.consent)
        alert("Please check the authorization box before submitting.");
      return;
    }
    setRefNum("MUC-NTC-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000));
    setSubmitted(true);
    setTimeout(() => {
      const el = document.getElementById("ntc-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="intake-portal" id="ntc-top">
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: "var(--space-7)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Notice response</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-3)", maxWidth: "24ch" }}>
            Got a letter from the IRS or a state? Let's handle it.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto", maxWidth: "58ch" }}>
            Tell us which year the notice is about and share a copy. Your assigned CPA reviews it,
            explains what it means, and drafts the response — you don't reply to the agency alone.
          </p>
        </div>

        <div className="intake-card">
          <div className="intake-service-banner">
            <span className="intake-service-banner-icon"><Icon name="alert-circle" size={16} /></span>
            <span className="intake-service-banner-label">Responding to:</span>
            <strong>IRS or state notice</strong>
            <button type="button" className="intake-service-change" onClick={() => { if (onExit) onExit(); }}>
              Change service
            </button>
          </div>

          {!submitted && (
            <div className="ext-note">
              <span className="ext-note-icon"><Icon name="clock" size={18} /></span>
              <span><strong>Most notices have a deadline.</strong> Send this over as soon as you can — even if you're not sure what the letter means. We'll triage it quickly.</span>
            </div>
          )}

          {!submitted && (
            <React.Fragment>
              {/* Step 1 — which year */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="calendar" size={16} /></div>
                <div>
                  <h3>Which tax year is the notice about?</h3>
                  <p>It's usually printed near the top of the letter — pick the closest match.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="ext-radio-row" style={{ flexWrap: "wrap" }}>
                    {NOTICE_YEARS.map((y) => (
                      <button
                        type="button"
                        key={y}
                        className={"ext-radio" + (form.year === y ? " selected" : "")}
                        onClick={() => update({ year: y })}
                      >
                        <span className="ext-radio-dot" />
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 — details, revealed once a year is chosen */}
              {form.year && (
                <React.Fragment>
                  <div className="intake-card-header">
                    <div className="intake-step-num"><Icon name="file-text" size={16} /></div>
                    <div>
                      <h3>About the notice</h3>
                      <p>A few quick details so your CPA can pull the right account and respond on time.</p>
                    </div>
                  </div>

                  <div className="intake-body">
                    <div className="form-row">
                      <NoticeField label="Date the notice was received" required hint="The day it arrived, or the date printed on the letter.">
                        <input
                          className="field-input"
                          type="date"
                          value={form.dateReceived}
                          onChange={(e) => update({ dateReceived: e.target.value })}
                        />
                      </NoticeField>
                      <NoticeField label="Notice / ID number" required hint="e.g. CP2000, CP14, LT11 — usually top or bottom-right of page 1.">
                        <input
                          className="field-input"
                          type="text"
                          placeholder="CP2000"
                          value={form.noticeId}
                          onChange={(e) => update({ noticeId: e.target.value })}
                        />
                      </NoticeField>
                    </div>

                    <div className="form-row full">
                      <NoticeField label="Who sent it?" required hint="Federal (IRS) or a state tax department — check the letterhead.">
                        <div className="ext-radio-row">
                          {[
                            { v: "irs", label: "IRS (federal)" },
                            { v: "state", label: "State tax department" },
                          ].map((o) => (
                            <button
                              type="button"
                              key={o.v}
                              className={"ext-radio" + (form.agency === o.v ? " selected" : "")}
                              onClick={() => update({ agency: o.v })}
                            >
                              <span className="ext-radio-dot" />
                              {o.label}
                            </button>
                          ))}
                        </div>
                      </NoticeField>
                    </div>

                    {form.agency === "state" && (
                      <div className="form-row full">
                        <NoticeField label="Which state?" required>
                          <input
                            className="field-input"
                            type="text"
                            placeholder="e.g. California"
                            value={form.state}
                            onChange={(e) => update({ state: e.target.value })}
                          />
                        </NoticeField>
                      </div>
                    )}

                    {/* Upload — all pages */}
                    <div className="intake-field-label" style={{ marginTop: "var(--space-2)" }}>
                      Upload the notice — all pages<span className="intake-field-required">*</span>
                    </div>
                    <p className="intake-field-hint" style={{ marginTop: 2, marginBottom: 10 }}>
                      Include every page, front and back. A clear phone photo of each page is fine.
                    </p>
                    <div className="dep-upload" onClick={() => document.getElementById("ntc-file").click()}>
                      <input
                        id="ntc-file"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.heic,.doc,.docx"
                        style={{ display: "none" }}
                        onChange={(e) => addFiles(e.target.files)}
                      />
                      <span className="dep-upload-icon"><Icon name="upload-cloud" size={20} /></span>
                      <span className="dep-upload-text">
                        <strong>Attach the notice</strong>
                        <span>Every page · PDF, JPG, PNG, HEIC, DOC — encrypted on upload</span>
                      </span>
                    </div>
                    {files.length > 0 && (
                      <div className="file-list" style={{ marginTop: 10 }}>
                        {files.map((f, i) => (
                          <div key={i} className="file-row">
                            <span className="file-check"><Icon name="check" size={14} /></span>
                            <span className="file-name">{f.name}</span>
                            <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
                            <button type="button" className="file-remove" onClick={() => removeFile(i)} aria-label="Remove"><Icon name="x" size={14} /></button>
                          </div>
                        ))}
                      </div>
                    )}

                    <label className="consent-box">
                      <input type="checkbox" checked={form.consent} onChange={(e) => update({ consent: e.target.checked })} />
                      <span>
                        I authorize Mindful US CPA to review this notice and represent me in responding to the
                        {form.agency === "state" ? " state tax department" : " IRS"} for tax year {form.year}.
                        I understand a Power of Attorney (Form 2848) may be required and will be prepared if so.
                      </span>
                    </label>
                  </div>
                </React.Fragment>
              )}

              <div className="intake-footer">
                <button type="button" className="btn-back" onClick={() => { if (onExit) onExit(); }}>
                  <Icon name="arrow-left" size={14} />
                  Back to services
                </button>
                <span className="save-note"><Icon name="lock" size={12} /> Saved securely</span>
                <button type="button" className={"btn btn-primary" + (ready ? "" : " disabled")} disabled={!ready} onClick={submit}>
                  <Icon name="check" size={14} />
                  Submit notice for review
                </button>
              </div>
            </React.Fragment>
          )}

          {submitted && (
            <div className="intake-body" style={{ padding: 0 }}>
              <div className="success-card">
                <div className="success-icon"><Icon name="check" size={36} /></div>
                <h2>Thanks for providing the information.</h2>
                <p>
                  Our team will review the {form.noticeId ? <strong>{form.noticeId}</strong> : "notice"} for
                  tax year {form.year}, proceed with the next steps, and send you an update shortly.
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
    </section>
  );
}

export { NoticeOrganizer };

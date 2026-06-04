import React from 'react';
import { Icon } from './Icon.jsx';

// IntakePortal — multi-step client intake form, modeled on the ExpatTax Pro reference
// but rebuilt in the Mindful US CPA brand language (navy/gold/cream, Cormorant
// Garamond display, Source Sans 3 body, no emoji, Lucide icons).

const SERVICE_CATEGORIES = [
  {
    group: "Individuals & US Expats",
    items: [
      { id: "expat-current",    title: "US Expat Tax return", icon: "globe-2" },
      { id: "streamlined",      title: "Past-due taxes / Streamlined Filing", icon: "shield-check" },
      { id: "dual-status",      title: "Dual-status filing (1040 & 1040-NR)", icon: "split" },
      { id: "personal-extension", title: "Extension", icon: "calendar-clock" },
      { id: "assignment",       title: "Working abroad on international assignment", icon: "plane" },
      { id: "personal-complex", title: "Personal return (equity, K-1s, multi-state)", icon: "file-text" },
    ],
  },
  {
    group: "Businesses",
    items: [
      { id: "corp-return",     title: "Corporate / entity tax return (1120, 1120-S, 1065)", icon: "building-2" },
      { id: "payroll-1099",    title: "Payroll & 1099 filings (941, 940, W-2)", icon: "receipt" },
      { id: "bookkeeping",     title: "Bookkeeping (QuickBooks / Xero)", icon: "book-open" },
      { id: "state-compliance",title: "US state tax compliance", icon: "landmark" },
      { id: "incorporation",   title: "Business incorporation (LLC / S-corp / C-corp)", icon: "briefcase" },
      { id: "audit-attest",    title: "Auditing & attestation / net-worth certificate", icon: "clipboard-check" },
    ],
  },
  {
    group: "Planning & Advisory",
    items: [
      { id: "tax-planning",    title: "Strategic tax planning", icon: "compass" },
      { id: "cpa-consulting",  title: "CPA consulting (hourly)", icon: "message-square" },
      { id: "irs-notice",      title: "IRS or state notice response", icon: "alert-circle" },
      { id: "other",           title: "Other — tell us what you need", icon: "help-circle" },
    ],
  },
];

function IntakePortal({ hideHeading }) {
  const [step, setStep] = React.useState(0);
  const [selectedService, setSelectedService] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [refNum, setRefNum] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [dragOver, setDragOver] = React.useState(false);

  // If dashboard pre-selected a service, jump straight to step 1
  React.useEffect(() => {
    if (window.__intakePresetService) {
      setSelectedService(window.__intakePresetService);
      setStep(1);
      window.__intakePresetService = null;
    }
  }, []);

  const [form, setForm] = React.useState({
    firstName: "", lastName: "", email: "", phone: "", dob: "", ssn: "",
    citizenship: "", taxYear: "", filingStatus: "", dependents: "0",
    country: "", address: "",
    incomeSources: [], income: "", yearsAbroad: "", fbar: "", additional: [],
    referral: "", notes: "", consent: false,
  });

  const chooseService = (svc) => {
    setSelectedService(svc);
    setStep(1);
    setTimeout(() => {
      const el = document.getElementById("intake");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const update = (patch) => setForm((s) => ({ ...s, ...patch }));
  const toggleIn = (key, value) => {
    const arr = form[key];
    const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
    update({ [key]: next });
  };

  const onFiles = (newFiles) => {
    setFiles((curr) => [...curr, ...Array.from(newFiles).map((f) => ({ name: f.name, size: f.size }))]);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) onFiles(e.dataTransfer.files);
  };
  const removeFile = (i) => setFiles((curr) => curr.filter((_, idx) => idx !== i));

  const goTo = (n) => {
    setStep(n);
    setTimeout(() => {
      const el = document.getElementById("intake");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const submit = () => {
    if (!form.consent) {
      alert("Please review and check the consent box before submitting.");
      return;
    }
    const n = "MUC-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000);
    setRefNum(n);
    setSubmitted(true);
    setTimeout(() => {
      const el = document.getElementById("intake");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const stepLabels = ["Personal", "Tax situation", "Documents", "Review & submit"];
  const progressPct = submitted ? 100 : [0, 25, 50, 75, 100][step];

  const FILING_STATUSES = [
    { v: "Single", icon: "user" },
    { v: "Married Filing Jointly", icon: "users" },
    { v: "Married Filing Separately", icon: "user-x" },
    { v: "Head of Household", icon: "home" },
  ];
  const INCOME_SOURCES = [
    "Foreign employment wages",
    "Self-employment / freelance",
    "Rental income (US property)",
    "Rental income (foreign property)",
    "Investment income / dividends",
    "Retirement / pension (US)",
    "Social Security benefits",
    "Business ownership / S-corp",
  ];
  const ADDITIONAL = [
    "Foreign pension / retirement plan",
    "Previously unfiled US returns",
    "Sold foreign real estate",
    "Cryptocurrency holdings / sales",
    "Foreign corporation ownership",
    "Claimed Child Tax Credit",
  ];
  const COUNTRIES = [
    "United Kingdom", "United Arab Emirates", "Singapore", "Germany", "France",
    "Netherlands", "Switzerland", "Australia", "Canada", "Japan", "Hong Kong",
    "Israel", "India", "Mexico", "Other"
  ];

  return (
    <section className="intake-portal" id="intake">
      <div className="container-narrow">
        {!hideHeading && (
          <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>Client intake portal</div>
            <h2 className="section-head" style={{ margin: "0 auto var(--space-3)", maxWidth: "24ch" }}>
              Start your return — securely, in a few minutes.
            </h2>
            <p className="section-sub" style={{ margin: "0 auto", maxWidth: "60ch" }}>
              Tell us about your situation and upload your documents. Your information is encrypted
              end-to-end and shared only with the licensed CPA assigned to your file.
            </p>
          </div>
        )}

        {/* STEP 0 — Service selector */}
        {step === 0 && !submitted && (
          <div className="service-selector">
            <div className="service-selector-head">
              <h3>How can we help with your tax situation?</h3>
              <p>Select what brings you here — we'll tailor the intake to your situation.</p>
            </div>
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.group} className="service-category">
                <div className="service-category-label">{cat.group}</div>
                <div className="service-options">
                  {cat.items.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className="service-option"
                      onClick={() => chooseService(opt)}
                    >
                      <span className="service-option-icon"><Icon name={opt.icon} size={20} /></span>
                      <span className="service-option-title">{opt.title}</span>
                      <span className="service-option-arrow"><Icon name="arrow-right" size={16} /></span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <p className="service-selector-foot">
              Not sure? <button type="button" className="link-button" onClick={() => chooseService({ id: "other", title: "Other — tell us what you need", icon: "help-circle" })}>Start with a general intake</button> and we'll route you to the right CPA.
            </p>
          </div>
        )}

        {/* Step indicator */}
        {!submitted && step > 0 && (
          <div className="intake-steps">
            {stepLabels.map((label, i) => {
              const n = i + 1;
              const cls = n === step ? "active" : n < step ? "done" : "";
              return (
                <div key={label} className={"intake-step " + cls}>
                  <div className="intake-step-dot">
                    {n < step ? <Icon name="check" size={14} /> : n}
                  </div>
                  <span className="intake-step-label">{label}</span>
                  {i < stepLabels.length - 1 && <span className="intake-step-line" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Form card */}
        {(step > 0 || submitted) && (
        <div className="intake-card">
          <div className="intake-progress">
            <div className="intake-progress-fill" style={{ width: progressPct + "%" }} />
          </div>

          {selectedService && !submitted && (
            <div className="intake-service-banner">
              <span className="intake-service-banner-icon"><Icon name={selectedService.icon} size={16} /></span>
              <span className="intake-service-banner-label">Filing for:</span>
              <strong>{selectedService.title}</strong>
              <button type="button" className="intake-service-change" onClick={() => { setStep(0); setSelectedService(null); }}>
                Change
              </button>
            </div>
          )}

          {!submitted && step === 1 && selectedService && selectedService.id === "personal-extension" && (
            <ExtensionInfo />
          )}

          {!submitted && (
            <React.Fragment>
              <div className="intake-card-header">
                <div className="intake-step-num">{step}</div>
                <div>
                  <h3>{["Personal information", "Your tax situation", "Upload your documents", "Review & submit"][step - 1]}</h3>
                  <p>{[
                    "Tell us about yourself and how to reach you.",
                    "Help us understand your income and foreign financial situation.",
                    "Securely upload your tax documents. PDF, JPG, PNG, DOC accepted.",
                    "Please verify your information before submitting.",
                  ][step - 1]}</p>
                </div>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="intake-body">
                  <div className="form-row">
                    <Field label="First name" required>
                      <input className="field-input" type="text" placeholder="Avery" value={form.firstName} onChange={(e) => update({ firstName: e.target.value })} />
                    </Field>
                    <Field label="Last name" required>
                      <input className="field-input" type="text" placeholder="Whitfield" value={form.lastName} onChange={(e) => update({ lastName: e.target.value })} />
                    </Field>
                  </div>
                  <div className="form-row">
                    <Field label="Email address" required>
                      <input className="field-input" type="email" placeholder="avery@example.com" value={form.email} onChange={(e) => update({ email: e.target.value })} />
                    </Field>
                    <Field label="Phone number">
                      <input className="field-input" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => update({ phone: e.target.value })} />
                    </Field>
                  </div>
                  <div className="form-row">
                    <Field label="Date of birth" required>
                      <input className="field-input" type="date" value={form.dob} onChange={(e) => update({ dob: e.target.value })} />
                    </Field>
                    <Field label="Social Security Number (SSN)" required hint="Encrypted in transit and at rest. Never stored in plain text.">
                      <input className="field-input" type="text" placeholder="XXX-XX-XXXX" maxLength={11} value={form.ssn} onChange={(e) => update({ ssn: e.target.value })} />
                    </Field>
                  </div>
                  <div className="form-row">
                    <Field label="US citizenship status" required>
                      <select className="field-select" value={form.citizenship} onChange={(e) => update({ citizenship: e.target.value })}>
                        <option value="">— Select —</option>
                        <option>US Citizen</option>
                        <option>Green Card Holder (LPR)</option>
                        <option>Dual Citizen</option>
                      </select>
                    </Field>
                    <Field label="Tax year" required>
                      <select className="field-select" value={form.taxYear} onChange={(e) => update({ taxYear: e.target.value })}>
                        <option value="">— Select year —</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022 (Streamlined)</option>
                        <option>2021 (Streamlined)</option>
                      </select>
                    </Field>
                  </div>

                  <div className="form-row full">
                    <Field label="Filing status" required>
                      <div className="radio-card-grid">
                        {FILING_STATUSES.map((opt) => (
                          <button
                            type="button"
                            key={opt.v}
                            className={"radio-card" + (form.filingStatus === opt.v ? " selected" : "")}
                            onClick={() => update({ filingStatus: opt.v })}
                          >
                            <Icon name={opt.icon} size={22} />
                            <span>{opt.v}</span>
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  <div className="form-row">
                    <Field label="Number of dependents">
                      <select className="field-select" value={form.dependents} onChange={(e) => update({ dependents: e.target.value })}>
                        <option>0</option><option>1</option><option>2</option><option>3</option><option>4+</option>
                      </select>
                    </Field>
                    <Field label="Current country of residence" required>
                      <select className="field-select" value={form.country} onChange={(e) => update({ country: e.target.value })}>
                        <option value="">— Select country —</option>
                        {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                  </div>

                  <div className="form-row full">
                    <Field label="Current foreign address">
                      <input className="field-input" type="text" placeholder="Street, city, postal code, country" value={form.address} onChange={(e) => update({ address: e.target.value })} />
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="intake-body">
                  <div className="info-strip">
                    <span className="info-icon"><Icon name="info" size={16} /></span>
                    <span>This information helps us identify which forms apply to your situation — Form 1040, FBAR, 8938, and any exclusions or credits you may be entitled to.</span>
                  </div>

                  <div className="form-row full">
                    <Field label="Primary income sources" required hint="Select all that apply.">
                      <div className="check-grid">
                        {INCOME_SOURCES.map((src) => (
                          <button
                            type="button"
                            key={src}
                            className={"check-card" + (form.incomeSources.includes(src) ? " selected" : "")}
                            onClick={() => toggleIn("incomeSources", src)}
                          >
                            <span className="check-card-box">
                              {form.incomeSources.includes(src) && <Icon name="check" size={14} />}
                            </span>
                            <span>{src}</span>
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  <div className="form-row">
                    <Field label="Estimated total income (USD)" required>
                      <select className="field-select" value={form.income} onChange={(e) => update({ income: e.target.value })}>
                        <option value="">— Select range —</option>
                        <option>Under $30,000</option>
                        <option>$30,000 – $60,000</option>
                        <option>$60,000 – $100,000</option>
                        <option>$100,000 – $150,000</option>
                        <option>$150,000 – $250,000</option>
                        <option>$250,000+</option>
                      </select>
                    </Field>
                    <Field label="Years living outside the US" required>
                      <select className="field-select" value={form.yearsAbroad} onChange={(e) => update({ yearsAbroad: e.target.value })}>
                        <option value="">— Select —</option>
                        <option>Less than 1 year</option>
                        <option>1–2 years</option>
                        <option>3–5 years</option>
                        <option>6–10 years</option>
                        <option>10+ years</option>
                      </select>
                    </Field>
                  </div>

                  <div className="form-row full">
                    <Field label="Foreign bank accounts">
                      <div className="radio-card-grid three">
                        {[
                          { v: "Yes — combined balance over $10,000", icon: "check-circle-2" },
                          { v: "No — under $10,000", icon: "x-circle" },
                          { v: "Not sure", icon: "help-circle" },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.v}
                            className={"radio-card" + (form.fbar === opt.v ? " selected" : "")}
                            onClick={() => update({ fbar: opt.v })}
                          >
                            <Icon name={opt.icon} size={22} />
                            <span>{opt.v}</span>
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  <div className="form-row full">
                    <Field label="Additional situations" hint="Select all that apply.">
                      <div className="check-grid">
                        {ADDITIONAL.map((src) => (
                          <button
                            type="button"
                            key={src}
                            className={"check-card" + (form.additional.includes(src) ? " selected" : "")}
                            onClick={() => toggleIn("additional", src)}
                          >
                            <span className="check-card-box">
                              {form.additional.includes(src) && <Icon name="check" size={14} />}
                            </span>
                            <span>{src}</span>
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  <div className="form-row full">
                    <Field label="Additional notes or questions">
                      <textarea className="field-textarea" placeholder="Tell us anything specific about your situation, concerns, or questions for your CPA..." value={form.notes} onChange={(e) => update({ notes: e.target.value })} />
                    </Field>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="intake-body">
                  <div className="info-strip">
                    <span className="info-icon"><Icon name="lock" size={16} /></span>
                    <span>All files are encrypted with AES-256 in transit and at rest. Only your assigned CPA has access. Maximum file size: 25 MB per file.</span>
                  </div>

                  <div
                    className={"upload-zone" + (dragOver ? " dragover" : "")}
                    onClick={() => document.getElementById("intake-file-input").click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                  >
                    <input
                      id="intake-file-input"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={(e) => onFiles(e.target.files)}
                    />
                    <div className="upload-zone-icon"><Icon name="upload-cloud" size={32} /></div>
                    <h4>Drag &amp; drop files here</h4>
                    <p>or <span className="upload-browse">browse your device</span></p>
                    <p className="upload-zone-meta">PDF, JPG, PNG, DOC · Max 25 MB each</p>
                  </div>

                  {files.length > 0 && (
                    <div className="file-list">
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

                  <div className="doc-checklist">
                    <h3>Document checklist</h3>
                    <DocCategory icon="briefcase" title="Income documents" badge="Required" badgeKind="required" items={[
                      "W-2 from US employer",
                      "Foreign employer pay slips / P60",
                      "1099-INT / 1099-DIV",
                      "Schedule K-1",
                    ]} />
                    <DocCategory icon="landmark" title="Foreign financial accounts" badge="If applicable" badgeKind="required" items={[
                      "Foreign bank statements (year-end)",
                      "Peak balance confirmation letter",
                      "Foreign pension statements",
                      "Foreign brokerage / investment statements",
                    ]} />
                    <DocCategory icon="home" title="Property &amp; other" badge="If applicable" badgeKind="optional" items={[
                      "1098 Mortgage Interest statement",
                      "Foreign property sale documents",
                      "Foreign tax paid receipts",
                      "Prior-year US tax return (1040)",
                    ]} />
                    <DocCategory icon="id-card" title="Identity &amp; residency" badge="Required" badgeKind="required" items={[
                      "Copy of US passport",
                      "Foreign residency permit / visa",
                    ]} />
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="intake-body">
                  <div className="info-strip">
                    <span className="info-icon"><Icon name="check-circle-2" size={16} /></span>
                    <span>Once submitted, your assigned licensed CPA will review your intake within 1–2 business days and reach out to confirm next steps and fees.</span>
                  </div>

                  <ReviewSection title="Personal information" icon="user" onEdit={() => goTo(1)}>
                    <ReviewRow k="Full name" v={`${form.firstName} ${form.lastName}`.trim() || "—"} />
                    <ReviewRow k="Email" v={form.email || "—"} />
                    <ReviewRow k="Phone" v={form.phone || "—"} />
                    <ReviewRow k="Citizenship" v={form.citizenship || "—"} />
                    <ReviewRow k="Tax year" v={form.taxYear || "—"} />
                    <ReviewRow k="Filing status" v={form.filingStatus || "—"} />
                    <ReviewRow k="Country of residence" v={form.country || "—"} />
                    <ReviewRow k="Dependents" v={form.dependents} />
                  </ReviewSection>

                  <ReviewSection title="Tax situation" icon="briefcase" onEdit={() => goTo(2)}>
                    <ReviewRow k="Income sources" v={form.incomeSources.length ? form.incomeSources.join(", ") : "—"} />
                    <ReviewRow k="Estimated income" v={form.income || "—"} />
                    <ReviewRow k="Years abroad" v={form.yearsAbroad || "—"} />
                    <ReviewRow k="Foreign bank accounts" v={form.fbar || "—"} />
                    {form.additional.length > 0 && <ReviewRow k="Additional situations" v={form.additional.join(", ")} />}
                  </ReviewSection>

                  <ReviewSection title="Uploaded documents" icon="paperclip" onEdit={() => goTo(3)}>
                    {files.length === 0 ? (
                      <ReviewRow k="Files" v="No files uploaded yet" />
                    ) : (
                      files.map((f, i) => <ReviewRow key={i} k={`File ${i + 1}`} v={f.name} />)
                    )}
                  </ReviewSection>

                  <label className="consent-box">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => update({ consent: e.target.checked })}
                    />
                    <span>
                      I confirm that all information provided is accurate and complete to the best of my knowledge.
                      I authorize Mindful US CPA to use this information to prepare my tax return and related filings.
                      I have read and agree to the <a href="#privacy">Privacy Policy</a> and <a href="#terms">Terms of Service</a>.
                    </span>
                  </label>
                </div>
              )}

              {/* Footer */}
              <div className="intake-footer">
                {step > 1 ? (
                  <button type="button" className="btn-back" onClick={() => goTo(step - 1)}>
                    <Icon name="arrow-left" size={14} />
                    Back
                  </button>
                ) : <span />}
                <span className="save-note">
                  <Icon name="lock" size={12} />
                  Auto-saved securely
                </span>
                {step < 4 ? (
                  <button type="button" className="btn btn-primary" onClick={() => goTo(step + 1)}>
                    Continue
                    <Icon name="arrow-right" size={14} />
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary intake-submit" onClick={submit}>
                    <Icon name="check" size={14} />
                    Submit my return
                  </button>
                )}
              </div>
            </React.Fragment>
          )}

          {submitted && (
            <div className="intake-body" style={{ padding: 0 }}>
              <div className="success-card">
                <div className="success-icon">
                  <Icon name="check" size={36} />
                </div>
                <h2>Intake successfully submitted.</h2>
                <p>
                  Thank you. Your information has been securely received. Your assigned CPA will
                  review your file and reach out within one to two business days.
                </p>
                <div className="ref-box">
                  <div className="ref-label">Your reference number</div>
                  <div className="ref-num numeric">{refNum}</div>
                </div>
                <p style={{ fontSize: 13 }}>
                  Please save this reference number for your records. A confirmation email has been
                  sent to <strong>{form.email || "your address"}</strong>.
                </p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
                  <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setStep(1); setFiles([]); }}>
                    Start another return
                  </button>
                  <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent("open-consult"))}>
                    Talk to a CPA
                    <Icon name="arrow-right" size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        )}
      </div>
    </section>
  );
}

function Field({ label, required, hint, children }) {
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

function DocCategory({ icon, title, badge, badgeKind, items }) {
  return (
    <div className="doc-category">
      <h4>
        <Icon name={icon} size={16} />
        <span dangerouslySetInnerHTML={{ __html: title }} />
        <span className={"doc-badge " + (badgeKind === "required" ? "badge-required" : "badge-optional")}>{badge}</span>
      </h4>
      <div className="check-grid">
        {items.map((it) => (
          <label key={it} className="check-card simple">
            <input type="checkbox" className="check-native" />
            <span>{it}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ReviewSection({ title, icon, onEdit, children }) {
  return (
    <div className="review-section">
      <h4>
        <Icon name={icon} size={14} />
        {title}
        <button type="button" className="review-edit-btn" onClick={onEdit}>Edit</button>
      </h4>
      <table className="review-table"><tbody>{children}</tbody></table>
    </div>
  );
}

function ReviewRow({ k, v }) {
  return (
    <tr>
      <td>{k}</td>
      <td>{v}</td>
    </tr>
  );
}

function ExtensionInfo() {
  const reasons = [
    { icon: "clipboard-list", text: "Your documents aren't ready yet" },
    { icon: "help-circle", text: "A new tax situation has you unsure" },
    { icon: "alarm-clock", text: "You simply need a little more time" },
  ];
  return (
    <div className="ext-info">
      <div className="ext-info-block">
        <div className="ext-info-head">
          <h3>Think you need an extension?</h3>
          <p>File for one if:</p>
        </div>
        <div className="ext-reasons">
          {reasons.map((r) => (
            <div key={r.text} className="ext-reason">
              <span className="ext-reason-icon"><Icon name={r.icon} size={30} /></span>
              <span className="ext-reason-text">{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ext-info-block">
        <div className="ext-info-head">
          <h3>Extension dates &amp; deadlines</h3>
          <p>Your client portal is where you go for anything you need.</p>
        </div>
        <div className="ext-cards">
          <div className="ext-card ext-card-gold">
            <h4>Tax day isn't etched in stone</h4>
            <p>
              Tax day falls in mid-April, but the IRS grants an automatic six-month
              extension to file. We submit your extension today, then complete your
              federal and state returns once you're ready.
            </p>
          </div>
          <div className="ext-card ext-card-navy">
            <h4>Extra time to file, not to pay</h4>
            <p>
              An extension moves your filing deadline — not your payment deadline.
              Any tax owed is still due in April, so we'll help you estimate and pay
              to avoid interest and penalties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ExtensionInfo, IntakePortal };

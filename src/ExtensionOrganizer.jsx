import React from 'react';
import { Icon } from './Icon.jsx';
import { ExtensionInfo } from './IntakePortal.jsx';

// ExtensionOrganizer — the dedicated flow for a tax extension. The client first
// chooses the kind of extension, then fills a short, form-specific set of fields:
//   • Personal extension — Form 4868 (individuals)
//   • Entity extension   — Form 7004 (businesses: 1120 / 1120-S / 1065)
// Intentionally minimal: an extension does NOT need the full return questionnaire.
// Reuses the intake-card / field styles.

function ExtField({ label, required, hint, children }) {
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

const EXT_ENTITY_TYPES = [
  { v: "C-Corporation (Form 1120)", form: "1120", title: "Corporation", icon: "building-2", sub: "Standard C-Corporation filing Form 1120." },
  { v: "S-Corporation (Form 1120-S)", form: "1120-S", title: "S-Corporation", icon: "store", sub: "Small-business corporation filing Form 1120-S." },
  { v: "Partnership / Multi-member LLC (Form 1065)", form: "1065", title: "Partnership", icon: "users", sub: "Partnership or multi-member LLC filing Form 1065." },
];

const EXT_KINDS = [
  {
    id: "personal",
    form: "4868",
    icon: "user",
    title: "Personal extension",
    sub: "For individuals filing Form 1040. Files IRS Form 4868.",
  },
  {
    id: "entity",
    form: "7004",
    icon: "building-2",
    title: "Entity extension",
    sub: "For corporations & partnerships (1120, 1120-S, 1065). Files IRS Form 7004.",
  },
];

function ExtensionOrganizer({ presetService, onExit }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [refNum, setRefNum] = React.useState("");
  const [bankModal, setBankModal] = React.useState(false);
  const [entityModal, setEntityModal] = React.useState(false);
  const [bankDraft, setBankDraft] = React.useState({ routingNo: "", accountNo: "", accountType: "" });
  const [form, setForm] = React.useState({
    kind: "",
    // personal
    firstName: "", lastName: "", ssn: "",
    // entity
    entityName: "", ein: "", entityType: "",
    // shared
    taxYear: "2025", country: "",
    estTax: "", payments: "", amountPaying: "",
    hasBalance: "",
    payMethod: "",
    routingNo: "", accountNo: "", accountType: "",
    consent: false,
  });
  const update = (patch) => setForm((s) => ({ ...s, ...patch }));

  const bankSaved = form.routingNo.trim() && form.accountNo.trim() && form.accountType;
  const openBankModal = () => {
    setBankDraft({ routingNo: form.routingNo, accountNo: form.accountNo, accountType: form.accountType });
    update({ payMethod: "bank" });
    setBankModal(true);
  };
  const draftReady = bankDraft.routingNo.trim().length >= 9 && bankDraft.accountNo.trim() && bankDraft.accountType;
  const saveBank = () => {
    if (!draftReady) return;
    update({ routingNo: bankDraft.routingNo, accountNo: bankDraft.accountNo, accountType: bankDraft.accountType });
    setBankModal(false);
  };
  const maskAcct = (n) => (n && n.length > 4 ? "•••• " + n.slice(-4) : n);

  const kindMeta = EXT_KINDS.find((k) => k.id === form.kind);
  const isEntity = form.kind === "entity";

  const num = (v) => {
    const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
    return isNaN(n) ? 0 : n;
  };
  const balanceDue = Math.max(0, num(form.estTax) - num(form.payments));
  const fmt = (n) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  // Pass-through entities (S-Corp 1120-S, Partnership 1065) don't owe entity-level tax,
  // so the balance-due / payment step doesn't apply to them.
  const isPassthrough = isEntity && (form.entityType.indexOf("1120-S") > -1 || form.entityType.indexOf("1065") > -1);
  const showBalanceStep = !isPassthrough;
  const showPay = showBalanceStep && form.hasBalance === "yes";

  const idReady = isEntity
    ? form.entityName.trim() && form.ein.trim() && form.entityType
    : form.firstName.trim() && form.lastName.trim() && form.ssn.trim();
  const payReady =
    !showPay ||
    (form.payMethod === "directpay") ||
    (form.payMethod === "bank" && form.routingNo.trim() && form.accountNo.trim() && form.accountType);
  const ready = form.kind && idReady && form.taxYear && form.country && (!showBalanceStep || form.hasBalance) && payReady && form.consent;

  const submit = () => {
    if (!ready) {
      if (!form.consent) alert("Please review and check the consent box before submitting.");
      return;
    }
    setRefNum("MUC-EXT-" + new Date().getFullYear() + "-" + String(Math.floor(Math.random() * 90000) + 10000));
    setSubmitted(true);
    setTimeout(() => {
      const el = document.getElementById("ext-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="intake-portal" id="ext-top">
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: "var(--space-7)" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>Tax extension</div>
          <h2 className="section-head" style={{ margin: "0 auto var(--space-3)", maxWidth: "22ch" }}>
            File your extension — six more months to file.
          </h2>
          <p className="section-sub" style={{ margin: "0 auto", maxWidth: "58ch" }}>
            Choose the kind of extension you need. We'll collect only what that form requires —
            no full return questionnaire.
          </p>
        </div>

        <div className="intake-card">
          <div className="intake-service-banner">
            <span className="intake-service-banner-icon"><Icon name="calendar-clock" size={16} /></span>
            <span className="intake-service-banner-label">Filing for:</span>
            <strong>{kindMeta ? `${kindMeta.title} (Form ${kindMeta.form})` : "Tax extension"}</strong>
            <button type="button" className="intake-service-change" onClick={() => { if (onExit) onExit(); }}>
              Change service
            </button>
          </div>

          {!submitted && <ExtensionInfo />}

          {!submitted && (
            <div className="ext-note">
              <span className="ext-note-icon"><Icon name="alert-circle" size={18} /></span>
              <span><strong>Remember:</strong> an extension is more time to <em>file</em> — not more time to <em>pay</em>. Any tax owed is still due by the April deadline.</span>
            </div>
          )}

          {!submitted && (
            <React.Fragment>
              {/* Kind selector */}
              <div className="intake-card-header">
                <div className="intake-step-num"><Icon name="list-checks" size={16} /></div>
                <div>
                  <h3>Which extension do you need?</h3>
                  <p>Pick one — the form below adjusts to match.</p>
                </div>
              </div>

              <div className="intake-body">
                <div className="form-row full">
                  <div className="ext-kind-grid">
                    {EXT_KINDS.map((k) => (
                      <button
                        type="button"
                        key={k.id}
                        className={"ext-kind-card" + (form.kind === k.id ? " selected" : "")}
                        onClick={() => { update({ kind: k.id }); if (k.id === "entity") setEntityModal(true); }}
                      >
                        <span className="ext-kind-icon"><Icon name={k.icon} size={22} /></span>
                        <span className="ext-kind-form">Form {k.form}</span>
                        <span className="ext-kind-title">{k.title}</span>
                        <span className="ext-kind-sub">{k.sub}</span>
                        <span className="ext-kind-check"><Icon name="check" size={14} /></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {form.kind && (
                <React.Fragment>
                  {/* Identity — adapts to kind */}
                  <div className="intake-card-header">
                    <div className="intake-step-num"><Icon name={isEntity ? "building-2" : "user"} size={16} /></div>
                    <div>
                      <h3>{isEntity ? "About the business" : "Who is filing the extension?"}</h3>
                      <p>{isEntity
                        ? "This matches your Form 7004 to the right entity and tax year."
                        : "This matches your Form 4868 to the right taxpayer and tax year."}</p>
                    </div>
                  </div>

                  <div className="intake-body">
                    {isEntity ? (
                      <React.Fragment>
                        <div className="form-row">
                          <ExtField label="Legal entity name" required>
                            <input className="field-input" type="text" placeholder="Whitfield Holdings LLC" value={form.entityName} onChange={(e) => update({ entityName: e.target.value })} />
                          </ExtField>
                          <ExtField label="Employer ID Number (EIN)" required hint="Encrypted in transit and at rest.">
                            <input className="field-input" type="text" placeholder="XX-XXXXXXX" maxLength={10} value={form.ein} onChange={(e) => update({ ein: e.target.value })} />
                          </ExtField>
                        </div>
                        <div className="form-row">
                          <ExtField label="Entity type / return" required>
                            <button type="button" className={"ext-type-trigger" + (form.entityType ? " filled" : "")} onClick={() => setEntityModal(true)}>
                              <span>{form.entityType || "Select entity type…"}</span>
                              <Icon name="chevron-down" size={16} />
                            </button>
                          </ExtField>
                          <ExtField label="Tax year" required>
                            <select className="field-select" value={form.taxYear} onChange={(e) => update({ taxYear: e.target.value })}>
                              <option>2025</option>
                              <option>2024</option>
                              <option>2023</option>
                            </select>
                          </ExtField>
                        </div>
                        <div className="form-row full">
                          <ExtField label="Country of operation" required>
                            <input className="field-input" type="text" placeholder="Where the business operates" value={form.country} onChange={(e) => update({ country: e.target.value })} />
                          </ExtField>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="form-row">
                          <ExtField label="First name" required>
                            <input className="field-input" type="text" placeholder="Avery" value={form.firstName} onChange={(e) => update({ firstName: e.target.value })} />
                          </ExtField>
                          <ExtField label="Last name" required>
                            <input className="field-input" type="text" placeholder="Whitfield" value={form.lastName} onChange={(e) => update({ lastName: e.target.value })} />
                          </ExtField>
                        </div>
                        <div className="form-row">
                          <ExtField label="Social Security Number (SSN)" required hint="Encrypted in transit and at rest. Never stored in plain text.">
                            <input className="field-input" type="text" placeholder="XXX-XX-XXXX" maxLength={11} value={form.ssn} onChange={(e) => update({ ssn: e.target.value })} />
                          </ExtField>
                          <ExtField label="Tax year" required>
                            <select className="field-select" value={form.taxYear} onChange={(e) => update({ taxYear: e.target.value })}>
                              <option>2025</option>
                              <option>2024</option>
                              <option>2023</option>
                            </select>
                          </ExtField>
                        </div>
                        <div className="form-row full">
                          <ExtField label="Country of residence" required>
                            <input className="field-input" type="text" placeholder="Where you currently live" value={form.country} onChange={(e) => update({ country: e.target.value })} />
                          </ExtField>
                        </div>
                      </React.Fragment>
                    )}
                  </div>

                  {/* Estimate */}
                  {showBalanceStep && (
                    <div className="intake-card-header">
                      <div className="intake-step-num"><Icon name="calculator" size={16} /></div>
                      <div>
                        <h3>Will you owe a balance with this extension?</h3>
                        <p>An extension gives more time to file — not to pay. Let us know if you expect to owe so we can collect payment.</p>
                      </div>
                    </div>
                  )}

                  <div className="intake-body">
                    {showBalanceStep && (
                      <div className="form-row full">
                        <div className="ext-radio-row">
                          {[{ v: "yes", label: "Yes, I have a balance due" }, { v: "no", label: "No / not sure" }].map((o) => (
                            <button
                              type="button"
                              key={o.v}
                              className={"ext-radio" + (form.hasBalance === o.v ? " selected" : "")}
                              onClick={() => update({ hasBalance: o.v })}
                            >
                              <span className="ext-radio-dot" />
                              {o.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {showPay && (
                      <React.Fragment>
                        <div className="form-row">
                          <ExtField label="Estimated total tax for the year" hint="Your best estimate — it doesn't have to be exact.">
                            <input className="field-input" type="text" inputMode="decimal" placeholder="$0" value={form.estTax} onChange={(e) => update({ estTax: e.target.value })} />
                          </ExtField>
                          <ExtField label="Total payments &amp; withholding" hint="Amounts already paid or withheld for this year.">
                            <input className="field-input" type="text" inputMode="decimal" placeholder="$0" value={form.payments} onChange={(e) => update({ payments: e.target.value })} />
                          </ExtField>
                        </div>

                        <div className="ext-balance">
                          <div className="ext-balance-row">
                            <span>Estimated balance due</span>
                            <strong className="numeric">{fmt(balanceDue)}</strong>
                          </div>
                          <p className="ext-balance-note">
                            Paying this with your extension helps you avoid interest and late-payment penalties. Your CPA will confirm the exact figure.
                          </p>
                        </div>

                        <div className="form-row full">
                          <ExtField label="Amount you'd like to pay with the extension" hint="Optional. You can pay all, some, or none now.">
                            <input className="field-input" type="text" inputMode="decimal" placeholder="$0" value={form.amountPaying} onChange={(e) => update({ amountPaying: e.target.value })} />
                          </ExtField>
                        </div>

                        <div className="intake-field-label" style={{ marginTop: "var(--space-2)" }}>
                          How would you like to pay?<span className="intake-field-required">*</span>
                        </div>
                        <div className="ext-pay-grid">
                          <button
                            type="button"
                            className={"ext-pay-card" + (form.payMethod === "bank" ? " selected" : "")}
                            onClick={openBankModal}
                          >
                            <span className="ext-pay-icon"><Icon name="landmark" size={20} /></span>
                            <span className="ext-pay-title">Provide my bank details</span>
                            <span className="ext-pay-sub">We'll debit your account for the amount above when we file. Fastest, nothing more to do.</span>
                            <span className="ext-kind-check"><Icon name="check" size={14} /></span>
                          </button>
                          <button
                            type="button"
                            className={"ext-pay-card" + (form.payMethod === "directpay" ? " selected" : "")}
                            onClick={() => update({ payMethod: "directpay" })}
                          >
                            <span className="ext-pay-icon"><Icon name="external-link" size={20} /></span>
                            <span className="ext-pay-title">I'll pay directly on IRS.gov</span>
                            <span className="ext-pay-sub">Prefer to pay the IRS yourself? Get step-by-step Direct Pay instructions below.</span>
                            <span className="ext-kind-check"><Icon name="check" size={14} /></span>
                          </button>
                        </div>

                        {form.payMethod === "bank" && bankSaved && (
                          <div className="ext-bank-summary">
                            <span className="ext-bank-summary-icon"><Icon name="check-circle" size={18} /></span>
                            <div className="ext-bank-summary-body">
                              <strong>Bank account on file</strong>
                              <span>{form.accountType} · Acct {maskAcct(form.accountNo)} · RTN {form.routingNo}</span>
                            </div>
                            <button type="button" className="ext-bank-edit" onClick={openBankModal}>
                              <Icon name="pencil" size={13} /> Edit
                            </button>
                          </div>
                        )}
                        {form.payMethod === "bank" && !bankSaved && (
                          <button type="button" className="ext-bank-add" onClick={openBankModal}>
                            <Icon name="plus" size={14} /> Enter bank details
                          </button>
                        )}

                        {form.payMethod === "directpay" && (
                          <div className="ext-pay-panel">
                            <div className="ext-pay-panel-head">
                              <Icon name="info" size={16} />
                              <span>Pay your balance directly through the IRS — no bank details shared with us.</span>
                            </div>
                            <ol className="ext-steps">
                              <li>Go to <strong>irs.gov/payments/direct-pay</strong> and choose <em>“Make a Payment.”</em></li>
                              <li>For <em>Reason for Payment</em>, select <strong>{isEntity ? "“Balance Due” (or your entity's payment portal, EFTPS)" : "“Extension.”"}</strong></li>
                              <li>For <em>Apply Payment To</em>, choose <strong>{isEntity ? "the relevant business return" : "“4868 (for 1040, 1040A, 1040EZ).”"}</strong></li>
                              <li>Select the tax year <strong>{form.taxYear}</strong> and continue.</li>
                              <li>Verify your identity, enter your bank info on the IRS site, and submit. Save the confirmation number.</li>
                            </ol>
                            <a className="ext-steps-link" href="https://www.irs.gov/payments/direct-pay" target="_blank" rel="noopener noreferrer">
                              <Icon name="external-link" size={14} /> Open IRS Direct Pay
                            </a>
                            <p className="ext-steps-note">Already paid this way? Send us your confirmation number in the portal so we can note it on your file.</p>
                          </div>
                        )}
                      </React.Fragment>
                    )}

                    {isPassthrough && (
                      <div className="ext-passthrough-note">
                        <span className="ext-passthrough-icon"><Icon name="info" size={18} /></span>
                        <span>{form.entityType.indexOf("1120-S") > -1 ? "S-Corporations" : "Partnerships"} are pass-through entities — income and tax flow to the owners' personal returns, so there's no entity-level balance due with this extension.</span>
                      </div>
                    )}

                    <label className="consent-box">
                      <input type="checkbox" checked={form.consent} onChange={(e) => update({ consent: e.target.checked })} />
                      <span>
                        I authorize Mindful US CPA to prepare and file Form {kindMeta ? kindMeta.form : "4868/7004"}{" "}
                        (Application for Automatic Extension of Time to File) on my behalf for the selected
                        tax year. I understand an extension extends the time to file, not the time to pay.
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
                  File my extension
                </button>
              </div>
            </React.Fragment>
          )}

          {submitted && (
            <div className="intake-body" style={{ padding: 0 }}>
              <div className="success-card">
                <div className="success-icon"><Icon name="check" size={36} /></div>
                <h2>Extension request submitted.</h2>
                <p>
                  Thank you. We'll prepare and file Form {kindMeta ? kindMeta.form : ""} for tax year {form.taxYear} and
                  confirm by email once it's accepted — usually within one business day.
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

      {entityModal && (
        <div className="ext-modal-overlay" onClick={() => setEntityModal(false)}>
          <div className="ext-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="ext-modal-head">
              <div>
                <h3>Which entity are you extending?</h3>
                <p>Pick the return type — we'll file the matching Form 7004 extension.</p>
              </div>
              <button type="button" className="ext-modal-close" onClick={() => setEntityModal(false)} aria-label="Close">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="ext-modal-body">
              <div className="ext-entity-list">
                {EXT_ENTITY_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t.v}
                    className={"ext-entity-option" + (form.entityType === t.v ? " selected" : "")}
                    onClick={() => { update({ entityType: t.v }); setEntityModal(false); }}
                  >
                    <span className="ext-entity-icon"><Icon name={t.icon} size={20} /></span>
                    <span className="ext-entity-text">
                      <span className="ext-entity-title">{t.title}</span>
                      <span className="ext-entity-sub">{t.sub}</span>
                    </span>
                    <span className="ext-entity-form">Form {t.form}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {bankModal && (
        <div className="ext-modal-overlay" onClick={() => setBankModal(false)}>
          <div className="ext-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="ext-modal-head">
              <div>
                <h3>Bank account for payment</h3>
                <p>We'll debit this account for the amount you chose to pay with your extension.</p>
              </div>
              <button type="button" className="ext-modal-close" onClick={() => setBankModal(false)} aria-label="Close">
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="ext-modal-body">
              <ExtField label="Account number" required>
                <input className="field-input" type="text" inputMode="numeric" autoFocus placeholder="Your account number" value={bankDraft.accountNo} onChange={(e) => setBankDraft((d) => ({ ...d, accountNo: e.target.value }))} />
              </ExtField>
              <ExtField label="Routing number (RTN)" required hint="9 digits, bottom-left of a check.">
                <input className="field-input" type="text" inputMode="numeric" maxLength={9} placeholder="XXXXXXXXX" value={bankDraft.routingNo} onChange={(e) => setBankDraft((d) => ({ ...d, routingNo: e.target.value }))} />
              </ExtField>
              <ExtField label="Type of account" required>
                <div className="ext-radio-row">
                  {["Checking", "Savings"].map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={"ext-radio" + (bankDraft.accountType === t ? " selected" : "")}
                      onClick={() => setBankDraft((d) => ({ ...d, accountType: t }))}
                    >
                      <span className="ext-radio-dot" />
                      {t}
                    </button>
                  ))}
                </div>
              </ExtField>

              <div className="ext-modal-secure">
                <Icon name="shield-check" size={15} />
                <span>Encrypted in transit and at rest. Used only for this payment, never stored in plain text.</span>
              </div>
            </div>

            <div className="ext-modal-foot">
              <button type="button" className="btn btn-secondary" onClick={() => setBankModal(false)}>Cancel</button>
              <button type="button" className={"btn btn-primary" + (draftReady ? "" : " disabled")} disabled={!draftReady} onClick={saveBank}>
                <Icon name="check" size={14} /> Save bank details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export { ExtensionOrganizer };

import React from 'react';
import { Icon } from './Icon.jsx';

// EntityHelpers — shared constants + field components for the Entity Tax
// Organizer. Loaded before EntityTaxOrganizer.jsx. Mindful brand language:
// navy/gold/cream, Cormorant display, Source Sans body, no emoji, Lucide icons.

const ENTITY_TYPES = [
  "US C-Corporation",
  "US S-Corporation",
  "Non-US Corporation (US Owner)",
  "Non-US Corporation (NRA Owner)",
  "US Partnership",
  "Non-US Partnership",
  "US Single Member LLC (US Owner)",
  "US Single Member LLC (NRA Owner)",
];

// Which federal return each entity type maps to — surfaced as a quiet hint.
const ENTITY_TYPE_FORM = {
  "US C-Corporation": "Form 1120",
  "US S-Corporation": "Form 1120-S",
  "Non-US Corporation (US Owner)": "Form 5471 + Form 1120-F (if US-effectively-connected)",
  "Non-US Corporation (NRA Owner)": "Form 1120-F / Form 5472",
  "US Partnership": "Form 1065",
  "Non-US Partnership": "Form 8865 / Form 1065",
  "US Single Member LLC (US Owner)": "Disregarded — flows to owner's return",
  "US Single Member LLC (NRA Owner)": "Form 5472 + pro-forma 1120",
};

const PARTNERSHIP_TYPES = ["US Partnership", "Non-US Partnership"];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming","Not incorporated in a US state",
];

const ENTITY_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ENTITY_DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const ACCOUNTING_METHODS = ["Cash", "Accrual", "Other", "Not sure"];

// The main return each type files — used for the "filed before" question.
const ENTITY_PRIMARY_FORM = {
  "US C-Corporation": "Form 1120",
  "US S-Corporation": "Form 1120-S",
  "Non-US Corporation (US Owner)": "Form 5471",
  "Non-US Corporation (NRA Owner)": "Form 1120-F",
  "US Partnership": "Form 1065",
  "Non-US Partnership": "Form 8865",
  "US Single Member LLC (US Owner)": "its owner's return",
  "US Single Member LLC (NRA Owner)": "Form 5472",
};

// ---- Field primitives ---------------------------------------------------

function EntityField({ label, hint, optional, children, full }) {
  return (
    <label className={"rental-field" + (full ? " full" : "")}>
      <span className="rental-field-label">
        {label}
        {optional && <span className="rental-field-opt"> (optional)</span>}
      </span>
      {hint && <span className="rental-field-hint">{hint}</span>}
      {children}
    </label>
  );
}

function TextField({ label, hint, optional, value, onChange, placeholder, full }) {
  return (
    <EntityField label={label} hint={hint} optional={optional} full={full}>
      <input
        className="rental-input"
        type="text"
        placeholder={placeholder || ""}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </EntityField>
  );
}

// A date field that accepts MMM-DD-YYYY free text (matches the reference).
function DateField({ label, hint, optional, value, onChange, full }) {
  return (
    <EntityField label={label} hint={hint} optional={optional} full={full}>
      <input
        className="rental-input"
        type="text"
        placeholder="MMM-DD-YYYY"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </EntityField>
  );
}

function SelectField({ label, hint, optional, value, onChange, options, placeholder, full }) {
  return (
    <EntityField label={label} hint={hint} optional={optional} full={full}>
      <select className="rental-input" value={value || ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder || "Select"}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </EntityField>
  );
}

// Inline choice row — defaults to No / Yes, accepts custom `choices`.
function YesNoInline({ label, hint, value, onChange, choices }) {
  const opts = choices || [
    { v: "no", label: "No", kind: "no" },
    { v: "yes", label: "Yes", kind: "yes" },
  ];
  return (
    <div className="entity-yesno">
      <div className="entity-yesno-body">
        <div className="entity-yesno-label">{label}</div>
        {hint && <div className="entity-yesno-hint">{hint}</div>}
      </div>
      <div className="entity-yesno-pick">
        {opts.map((o) => {
          const sel = value === o.v;
          const mod = sel ? (o.kind === "no" ? " selected-no" : o.kind === "yes" ? " selected-yes" : " selected-neutral") : "";
          return (
            <button key={o.v} type="button" className={"entity-yn-btn" + mod} onClick={() => onChange(o.v)}>{o.label}</button>
          );
        })}
      </div>
    </div>
  );
}

const YN3 = [
  { v: "no", label: "No", kind: "no" },
  { v: "yes", label: "Yes", kind: "yes" },
  { v: "unsure", label: "Not sure", kind: "neutral" },
];

// Accounting period — a start month/day to an end month/day (the fiscal year).
function AccountingPeriod({ value, onChange }) {
  const v = value || {};
  const set = (k, val) => onChange({ ...v, [k]: val });
  const Sel = ({ k, options, ph }) => (
    <select className="rental-input entity-period-sel" value={v[k] || ""} onChange={(e) => set(k, e.target.value)}>
      <option value="">{ph}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
  return (
    <div className="rental-field">
      <span className="rental-field-label">Accounting period</span>
      <span className="rental-field-hint">The entity's fiscal year — most U.S. entities run January through December.</span>
      <div className="entity-period">
        <Sel k="startMonth" options={ENTITY_MONTHS} ph="Month" />
        <Sel k="startDay" options={ENTITY_DAYS} ph="Day" />
        <span className="entity-period-dash">to</span>
        <Sel k="endMonth" options={ENTITY_MONTHS} ph="Month" />
        <Sel k="endDay" options={ENTITY_DAYS} ph="Day" />
      </div>
    </div>
  );
}

// Compact labeled document upload — a "Upload file" button + file list + note.
function DocUpload({ id, label, hint, note, files, onChange }) {
  const list = files || [];
  const inputRef = React.useRef(null);
  const addFiles = (fl) => onChange([...list, ...Array.from(fl).map((f) => ({ name: f.name, size: f.size }))]);
  const removeFile = (i) => onChange(list.filter((_, idx) => idx !== i));
  return (
    <div className="entity-docrow">
      <div className="entity-docrow-head">
        <div className="entity-docrow-label">{label}</div>
        {hint && <div className="entity-docrow-hint">{hint}</div>}
      </div>
      <button type="button" className="entity-upload-btn" onClick={() => inputRef.current && inputRef.current.click()}>
        <Icon name="file-up" size={15} /> Upload file
      </button>
      <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv" style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
      {note && <div className="entity-docrow-note"><Icon name="info" size={13} />{note}</div>}
      {list.length > 0 && (
        <div className="file-list" style={{ marginTop: 10 }}>
          {list.map((f, i) => (
            <div key={i} className="file-row">
              <span className="file-check"><Icon name="check" size={14} /></span>
              <span className="file-name">{f.name}</span>
              <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
              <button type="button" className="file-remove" onClick={() => removeFile(i)} aria-label="Remove"><Icon name="x" size={14} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Section header inside the entity card ("Entity Info", "Ownership", "Operations")
function EntitySectionHead({ title, note }) {
  return (
    <div className="entity-section-head">
      <h3>{title}</h3>
      {note && <p>{note}</p>}
    </div>
  );
}

// ---- Editable owner table ----------------------------------------------
// columns: [{ key, label, width, placeholder }]
function OwnerTable({ columns, rows, onChange, addLabel }) {
  const emptyRow = () => columns.reduce((acc, c) => ((acc[c.key] = ""), acc), {});
  const list = rows && rows.length ? rows : [emptyRow()];

  const setCell = (ri, key, val) => onChange(list.map((r, i) => (i === ri ? { ...r, [key]: val } : r)));
  const addRow = () => onChange([...list, emptyRow()]);
  const removeRow = (ri) => {
    const next = list.filter((_, i) => i !== ri);
    onChange(next.length ? next : [emptyRow()]);
  };

  return (
    <div className="owner-table-wrap">
      <div className="owner-table-scroll">
        <table className="owner-table">
          <thead>
            <tr>
              <th className="owner-table-num">№</th>
              {columns.map((c) => <th key={c.key} style={c.width ? { width: c.width } : null}>{c.label}</th>)}
              <th className="owner-table-act" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {list.map((row, ri) => (
              <tr key={ri}>
                <td className="owner-table-num">{ri + 1}</td>
                {columns.map((c) => (
                  <td key={c.key}>
                    <input
                      className="owner-cell-input"
                      type="text"
                      placeholder={c.placeholder || ""}
                      value={row[c.key] || ""}
                      onChange={(e) => setCell(ri, c.key, e.target.value)}
                    />
                  </td>
                ))}
                <td className="owner-table-act">
                  {list.length > 1 && (
                    <button type="button" className="owner-row-remove" onClick={() => removeRow(ri)} aria-label="Remove row">
                      <Icon name="x" size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className="income-add" onClick={addRow}>
        <Icon name="plus" size={14} />
        {addLabel || "Add a row"}
      </button>
    </div>
  );
}




// EntityExtras — Documents and Review steps for the Entity Tax Organizer.
// Loaded after EntityHelpers.jsx and before EntityTaxOrganizer.jsx.

function EntityDocuments({ entity, patch }) {
  const files = entity.files || [];
  const inputRef = React.useRef(null);
  const [dragOver, setDragOver] = React.useState(false);

  const addFiles = (fl) => {
    const incoming = Array.from(fl).map((f) => ({ name: f.name, size: f.size }));
    patch({ files: [...files, ...incoming] });
  };
  const removeFile = (i) => patch({ files: files.filter((_, idx) => idx !== i) });

  const primaryForm = ENTITY_PRIMARY_FORM[entity.type];
  const filedChoices = [
    { v: "no", label: "No", kind: "no" },
    { v: "yes", label: "Yes", kind: "yes" },
    { v: "byus", label: "Mindful filed it", kind: "neutral" },
  ];

  return (
    <div>
      <EntitySectionHead
        title="Entity documents"
        note={"Upload what you have for " + (entity.name || "this entity") + ". Anything you can't find now, you can add later from your dashboard."}
      />

      <div className="entity-docrows">
        <DocUpload
          id="doc-ownership"
          label="A document showing the entity's formation details and who owns it"
          hint="A certificate of incorporation, operating or shareholders' agreement, or cap table works well."
          note="Outside the U.S.? Include whatever your jurisdiction issues — for example, an Indian company's certificate of incorporation and shareholders' agreement."
          files={entity.docOwnership}
          onChange={(f) => patch({ docOwnership: f })}
        />
        <DocUpload
          id="doc-balance"
          label="The entity's balance sheet"
          hint="Shows what the entity owns and owes — assets, liabilities, and equity."
          files={entity.docBalanceSheet}
          onChange={(f) => patch({ docBalanceSheet: f })}
        />
        <DocUpload
          id="doc-income"
          label="The entity's income statement"
          hint="Income and expenses for the year — also called a profit &amp; loss (P&amp;L)."
          files={entity.docIncomeStatement}
          onChange={(f) => patch({ docIncomeStatement: f })}
        />
      </div>

      <div className="entity-q-stack" style={{ marginTop: 18 }}>
        <YesNoInline
          label={primaryForm && primaryForm.indexOf("Form") === 0 ? "Has the entity filed " + primaryForm + " before?" : "Has the entity filed a U.S. return before?"}
          value={entity.filedBefore}
          onChange={(v) => patch({ filedBefore: v })}
          choices={filedChoices}
        />
      </div>

      <div style={{ marginTop: 22 }}>
        <div className="entity-subhead">Anything else? Drop it here.</div>
        <div className="entity-doc-checklist-inline">
          Helpful extras: prior-year return, payroll filings (941 / 940 / W-2), fixed-asset &amp; depreciation schedule, K-1s, and year-end bank or loan statements.
        </div>
        <div
          className={"dep-upload entity-upload" + (dragOver ? " drag" : "")}
          onClick={() => inputRef.current && inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        >
          <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv" style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
          <span className="dep-upload-icon"><Icon name="upload-cloud" size={24} /></span>
          <span className="dep-upload-text">
            <strong>Drag &amp; drop, or click to browse</strong>
            <span>PDF, JPG, PNG, DOC, XLS, CSV — encrypted on upload</span>
          </span>
        </div>
        {files.length > 0 && (
          <div className="file-list" style={{ marginTop: 12 }}>
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
  );
}

const REFUND_METHODS = [
  "Direct deposit to a U.S. bank account",
  "Direct deposit to a foreign bank account",
  "Apply the refund to next year's taxes",
  "Paper check by mail",
];

function EntityRefund({ entity, patch }) {
  const needsBank = entity.refundMethod === "Direct deposit to a U.S. bank account"
    || entity.refundMethod === "Direct deposit to a foreign bank account";
  return (
    <div>
      <EntitySectionHead
        title="Refund"
        note="If this return ends in a refund, tell us how you'd like to receive it. You can change this later."
      />

      <div className="entity-grid">
        <SelectField label="How should we send any refund?" full value={entity.refundMethod} onChange={(v) => patch({ refundMethod: v })} options={REFUND_METHODS} placeholder="Select a refund method" />
      </div>

      <div className="entity-warn">
        <span className="entity-warn-icon"><Icon name="alert-triangle" size={16} /></span>
        <span>The IRS issues most refunds by direct deposit. Without bank details on file, a refund can be delayed or held — so we recommend direct deposit wherever it's available to you.</span>
      </div>

      {needsBank && (
        <React.Fragment>
          <div className="entity-grid" style={{ marginTop: 4 }}>
            <SelectField
              label="How would you like to give us the bank details?"
              full
              value={entity.refundProvideVia}
              onChange={(v) => patch({ refundProvideVia: v })}
              options={["Upload a voided check", "Enter routing & account numbers myself"]}
              placeholder="Select"
            />
          </div>

          {entity.refundProvideVia === "Upload a voided check" && (
            <div style={{ marginTop: 14 }}>
              <DocUpload
                id="voided-check"
                label="Upload a voided check"
                hint="We read the routing and account numbers from the check — that's all."
                files={entity.voidedCheck}
                onChange={(f) => patch({ voidedCheck: f })}
              />
            </div>
          )}

          {entity.refundProvideVia === "Enter routing & account numbers myself" && (
            <div className="entity-grid" style={{ marginTop: 14 }}>
              <TextField label="Bank name" value={entity.bankName} onChange={(v) => patch({ bankName: v })} placeholder="e.g. Chase, Bank of America" />
              <SelectField label="Account type" value={entity.accountType} onChange={(v) => patch({ accountType: v })} options={["Checking", "Savings"]} placeholder="Select" />
              <TextField label="Routing number" hint="9 digits" value={entity.routingNumber} onChange={(v) => patch({ routingNumber: v })} placeholder="000000000" />
              <TextField label="Account number" value={entity.accountNumber} onChange={(v) => patch({ accountNumber: v })} placeholder="Account number" />
            </div>
          )}

          <div className="entity-docrow-note" style={{ marginTop: 14 }}>
            <Icon name="shield-check" size={13} />
            We only use these details to deposit your refund — never to withdraw funds or charge anything.
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function entityCount(rows) {
  return (rows || []).filter((r) => Object.values(r).some((v) => v && String(v).trim())).length;
}

function EntityReview({ entities, onJump }) {
  return (
    <div>
      <EntitySectionHead
        title="Review &amp; submit"
        note="Here's what we'll receive. Edit any entity before submitting — your CPA reviews everything and follows up if anything's missing."
      />
      <div className="entity-review-list">
        {entities.map((e, i) => {
          const done = !!(e.type && e.name && e.ein && e.country);
          return (
            <div key={i} className="entity-review-card">
              <div className="entity-review-top">
                <div>
                  <div className="entity-review-name">{e.name || `Entity ${i + 1}`}</div>
                  <div className="entity-review-type">{e.type || "Entity type not set"}{ENTITY_TYPE_FORM[e.type] ? " · " + ENTITY_TYPE_FORM[e.type] : ""}</div>
                </div>
                <span className={"entity-review-badge" + (done ? " ok" : " warn")}>
                  <Icon name={done ? "check-circle-2" : "alert-circle"} size={13} />
                  {done ? "Ready" : "Incomplete"}
                </span>
              </div>
              <div className="entity-review-grid">
                <div><span>EIN</span><strong className="numeric">{e.ein || "—"}</strong></div>
                <div><span>Country</span><strong>{e.country || "—"}</strong></div>
                <div><span>Tax-year end</span><strong>{e.taxYearEnd || "—"}</strong></div>
                <div><span>U.S. owners</span><strong className="numeric">{entityCount(e.usOwners)}</strong></div>
                <div><span>Non-U.S. owners</span><strong className="numeric">{entityCount(e.nonUsOwners)}</strong></div>
                <div><span>Documents</span><strong className="numeric">{(e.docOwnership||[]).length + (e.docBalanceSheet||[]).length + (e.docIncomeStatement||[]).length + (e.files || []).length}</strong></div>
              </div>
              <button type="button" className="entity-review-edit" onClick={() => onJump(i)}>
                <Icon name="pencil" size={13} /> Edit this entity
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}




// EntityTaxOrganizer — the business/entity questionnaire that comes forward
// when a client selects "Corporate / entity tax return" from the dashboard.
// Mirrors the reference flow (Entity list → Entity info → Ownership →
// Operations) rebuilt in the Mindful brand, with multi-entity support.

const ENTITY_STEPS = [
  { id: "entities",  label: "Entity details" },
  { id: "documents", label: "Documents" },
  { id: "refund",    label: "Refund" },
  { id: "review",    label: "Review" },
];

const emptyEntity = () => ({
  type: "",
  // Entity info
  name: "", street: "", city: "", stateProv: "", zip: "", country: "",
  mailingDifferent: "", mailStreet: "", mailCity: "", mailStateProv: "", mailZip: "", mailCountry: "",
  formationDate: "", dissolutionDate: "", taxYearEnd: "", ein: "",
  // Ownership
  usOwners: [], nonUsOwners: [], ownsInterest: "",
  // Operations
  opState: "", usBusiness: "", operatesAbroad: "", businessActivity: "",
  accountingPeriod: {}, accountingMethod: "",
  payments1099: "", responsibleFiler: "", digitalAssetReceived: "", digitalAssetDisposed: "",
  // Financials
  contributedCapital: "", tookDistributions: "", passiveIncome: "",
  taxPrepayments: "", taxComment: "", taxCommentText: "",
  // Foreign accounts
  ownsForeignAsset: "",
  // Documents
  docOwnership: [], docBalanceSheet: [], docIncomeStatement: [], filedBefore: "",
  files: [],
  // Refund
  refundMethod: "", refundProvideVia: "", voidedCheck: [],
  bankName: "", accountType: "", routingNumber: "", accountNumber: "",
});

function entityComplete(e) {
  return !!(e.type && e.name && e.ein && e.country);
}

function EntityTaxOrganizer({ presetService, onExit }) {
  const [step, setStep] = React.useState(0);
  const [entities, setEntities] = React.useState([emptyEntity()]);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const active = entities[activeIdx] || entities[0];
  const incompleteCount = entities.filter((e) => !entityComplete(e)).length;
  const filingYear = 2025;

  const patch = (p) => setEntities((list) => list.map((e, i) => (i === activeIdx ? { ...e, ...p } : e)));
  const addEntity = () => {
    setEntities((list) => [...list, emptyEntity()]);
    setActiveIdx(entities.length);
  };
  const deleteEntity = () => {
    if (entities.length === 1) { setEntities([emptyEntity()]); setActiveIdx(0); return; }
    const next = entities.filter((_, i) => i !== activeIdx);
    setEntities(next);
    setActiveIdx(Math.max(0, activeIdx - 1));
  };

  const isPartnership = PARTNERSHIP_TYPES.includes(active.type);
  const isSMLLC = active.type.indexOf("Single Member LLC") > -1;
  const interestWord = isPartnership ? "% interest" : "# shares";

  // Owner table column sets adapt to entity type.
  const usOwnerCols = isPartnership
    ? [
        { key: "name", label: "Name", width: "16%", placeholder: "Full legal name" },
        { key: "ssn", label: "SSN or ITIN", width: "13%", placeholder: "000-00-0000" },
        { key: "address", label: "Address", width: "26%", placeholder: "Street, city, state, ZIP" },
        { key: "interestBeg", label: "% interest — start of year", placeholder: "0%" },
        { key: "interestEnd", label: "% interest — end of year", placeholder: "0%" },
        { key: "capital", label: "% profit / loss / capital", placeholder: "0%" },
      ]
    : [
        { key: "name", label: "Name", width: "16%", placeholder: "Full legal name" },
        { key: "ssn", label: "SSN or ITIN", width: "13%", placeholder: "000-00-0000" },
        { key: "address", label: "Address", width: "26%", placeholder: "Street, city, state, ZIP" },
        { key: "sharesBeg", label: "# shares — start of year", placeholder: "0" },
        { key: "sharesEnd", label: "# shares — end of year", placeholder: "0" },
        { key: "voting", label: "% voting power", placeholder: "0%" },
      ];

  const nonUsOwnerCols = [
    { key: "name", label: "Name", width: "15%", placeholder: "Full legal name" },
    { key: "address", label: "Address", width: "22%", placeholder: "Street, city, country" },
    { key: "shareBeg", label: interestWord + " — start of year", placeholder: isPartnership ? "0%" : "0" },
    { key: "shareEnd", label: interestWord + " — end of year", placeholder: isPartnership ? "0%" : "0" },
    { key: "incCountry", label: "If an entity (not a person): country of incorporation", width: "22%", placeholder: "Country" },
    { key: "relation", label: "Relation to you (if any)", placeholder: "e.g. spouse, parent" },
  ];

  const typeForm = ENTITY_TYPE_FORM[active.type];

  return (
    <div className="organizer" data-screen-label="Entity organizer">
      <div className="container-narrow" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-9)" }}>
        <header className="organizer-head">
          <div>
            <div className="section-eyebrow">Entity tax organizer</div>
            <h1 className="organizer-title">Tell us about your business entities.</h1>
            <div className="organizer-service">
              <Icon name="building-2" size={14} />
              <span>You're working on:</span>
              <strong>{active.name || (active.type ? active.type : "A new entity")}</strong>
            </div>
          </div>
          <a href="#other-services" className="organizer-other" onClick={(e) => { e.preventDefault(); if (onExit) onExit(); }}>
            Need a different service?
            <Icon name="arrow-up-right" size={14} />
          </a>
        </header>

        {/* Step rail */}
        <ol className="organizer-rail">
          {ENTITY_STEPS.map((s, i) => {
            const cls = i === step ? "active" : i < step ? "done" : "";
            return (
              <li key={s.id} className={"organizer-rail-item " + cls}>
                <span className="organizer-rail-num">{i < step ? <Icon name="check" size={12} /> : i + 1}</span>
                <span className="organizer-rail-label">{s.label}</span>
              </li>
            );
          })}
        </ol>

        <div className="organizer-card">
          {step === 0 && (
            <React.Fragment>
              <div className="organizer-body">
                {/* Record switcher */}
                <div className="entity-bar">
                  <div className="entity-bar-stat">
                    <span className="entity-bar-stat-label">Entities</span>
                    <span className="entity-bar-stat-value numeric">{entities.length}</span>
                  </div>
                  <div className="entity-bar-divider" />
                  <div className="entity-bar-stat">
                    <span className="entity-bar-stat-label">Incomplete</span>
                    <span className={"entity-bar-stat-value numeric" + (incompleteCount ? " warn" : "")}>{incompleteCount}</span>
                  </div>
                  <span style={{ flex: 1 }} />
                  <button type="button" className="btn btn-primary entity-add-list" onClick={addEntity}>
                    <Icon name="plus-circle" size={16} />
                    Add another entity
                  </button>
                </div>

                <div className="entity-switcher">
                  <button type="button" className="entity-nav-btn" disabled={activeIdx === 0} onClick={() => setActiveIdx(activeIdx - 1)}>
                    <Icon name="chevron-left" size={15} /> Previous
                  </button>
                  <div className="entity-select-wrap">
                    {!entityComplete(active) && <span className="entity-select-flag" title="Incomplete"><Icon name="alert-circle" size={15} /></span>}
                    <select className="entity-select" value={activeIdx} onChange={(e) => setActiveIdx(parseInt(e.target.value, 10))}>
                      {entities.map((e, i) => (
                        <option key={i} value={i}>
                          {`Entity ${i + 1}${e.name ? " — " + e.name : e.type ? " — " + e.type : ""}`}
                        </option>
                      ))}
                    </select>
                    <span className="entity-select-caret"><Icon name="chevron-down" size={15} /></span>
                  </div>
                  <button type="button" className="entity-delete-btn" onClick={deleteEntity}>
                    <Icon name="trash-2" size={14} /> Delete
                  </button>
                  <button type="button" className="entity-nav-btn" disabled={activeIdx === entities.length - 1} onClick={() => setActiveIdx(activeIdx + 1)}>
                    Next <Icon name="chevron-right" size={15} />
                  </button>
                </div>

                {/* Entity type */}
                <div className="entity-section">
                  <SelectField
                    label="Entity type"
                    hint="Determines the federal return we prepare."
                    value={active.type}
                    onChange={(v) => patch({ type: v })}
                    options={ENTITY_TYPES}
                    placeholder="Select entity type"
                  />
                  {typeForm && (
                    <div className="ownership-formhint" style={{ marginTop: 12 }}>
                      <span className="ownership-formhint-icon"><Icon name="file-text" size={14} /></span>
                      <span><strong>{typeForm}</strong>{isSMLLC ? " — a disregarded single-member LLC generally flows onto its owner's return; foreign-owned SMLLCs still file Form 5472." : " is the return this entity type generally files."}</span>
                    </div>
                  )}
                </div>

                {/* Entity info */}
                <EntitySectionHead title="Entity info" />
                <div className="entity-grid">
                  <TextField label="Entity name" full value={active.name} onChange={(v) => patch({ name: v })} placeholder="Legal name of the entity" />
                  <TextField label="Primary street address" full value={active.street} onChange={(v) => patch({ street: v })} placeholder="Street address" />
                  <TextField label="City" value={active.city} onChange={(v) => patch({ city: v })} />
                  <TextField label="State / province / county" value={active.stateProv} onChange={(v) => patch({ stateProv: v })} />
                  <TextField label="ZIP or postal code" value={active.zip} onChange={(v) => patch({ zip: v })} />
                  <SelectField label="Country" value={active.country} onChange={(v) => patch({ country: v })} options={COUNTRIES} placeholder="Select country" />
                </div>

                <div style={{ marginTop: 16 }}>
                  <YesNoInline
                    label="Is the entity's mailing address different from the primary street address entered above?"
                    value={active.mailingDifferent}
                    onChange={(v) => patch({ mailingDifferent: v })}
                  />
                  {active.mailingDifferent === "yes" && (
                    <div className="entity-grid" style={{ marginTop: 14 }}>
                      <TextField label="Mailing street address" full value={active.mailStreet} onChange={(v) => patch({ mailStreet: v })} />
                      <TextField label="City" value={active.mailCity} onChange={(v) => patch({ mailCity: v })} />
                      <TextField label="State / province / county" value={active.mailStateProv} onChange={(v) => patch({ mailStateProv: v })} />
                      <TextField label="ZIP or postal code" value={active.mailZip} onChange={(v) => patch({ mailZip: v })} />
                      <SelectField label="Country" value={active.mailCountry} onChange={(v) => patch({ mailCountry: v })} options={COUNTRIES} placeholder="Select country" />
                    </div>
                  )}
                </div>

                <div className="entity-grid" style={{ marginTop: 16 }}>
                  <DateField label="Date of incorporation / organization / formation" value={active.formationDate} onChange={(v) => patch({ formationDate: v })} />
                  <DateField label="Date of dissolution" hint="Leave blank if not dissolved" optional value={active.dissolutionDate} onChange={(v) => patch({ dissolutionDate: v })} />
                  <DateField label="End of tax year" hint="The day the entity's tax year ends" value={active.taxYearEnd} onChange={(v) => patch({ taxYearEnd: v })} />
                  <TextField label="Employer Identification Number (EIN)" hint="In format xx-xxxxxxx" value={active.ein} onChange={(v) => patch({ ein: v })} placeholder="00-0000000" />
                </div>

                {/* Ownership */}
                <EntitySectionHead title="Ownership" />
                {!active.type && <div className="entity-note">Select an entity type above and the ownership fields will match it.</div>}
                <div className="entity-subhead">Please provide details for <strong>all U.S. owners</strong> (including yourself) of the entity.</div>
                <OwnerTable columns={usOwnerCols} rows={active.usOwners} onChange={(r) => patch({ usOwners: r })} addLabel="Add a U.S. owner" />

                <div className="entity-subhead" style={{ marginTop: 22 }}>Please provide details about <strong>all non-U.S. owners</strong>.</div>
                <OwnerTable columns={nonUsOwnerCols} rows={active.nonUsOwners} onChange={(r) => patch({ nonUsOwners: r })} addLabel="Add a non-U.S. owner" />

                <div style={{ marginTop: 18 }}>
                  <YesNoInline
                    label="Does the entity own a share (interest) in a corporation, partnership, or other entity (whether U.S. or foreign)?"
                    value={active.ownsInterest}
                    onChange={(v) => patch({ ownsInterest: v })}
                  />
                </div>

                {/* Operations */}
                <EntitySectionHead title="Operations" />
                <div className="entity-grid">
                  <SelectField label="Which U.S. state is the entity registered in?" full value={active.opState} onChange={(v) => patch({ opState: v })} options={US_STATES} placeholder="Select state" />
                </div>
                <div className="entity-q-stack">
                  <YesNoInline
                    label="Does the entity do business in the U.S., or earn any U.S.-source income?"
                    value={active.usBusiness}
                    onChange={(v) => patch({ usBusiness: v })}
                  />
                  <YesNoInline
                    label="Does it operate in any country other than where it's registered?"
                    value={active.operatesAbroad}
                    onChange={(v) => patch({ operatesAbroad: v })}
                  />
                </div>
                <div className="entity-grid" style={{ marginTop: 16 }}>
                  <TextField label="Briefly, what does the business do?" full value={active.businessActivity} onChange={(v) => patch({ businessActivity: v })} placeholder="e.g. SaaS consulting, residential rentals, import/export" />
                </div>
                <div className="entity-grid" style={{ marginTop: 16, alignItems: "start" }}>
                  <AccountingPeriod value={active.accountingPeriod} onChange={(v) => patch({ accountingPeriod: v })} />
                  <SelectField label="Which accounting method does it use?" value={active.accountingMethod} onChange={(v) => patch({ accountingMethod: v })} options={ACCOUNTING_METHODS} placeholder="Select method" />
                </div>
                <div className="entity-q-stack">
                  <YesNoInline
                    label="Did the entity pay any U.S. contractors or vendors that might need a 1099?"
                    hint="For example, independent contractors you hired or dividends you paid."
                    value={active.payments1099}
                    onChange={(v) => patch({ payments1099: v })}
                  />
                  <YesNoInline
                    label="Are you the person responsible for filing this entity's return in its home country?"
                    value={active.responsibleFiler}
                    onChange={(v) => patch({ responsibleFiler: v })}
                  />
                  <YesNoInline
                    label={"Did the entity receive any digital assets as payment, a reward, or for property or services in " + filingYear + "?"}
                    hint="Bitcoin, Ethereum, or any other cryptocurrency."
                    value={active.digitalAssetReceived}
                    onChange={(v) => patch({ digitalAssetReceived: v })}
                  />
                  <YesNoInline
                    label={"Did the entity sell, trade, gift, or otherwise part with any digital assets in " + filingYear + "?"}
                    hint="Bitcoin, Ethereum, or any other cryptocurrency."
                    value={active.digitalAssetDisposed}
                    onChange={(v) => patch({ digitalAssetDisposed: v })}
                  />
                </div>

                {/* Financials */}
                <EntitySectionHead title="Financials" />
                <div className="entity-q-stack">
                  <YesNoInline
                    label={"Did you put cash or property into the entity during " + filingYear + "?"}
                    value={active.contributedCapital}
                    onChange={(v) => patch({ contributedCapital: v })}
                  />
                  <YesNoInline
                    label={"Did you take any dividends or distributions out of the entity during " + filingYear + "?"}
                    value={active.tookDistributions}
                    onChange={(v) => patch({ tookDistributions: v })}
                  />
                  <YesNoInline
                    label={"Did the entity earn any passive income in " + filingYear + "?"}
                    hint="Anything not from active operations — rent, interest, dividends, capital gains."
                    value={active.passiveIncome}
                    onChange={(v) => patch({ passiveIncome: v })}
                  />
                  <YesNoInline
                    label="Did the entity make any estimated or prepaid tax payments to the IRS or a state?"
                    value={active.taxPrepayments}
                    onChange={(v) => patch({ taxPrepayments: v })}
                    choices={YN3}
                  />
                  <YesNoInline
                    label="Anything we should know about the payments above?"
                    value={active.taxComment}
                    onChange={(v) => patch({ taxComment: v })}
                  />
                  {active.taxComment === "yes" && (
                    <textarea
                      className="rental-input entity-comment"
                      rows={3}
                      placeholder="Add any context for your CPA here…"
                      value={active.taxCommentText}
                      onChange={(e) => patch({ taxCommentText: e.target.value })}
                    />
                  )}
                </div>

                {/* Foreign accounts */}
                <EntitySectionHead title="Foreign accounts &amp; assets" />
                <div className="entity-q-stack">
                  <YesNoInline
                    label={"At any point in " + filingYear + ", did the entity hold any non-U.S. financial accounts or assets?"}
                    hint="A foreign bank account, or a stake in a non-U.S. company, for example."
                    value={active.ownsForeignAsset}
                    onChange={(v) => patch({ ownsForeignAsset: v })}
                  />
                </div>
              </div>

              <div className="organizer-foot">
                <span className="organizer-save"><Icon name="check-circle-2" size={13} /> Saved automatically</span>
                <button type="button" className="btn btn-primary organizer-next" onClick={() => setStep(1)}>
                  Continue to documents
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {step === 1 && (
            <React.Fragment>
              <div className="organizer-body">
                <EntityDocuments entity={active} patch={patch} />
              </div>
              <div className="organizer-foot">
                <button type="button" className="btn-back" onClick={() => setStep(0)}>
                  <Icon name="arrow-left" size={14} /> Previous step
                </button>
                <button type="button" className="btn btn-primary organizer-next" onClick={() => setStep(2)}>
                  Continue to refund
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {step === 2 && (
            <React.Fragment>
              <div className="organizer-body">
                <EntityRefund entity={active} patch={patch} />
              </div>
              <div className="organizer-foot">
                <button type="button" className="btn-back" onClick={() => setStep(1)}>
                  <Icon name="arrow-left" size={14} /> Previous step
                </button>
                <button type="button" className="btn btn-primary organizer-next" onClick={() => setStep(3)}>
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {step === 3 && (
            <React.Fragment>
              <div className="organizer-body">
                <EntityReview entities={entities} onJump={(i) => { setActiveIdx(i); setStep(0); }} />
              </div>
              <div className="organizer-foot">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>
                  <Icon name="arrow-left" size={14} /> Previous step
                </button>
                <button type="button" className="btn btn-primary organizer-next" onClick={() => { if (onExit) onExit(); }}>
                  Submit to my CPA
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export { EntityTaxOrganizer, ENTITY_TYPES, ENTITY_TYPE_FORM, PARTNERSHIP_TYPES, US_STATES, ENTITY_MONTHS, ENTITY_DAYS, ACCOUNTING_METHODS, ENTITY_PRIMARY_FORM, YN3, EntityField, TextField, DateField, SelectField, YesNoInline, EntitySectionHead, OwnerTable, AccountingPeriod, DocUpload, EntityDocuments, EntityReview, EntityRefund };

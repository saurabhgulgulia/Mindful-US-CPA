import React from 'react';
import { Icon } from './Icon.jsx';
import { YesNoRow } from './PersonalInfo.jsx';
import { MoneyInput } from './RentalOrganizer.jsx';

// ScheduleCOrganizer — under "I work for myself → yes".
// Maps IRS Schedule C (Form 1040), Profit or Loss From Business, into a
// tax-questionnaire. The client picks one of two paths:
//   A) "I'll enter my numbers" — full Schedule C line-item form
//   B) "I'm not sure which expenses to report" — upload bank statements and
//      our bookkeeping team reconstructs the return to maximise tax benefit.

// Schedule C Part II expense lines (line number + label + hint).
const SCHED_C_EXPENSES = [
  { k: "advertising",   line: "8",   label: "Advertising" },
  { k: "carTruck",      line: "9",   label: "Car & truck expenses", hint: "Mileage or actual vehicle costs." },
  { k: "commissions",   line: "10",  label: "Commissions & fees" },
  { k: "contractLabor", line: "11",  label: "Contract labor" },
  { k: "depletion",     line: "12",  label: "Depletion" },
  { k: "depreciation",  line: "13",  label: "Depreciation & §179", hint: "Section 179 expense deduction." },
  { k: "benefits",      line: "14",  label: "Employee benefit programs" },
  { k: "insurance",     line: "15",  label: "Insurance (other than health)" },
  { k: "interestMort",  line: "16a", label: "Interest — mortgage", hint: "Paid to banks, etc." },
  { k: "interestOther", line: "16b", label: "Interest — other" },
  { k: "legal",         line: "17",  label: "Legal & professional services" },
  { k: "office",        line: "18",  label: "Office expense" },
  { k: "pension",       line: "19",  label: "Pension & profit-sharing plans" },
  { k: "rentVehicle",   line: "20a", label: "Rent/lease — vehicles, machinery, equipment" },
  { k: "rentOther",     line: "20b", label: "Rent/lease — other business property" },
  { k: "repairs",       line: "21",  label: "Repairs & maintenance" },
  { k: "supplies",      line: "22",  label: "Supplies" },
  { k: "taxes",         line: "23",  label: "Taxes & licenses" },
  { k: "travel",        line: "24a", label: "Travel" },
  { k: "meals",         line: "24b", label: "Deductible meals" },
  { k: "utilities",     line: "25",  label: "Utilities" },
  { k: "wages",         line: "26",  label: "Wages", hint: "Less employment credits." },
  { k: "otherExp",      line: "27a", label: "Other expenses" },
];

function ScheduleCOrganizer({ value, onChange, filingYear }) {
  const v = value || {};
  const set = (patch) => onChange({ ...v, ...patch });
  const setExp = (k, money) => set({ expenses: { ...(v.expenses || {}), [k]: money } });
  const yr = filingYear || "the filing year";
  const files = v.files || [];
  const addFiles = (list) => set({ files: [...files, ...Array.from(list).map((f) => ({ name: f.name, size: f.size }))] });
  const removeFile = (i) => set({ files: files.filter((_, idx) => idx !== i) });

  return (
    <div className="sc-card">
      <div className="sc-header">
        <span className="sc-header-emoji" aria-hidden="true">🧰</span>
        <div>
          <h3>Self-employment — Schedule C</h3>
          <p>Profit or loss from your business (sole proprietor, freelancer, contractor). Choose how you'd like to give us the numbers.</p>
        </div>
      </div>

      {/* Path chooser */}
      <div className="sc-modes">
        <button type="button" className={"sc-mode" + (v.mode === "self" ? " active" : "")} onClick={() => set({ mode: "self" })}>
          <span className="sc-mode-icon"><Icon name="pencil" size={18} /></span>
          <span className="sc-mode-text">
            <strong>I'll enter my numbers</strong>
            <span>I know my income and expenses and want to fill in the Schedule C myself.</span>
          </span>
        </button>
        <button type="button" className={"sc-mode" + (v.mode === "bookkeeping" ? " active" : "")} onClick={() => set({ mode: "bookkeeping" })}>
          <span className="sc-mode-icon"><Icon name="folder-up" size={18} /></span>
          <span className="sc-mode-text">
            <strong>I'm not sure which expenses to report</strong>
            <span>Upload your bank statements — our bookkeeping team will account for every transaction to maximise your tax benefit.</span>
          </span>
        </button>
      </div>

      {/* PATH B — bookkeeping upload */}
      {v.mode === "bookkeeping" && (
        <div className="sc-upload-block">
          <div className="fa-currency-note" style={{ marginBottom: 16 }}>
            <span className="fa-currency-note-icon" aria-hidden="true"><Icon name="info" size={14} /></span>
            Upload bank and credit-card statements covering {yr}. Our bookkeeping team categorises every transaction and ensures all deductible expenses are captured — so your Schedule C is complete and your tax is minimised. You don't need to sort anything first.
          </div>
          <div className="dep-upload-field" style={{ marginTop: 0 }}>
            <span className="rental-field-label">Bank &amp; financial statements</span>
            <span className="rental-field-hint" style={{ marginBottom: 8 }}>
              All business (and mixed-use) accounts — bank, credit card, payment processors (PayPal, Stripe, etc.). PDF, CSV, or spreadsheet exports all work.
            </span>
            <div className="dep-upload" onClick={() => document.getElementById("sc-file").click()}>
              <input id="sc-file" type="file" multiple accept=".pdf,.csv,.xls,.xlsx,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
              <span className="dep-upload-icon"><Icon name="upload-cloud" size={22} /></span>
              <span className="dep-upload-text">
                <strong>Drop statements here or click to browse</strong>
                <span>PDF, CSV, XLS — add as many as you like</span>
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
          </div>
          <label className="rental-field full" style={{ marginTop: 16 }}>
            <span className="rental-field-label">Anything we should know? <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— optional</span></span>
            <textarea className="rental-input" rows={3} placeholder="e.g. account 1234 is personal, large March deposit was a loan, etc." value={v.bookkeepingNotes || ""} onChange={(e) => set({ bookkeepingNotes: e.target.value })} />
          </label>
        </div>
      )}

      {/* PATH A — self-entry Schedule C form */}
      {v.mode === "self" && (
        <div className="sc-form">
          {/* Business profile (A–J) */}
          <SCGroup title="Your business" line="A–J">
            <div className="rental-grid">
              <label className="rental-field full"><span className="rental-field-label">Principal business or profession <span className="sc-line">A</span></span>
                <input className="rental-input" type="text" placeholder="e.g. Software consulting, product or service" value={v.profession || ""} onChange={(e) => set({ profession: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Business name <span className="sc-line">C</span></span>
                <input className="rental-input" type="text" placeholder="Leave blank if none" value={v.bizName || ""} onChange={(e) => set({ bizName: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Employer ID number (EIN) <span className="sc-line">D</span></span>
                <input className="rental-input" type="text" placeholder="If you have one" value={v.ein || ""} onChange={(e) => set({ ein: e.target.value })} /></label>
              <label className="rental-field full"><span className="rental-field-label">Business address <span className="sc-line">E</span></span>
                <input className="rental-input" type="text" placeholder="Street, city, state, ZIP" value={v.bizAddress || ""} onChange={(e) => set({ bizAddress: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Accounting method <span className="sc-line">F</span></span>
                <select className="rental-input" value={v.accountingMethod || ""} onChange={(e) => set({ accountingMethod: e.target.value })}>
                  <option value="">— Select —</option>
                  <option>Cash</option>
                  <option>Accrual</option>
                  <option>Other</option>
                </select></label>
            </div>
            <div className="sc-yesno-list">
              <YesNoRow label="Did you materially participate in this business this year?" hint="Schedule C line G. If no, loss deductions may be limited." value={v.materialPart} onChange={(x) => set({ materialPart: x })} />
              <YesNoRow label={`Did you start or acquire this business in ${yr}?`} hint="Schedule C line H." value={v.startedThisYear} onChange={(x) => set({ startedThisYear: x })} />
              <YesNoRow label="Did you make any payments requiring you to file Form(s) 1099?" hint="Schedule C line I — e.g. paid a contractor $600+." value={v.made1099Payments} onChange={(x) => set({ made1099Payments: x })} />
              {v.made1099Payments === "yes" && (
                <YesNoRow label="Did you (or will you) file the required Form(s) 1099?" hint="Schedule C line J." value={v.filed1099} onChange={(x) => set({ filed1099: x })} />
              )}
            </div>
          </SCGroup>

          {/* Part I — Income */}
          <SCGroup title="Income" line="Part I">
            <div className="sc-money-grid">
              <SCMoney label="Gross receipts or sales" line="1" value={v.grossReceipts} onChange={(m) => set({ grossReceipts: m })} />
              <SCMoney label="Returns & allowances" line="2" value={v.returns} onChange={(m) => set({ returns: m })} />
              <SCMoney label="Other income" line="6" hint="Incl. fuel tax credit / refund." value={v.otherIncome} onChange={(m) => set({ otherIncome: m })} />
            </div>
          </SCGroup>

          {/* Part II — Expenses */}
          <SCGroup title="Expenses" line="Part II" subtitle="Enter what applies — leave the rest blank. Not sure about something? Switch to the upload option above and our team will handle it.">
            <div className="sc-money-grid">
              {SCHED_C_EXPENSES.map((e) => (
                <SCMoney key={e.k} label={e.label} line={e.line} hint={e.hint} value={(v.expenses || {})[e.k]} onChange={(m) => setExp(e.k, m)} />
              ))}
            </div>
          </SCGroup>

          {/* Home office */}
          <SCGroup title="Home office" line="30" subtitle="Business use of your home (simplified or actual). Skip if you don't work from home.">
            <div className="rental-grid">
              <label className="rental-field"><span className="rental-field-label">Total home square footage</span>
                <input className="rental-input" type="text" inputMode="numeric" placeholder="e.g. 1,200" value={v.homeSqft || ""} onChange={(e) => set({ homeSqft: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Square footage used for business</span>
                <input className="rental-input" type="text" inputMode="numeric" placeholder="e.g. 200" value={v.homeOfficeSqft || ""} onChange={(e) => set({ homeOfficeSqft: e.target.value })} /></label>
            </div>
          </SCGroup>

          {/* Inventory / COGS gate */}
          <div className="sc-gate">
            <YesNoRow label="Do you carry inventory or sell physical products?" hint="If yes, we'll collect cost of goods sold (Schedule C Part III)." value={v.hasInventory} onChange={(x) => set({ hasInventory: x })} />
          </div>
          {v.hasInventory === "yes" && (
            <SCGroup title="Cost of goods sold" line="Part III">
              <div className="sc-money-grid">
                <SCMoney label="Inventory at beginning of year" line="35" value={v.invBegin} onChange={(m) => set({ invBegin: m })} />
                <SCMoney label="Purchases (less personal use)" line="36" value={v.purchases} onChange={(m) => set({ purchases: m })} />
                <SCMoney label="Cost of labor" line="37" hint="Exclude amounts paid to yourself." value={v.costLabor} onChange={(m) => set({ costLabor: m })} />
                <SCMoney label="Materials & supplies" line="38" value={v.materials} onChange={(m) => set({ materials: m })} />
                <SCMoney label="Other costs" line="39" value={v.otherCosts} onChange={(m) => set({ otherCosts: m })} />
                <SCMoney label="Inventory at end of year" line="41" value={v.invEnd} onChange={(m) => set({ invEnd: m })} />
              </div>
            </SCGroup>
          )}

          {/* Vehicle gate (Part IV) */}
          <div className="sc-gate">
            <YesNoRow label="Are you claiming car or truck expenses (line 9)?" hint="If yes, we need vehicle details (Schedule C Part IV)." value={v.hasVehicle} onChange={(x) => set({ hasVehicle: x })} />
          </div>
          {v.hasVehicle === "yes" && (
            <SCGroup title="Vehicle information" line="Part IV">
              <div className="rental-grid">
                <label className="rental-field"><span className="rental-field-label">Date placed in service <span className="sc-line">43</span></span>
                  <input className="rental-input" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" maxLength={10} value={v.vehInService || ""} onChange={(e) => set({ vehInService: e.target.value })} /></label>
                <label className="rental-field"><span className="rental-field-label">Business miles <span className="sc-line">44a</span></span>
                  <input className="rental-input" type="text" inputMode="numeric" placeholder="0" value={v.milesBiz || ""} onChange={(e) => set({ milesBiz: e.target.value })} /></label>
                <label className="rental-field"><span className="rental-field-label">Commuting miles <span className="sc-line">44b</span></span>
                  <input className="rental-input" type="text" inputMode="numeric" placeholder="0" value={v.milesCommute || ""} onChange={(e) => set({ milesCommute: e.target.value })} /></label>
                <label className="rental-field"><span className="rental-field-label">Other miles <span className="sc-line">44c</span></span>
                  <input className="rental-input" type="text" inputMode="numeric" placeholder="0" value={v.milesOther || ""} onChange={(e) => set({ milesOther: e.target.value })} /></label>
              </div>
              <div className="sc-yesno-list">
                <YesNoRow label="Was the vehicle available for personal use off-duty?" value={v.vehPersonal} onChange={(x) => set({ vehPersonal: x })} />
                <YesNoRow label="Do you (or your spouse) have another vehicle for personal use?" value={v.anotherVehicle} onChange={(x) => set({ anotherVehicle: x })} />
                <YesNoRow label="Do you have written evidence to support the deduction?" value={v.vehEvidence} onChange={(x) => set({ vehEvidence: x })} />
              </div>
            </SCGroup>
          )}

          {/* Supporting docs always available */}
          <SCGroup title="Supporting documents" subtitle="Attach 1099-NEC/K, P&L, receipts — anything that supports these figures. Optional.">
            <div className="dep-upload" onClick={() => document.getElementById("sc-file2").click()}>
              <input id="sc-file2" type="file" multiple accept=".pdf,.csv,.xls,.xlsx,.jpg,.jpeg,.png,.doc,.docx" style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
              <span className="dep-upload-icon"><Icon name="upload-cloud" size={22} /></span>
              <span className="dep-upload-text">
                <strong>Attach documents</strong>
                <span>PDF, CSV, XLS, JPG, PNG, DOC</span>
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
          </SCGroup>
        </div>
      )}
    </div>
  );
}

// SCGroup — titled section with an optional Schedule-C line tag.
function SCGroup({ title, line, subtitle, children }) {
  return (
    <div className="sc-group">
      <div className="sc-group-head">
        <h4>{title}{line && <span className="sc-group-line">{line}</span>}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// SCMoney — one Schedule-C money line: label + line number + MoneyInput.
function SCMoney({ label, line, hint, value, onChange }) {
  return (
    <label className="sc-money-field">
      <span className="rental-field-label">{label}{line && <span className="sc-line">{line}</span>}</span>
      {hint && <span className="rental-field-hint" style={{ marginBottom: 6 }}>{hint}</span>}
      <MoneyInput value={value} onChange={onChange} placeholder="0" />
    </label>
  );
}

export { ScheduleCOrganizer };

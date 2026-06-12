import React from 'react';
import { Icon } from './Icon.jsx';
import { MoneyInput } from './RentalOrganizer.jsx';

// ItemizedDeductionsOrganizer — under "I'd like to look at itemizing → yes".
// Maps IRS Schedule A (Form 1040), Itemized Deductions, 2025. Every head gets
// amount box(es) plus a supporting-document dropbox. Home mortgage interest has
// a dedicated Form 1098 upload. All helpers are local (Babel scripts don't share
// scope) so this file is self-contained.

function ItemizedDeductionsOrganizer({ value, onChange }) {
  const v = value || {};
  const set = (patch) => onChange({ ...v, ...patch });
  const docs = v.docs || {};
  const setDocs = (key, list) => set({ docs: { ...docs, [key]: list } });

  return (
    <div className="sc-card id-card">
      <div className="sc-header">
        <span className="sc-header-emoji" aria-hidden="true">🧾</span>
        <div>
          <h3>Itemized deductions — Schedule A</h3>
          <p>Enter the amounts you have for each category below and attach what supports them. We compare your itemized total against the standard deduction and use whichever saves you more — you don't have to decide.</p>
        </div>
      </div>

      {/* Medical & Dental */}
      <IDGroup title="Medical &amp; dental expenses" line="1"
        subtitle="Out-of-pocket medical, dental, and qualifying insurance. Don't include anything reimbursed by insurance or paid by others — we apply the 7.5% income threshold for you.">
        <div className="sc-money-grid">
          <IDMoney label="Total medical &amp; dental expenses" line="1" value={v.medical} onChange={(m) => set({ medical: m })} />
        </div>
        <IDUpload label="Receipts / statements" hint="Medical bills, insurance premium statements, pharmacy records." files={docs.medical} onChange={(l) => setDocs("medical", l)} idAttr="id-up-medical" />
      </IDGroup>

      {/* Taxes you paid (SALT) */}
      <IDGroup title="Taxes you paid (SALT)" line="5–6"
        subtitle="State & local taxes. The deduction is capped at $40,000 ($20,000 if married filing separately) — we apply the cap.">
        <div className="sc-money-grid">
          <IDMoney label="State &amp; local income taxes" line="5a" hint="Or general sales taxes — see toggle below." value={v.saltIncome} onChange={(m) => set({ saltIncome: m })} />
          <IDMoney label="Real estate taxes" line="5b" value={v.saltRealEstate} onChange={(m) => set({ saltRealEstate: m })} />
          <IDMoney label="Personal property taxes" line="5c" value={v.saltPersonalProp} onChange={(m) => set({ saltPersonalProp: m })} />
          <IDMoney label="Other taxes" line="6" hint="List type when you upload." value={v.otherTaxes} onChange={(m) => set({ otherTaxes: m })} />
        </div>
        <label className="id-check">
          <input type="checkbox" checked={!!v.electSalesTax} onChange={(e) => set({ electSalesTax: e.target.checked })} />
          <span>Elect to deduct general <strong>sales taxes</strong> instead of state &amp; local income taxes (line 5a)</span>
        </label>
        <IDUpload label="Supporting documents" hint="W-2 / 1099 withholding, property-tax bills, vehicle registration, sales-tax records." files={docs.salt} onChange={(l) => setDocs("salt", l)} idAttr="id-up-salt" />
      </IDGroup>

      {/* Interest you paid */}
      <IDGroup title="Interest you paid" line="8–9"
        subtitle="Home mortgage interest, points, and investment interest.">
        <div className="sc-money-grid">
          <IDMoney label="Home mortgage interest &amp; points reported on Form 1098" line="8a" value={v.mortgage1098} onChange={(m) => set({ mortgage1098: m })} />
          <IDMoney label="Home mortgage interest NOT on Form 1098" line="8b" hint="Provide payee name, ID & address when you upload." value={v.mortgageNo1098} onChange={(m) => set({ mortgageNo1098: m })} />
          <IDMoney label="Points not reported on Form 1098" line="8c" value={v.points} onChange={(m) => set({ points: m })} />
          <IDMoney label="Investment interest" line="9" hint="Form 4952 if required." value={v.investmentInterest} onChange={(m) => set({ investmentInterest: m })} />
        </div>
        <IDUpload label="Form 1098 — Mortgage Interest Statement" hint="Upload the Form 1098 your lender sent for each mortgage. This is the primary support for your mortgage-interest deduction." files={docs.form1098} onChange={(l) => setDocs("form1098", l)} idAttr="id-up-1098" featured />
        <IDUpload label="Other interest documents" hint="Closing statements for points, year-end loan statements, brokerage margin-interest summaries." files={docs.interest} onChange={(l) => setDocs("interest", l)} idAttr="id-up-interest" />
      </IDGroup>

      {/* Gifts to charity */}
      <IDGroup title="Gifts to charity" line="11–13"
        subtitle="Cash and non-cash donations to qualified organizations.">
        <div className="sc-money-grid">
          <IDMoney label="Gifts by cash or check" line="11" value={v.giftsCash} onChange={(m) => set({ giftsCash: m })} />
          <IDMoney label="Gifts other than cash or check" line="12" hint="Form 8283 required if over $500." value={v.giftsNonCash} onChange={(m) => set({ giftsNonCash: m })} />
          <IDMoney label="Carryover from prior year" line="13" value={v.giftsCarryover} onChange={(m) => set({ giftsCarryover: m })} />
        </div>
        <IDUpload label="Donation records" hint="Acknowledgement letters, receipts, and appraisals for gifts of $250+ / non-cash gifts." files={docs.charity} onChange={(l) => setDocs("charity", l)} idAttr="id-up-charity" />
      </IDGroup>

      {/* Casualty & theft */}
      <IDGroup title="Casualty &amp; theft losses" line="15"
        subtitle="Losses from a federally declared disaster only. Attach Form 4684.">
        <div className="sc-money-grid">
          <IDMoney label="Casualty &amp; theft loss" line="15" value={v.casualty} onChange={(m) => set({ casualty: m })} />
        </div>
        <IDUpload label="Loss documentation" hint="Insurance claims, FEMA disaster declaration, repair estimates, Form 4684." files={docs.casualty} onChange={(l) => setDocs("casualty", l)} idAttr="id-up-casualty" />
      </IDGroup>

      {/* Other itemized */}
      <IDGroup title="Other itemized deductions" line="16"
        subtitle="From the IRS list — e.g. gambling losses, certain unrecovered investments, estate tax on income in respect of a decedent.">
        <div className="sc-money-grid">
          <IDMoney label="Other deductions" line="16" hint="Tell us the type when you upload." value={v.otherDeductions} onChange={(m) => set({ otherDeductions: m })} />
        </div>
        <IDUpload label="Supporting documents" files={docs.other} onChange={(l) => setDocs("other", l)} idAttr="id-up-other" />
      </IDGroup>
    </div>
  );
}

// IDGroup — titled Schedule-A head with a line-number tag.
function IDGroup({ title, line, subtitle, children }) {
  return (
    <div className="sc-group">
      <div className="sc-group-head">
        <h4><span dangerouslySetInnerHTML={{ __html: title }} />{line && <span className="sc-group-line">Line {line}</span>}</h4>
        {subtitle && <p dangerouslySetInnerHTML={{ __html: subtitle }} />}
      </div>
      {children}
    </div>
  );
}

// IDMoney — one Schedule-A money line.
function IDMoney({ label, line, hint, value, onChange }) {
  return (
    <label className="sc-money-field">
      <span className="rental-field-label"><span dangerouslySetInnerHTML={{ __html: label }} />{line && <span className="sc-line">{line}</span>}</span>
      {hint && <span className="rental-field-hint" style={{ marginBottom: 6 }}>{hint}</span>}
      <MoneyInput value={value} onChange={onChange} placeholder="0" />
    </label>
  );
}

// IDUpload — a labelled dropbox + file list for one category.
function IDUpload({ label, hint, files, onChange, idAttr, featured }) {
  const list = files || [];
  const add = (fl) => onChange([...list, ...Array.from(fl).map((f) => ({ name: f.name, size: f.size }))]);
  const remove = (i) => onChange(list.filter((_, idx) => idx !== i));
  return (
    <div className={"id-upload" + (featured ? " id-upload-featured" : "")}>
      <span className="id-upload-label">{featured && <Icon name="file-text" size={14} />}{label}</span>
      {hint && <span className="rental-field-hint" style={{ marginBottom: 8 }}>{hint}</span>}
      <div className="dep-upload" onClick={() => document.getElementById(idAttr).click()}>
        <input id={idAttr} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.csv,.xls,.xlsx,.doc,.docx" style={{ display: "none" }} onChange={(e) => add(e.target.files)} />
        <span className="dep-upload-icon"><Icon name="upload-cloud" size={20} /></span>
        <span className="dep-upload-text">
          <strong>Attach documents</strong>
          <span>Click to browse — PDF, JPG, PNG, CSV, XLS, DOC</span>
        </span>
      </div>
      {list.length > 0 && (
        <div className="file-list" style={{ marginTop: 10 }}>
          {list.map((f, i) => (
            <div key={i} className="file-row">
              <span className="file-check"><Icon name="check" size={14} /></span>
              <span className="file-name">{f.name}</span>
              <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
              <button type="button" className="file-remove" onClick={() => remove(i)} aria-label="Remove"><Icon name="x" size={14} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { ItemizedDeductionsOrganizer };

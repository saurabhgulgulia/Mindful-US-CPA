import React from 'react';
import { Icon } from './Icon.jsx';
import { YesNoRow } from './PersonalInfo.jsx';
import { MoneyInput } from './RentalOrganizer.jsx';

// HomeSaleOrganizer — under "I sold a home this year → yes".
// Captures each property sold so we can apply the §121 exclusion and figure any
// capital gain (Form 8949 / Schedule D). Repeatable; values in original currency.

const emptyHomeSale = (i) => ({
  label: `Property ${i + 1}`,
  address: "", type: "", dateAcquired: "", dateSold: "",
  salesPrice: { amount: "", currency: "USD", rateBasis: "" },
  sellingExpenses: { amount: "", currency: "USD", rateBasis: "" },
  cost: { amount: "", currency: "USD", rateBasis: "" },
  improvements: { amount: "", currency: "USD", rateBasis: "" },
  depreciation: { amount: "", currency: "USD", rateBasis: "" },
  mainHome2of5: "", priorExclusion: "", received1099S: "",
  files: [],
});

function HomeSaleOrganizer({ value, onChange, filingYear }) {
  const list = value && value.length ? value : [emptyHomeSale(0)];
  const [active, setActive] = React.useState(0);
  const yr = filingYear || "the filing year";
  const a = list[Math.min(active, list.length - 1)];
  const update = (patch) => onChange(list.map((it, i) => (i === active ? { ...it, ...patch } : it)));
  const add = () => { const n = [...list, emptyHomeSale(list.length)]; onChange(n); setActive(n.length - 1); };
  const remove = (i) => {
    const n = list.filter((_, idx) => idx !== i).map((it, idx) => ({ ...it, label: `Property ${idx + 1}` }));
    onChange(n.length ? n : [emptyHomeSale(0)]);
    setActive((cur) => Math.max(0, Math.min(cur, (n.length || 1) - 1)));
  };
  const files = a.files || [];
  const addFiles = (fl) => update({ files: [...files, ...Array.from(fl).map((f) => ({ name: f.name, size: f.size }))] });
  const removeFile = (i) => update({ files: files.filter((_, idx) => idx !== i) });

  return (
    <div className="sc-card hs-card">
      <div className="sc-header">
        <span className="sc-header-emoji" aria-hidden="true">🏠</span>
        <div>
          <h3>Home sale</h3>
          <p>For each property you sold in {yr}, give us the numbers below. We work out whether the §121 exclusion applies and report any taxable gain on Form 8949 / Schedule D.</p>
        </div>
      </div>

      <div className="rental-tabs">
        {list.map((it, i) => (
          <button key={i} type="button" className={"rental-tab" + (active === i ? " active" : "")} onClick={() => setActive(i)}>
            <span>{(it.address || "").trim() ? it.address.slice(0, 22) : it.label}</span>
            {list.length > 1 && (
              <span role="button" tabIndex={0} className="rental-tab-remove" aria-label="Remove"
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); remove(i); } }}>
                <Icon name="x" size={12} />
              </span>
            )}
          </button>
        ))}
        <button type="button" className="rental-tab-add" onClick={add}><Icon name="plus" size={14} /> Add another property</button>
      </div>

      {/* Property details */}
      <div className="sc-group" style={{ marginTop: 4, paddingTop: 0, borderTop: "none" }}>
        <div className="rental-grid">
          <label className="rental-field full"><span className="rental-field-label">Property address</span>
            <input className="rental-input" type="text" placeholder="Street, city, state/region, country" value={a.address} onChange={(e) => update({ address: e.target.value })} /></label>
          <label className="rental-field"><span className="rental-field-label">Property type</span>
            <select className="rental-input" value={a.type} onChange={(e) => update({ type: e.target.value })}>
              <option value="">— Select —</option>
              <option>Primary residence</option>
              <option>Second / vacation home</option>
              <option>Investment property</option>
              <option>Rental property</option>
            </select></label>
          <label className="rental-field"><span className="rental-field-label">Date acquired</span>
            <input className="rental-input" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" maxLength={10} value={a.dateAcquired} onChange={(e) => update({ dateAcquired: e.target.value })} /></label>
          <label className="rental-field"><span className="rental-field-label">Date sold</span>
            <input className="rental-input" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" maxLength={10} value={a.dateSold} onChange={(e) => update({ dateSold: e.target.value })} /></label>
        </div>
      </div>

      {/* Sale figures */}
      <div className="sc-group">
        <div className="sc-group-head"><h4>Sale figures</h4>
          <p>Enter the gross numbers — we net them out and apply any exclusion.</p></div>
        <div className="sc-money-grid">
          <label className="sc-money-field"><span className="rental-field-label">Sales price <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— gross proceeds (Form 1099-S)</span></span>
            <MoneyInput value={a.salesPrice} onChange={(m) => update({ salesPrice: m })} placeholder="0" /></label>
          <label className="sc-money-field"><span className="rental-field-label">Selling expenses <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— commissions, closing costs</span></span>
            <MoneyInput value={a.sellingExpenses} onChange={(m) => update({ sellingExpenses: m })} placeholder="0" /></label>
          <label className="sc-money-field"><span className="rental-field-label">Original purchase cost / basis</span>
            <MoneyInput value={a.cost} onChange={(m) => update({ cost: m })} placeholder="0" /></label>
          <label className="sc-money-field"><span className="rental-field-label">Cost of improvements <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— capital improvements</span></span>
            <MoneyInput value={a.improvements} onChange={(m) => update({ improvements: m })} placeholder="0" /></label>
          {(a.type === "Rental property" || a.type === "Investment property") && (
            <label className="sc-money-field"><span className="rental-field-label">Depreciation previously claimed</span>
              <MoneyInput value={a.depreciation} onChange={(m) => update({ depreciation: m })} placeholder="0" /></label>
          )}
        </div>
      </div>

      {/* §121 eligibility */}
      <div className="sc-group">
        <div className="sc-group-head"><h4>Main-home exclusion (§121)</h4>
          <p>These tell us whether you can exclude up to $250,000 of gain ($500,000 if married filing jointly).</p></div>
        <div className="sc-yesno-list">
          <YesNoRow label="Did you own AND use this home as your main home for at least 2 of the last 5 years?" value={a.mainHome2of5} onChange={(x) => update({ mainHome2of5: x })} />
          <YesNoRow label="Did you exclude gain from the sale of another main home in the 2 years before this sale?" value={a.priorExclusion} onChange={(x) => update({ priorExclusion: x })} />
          <YesNoRow label="Did you receive a Form 1099-S for this sale?" value={a.received1099S} onChange={(x) => update({ received1099S: x })} />
        </div>
      </div>

      {/* Supporting documents */}
      <div className="sc-group">
        <div className="sc-group-head"><h4>Supporting documents</h4>
          <p>Closing / settlement statement (Closing Disclosure or HUD-1), Form 1099-S, original purchase documents, and improvement receipts.</p></div>
        <div className="dep-upload" onClick={() => document.getElementById("hs-file").click()}>
          <input id="hs-file" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.csv,.xls,.xlsx,.doc,.docx" style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />
          <span className="dep-upload-icon"><Icon name="upload-cloud" size={20} /></span>
          <span className="dep-upload-text">
            <strong>Attach documents</strong>
            <span>Closing statement, 1099-S, purchase & improvement records</span>
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
    </div>
  );
}

export { HomeSaleOrganizer };

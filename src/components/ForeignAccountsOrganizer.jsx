import React from 'react';
import { Icon } from './Icon.jsx';
import { YesNoRow } from './PersonalInfo.jsx';
import { MoneyInput } from './RentalOrganizer.jsx';

// ForeignAccountsOrganizer — under "I have accounts outside the US → yes".
// Mirrors the firm's FBAR / FATCA questionnaire (FinCEN 114 + Form 8938):
//   1. Accounts you OWN
//   2. Accounts you have SIGNATURE AUTHORITY over (don't own)
//   3. Other financial assets
// All monetary values are captured in the account's ORIGINAL currency.

const FA_ACCT_TYPES = [
  "Bank", "Securities / Demat", "Fixed Deposit", "PPF",
  "Post Office Savings A/C", "Insurance", "Other",
];

const emptyOwned = (i) => ({
  label: `Account ${i + 1}`,
  maxValue: { amount: "", currency: "INR", rateBasis: "" },
  bank: "", address: "", type: "", typeOther: "", acctNo: "",
  jointlyHeld: "", jointTIN: "", jointName: "", jointAddress: "",
});
const emptySig = (i) => ({
  label: `Account ${i + 1}`,
  maxValue: { amount: "", currency: "INR", rateBasis: "" },
  bank: "", address: "", type: "", typeOther: "", acctNo: "", holderName: "",
});
const emptyAsset = (i) => ({
  label: `Asset ${i + 1}`,
  description: "", idNumber: "", dateAcquired: "", dateDisposed: "",
  income: { amount: "", currency: "INR", rateBasis: "" },
  maxValue: { amount: "", currency: "INR", rateBasis: "" },
});

function ForeignAccountsOrganizer({ value, onChange }) {
  const v = value || {};
  const set = (patch) => onChange({ ...v, ...patch });

  const owned = v.owned && v.owned.length ? v.owned : [emptyOwned(0)];
  const sig = v.signature && v.signature.length ? v.signature : [emptySig(0)];
  const assets = v.assets && v.assets.length ? v.assets : [emptyAsset(0)];

  return (
    <div className="fa-card">
      <div className="fa-header">
        <span className="fa-header-emoji" aria-hidden="true">🌍</span>
        <div>
          <h3>Foreign bank accounts &amp; financial assets</h3>
          <p>This feeds your FBAR (FinCEN 114) and Form 8938 — we handle the filing. Enter every value in the account's <strong>original currency</strong> (e.g. INR), exactly as your statement shows it.</p>
        </div>
      </div>

      <div className="fa-currency-note">
        <span className="fa-currency-note-icon" aria-hidden="true"><Icon name="info" size={14} /></span>
        Report all amounts in the original currency type — for example INR. We convert to USD at the IRS year-end rate for you.
      </div>

      {/* 1. Accounts you own */}
      <FASection
        title="Accounts you own"
        subtitle="Bank, securities/demat, fixed deposit, PPF, post-office savings, insurance, and similar accounts held in your name."
        list={owned}
        emptyItem={emptyOwned}
        labelKey="bank"
        addLabel="Add another account"
        onChange={(next) => set({ owned: next })}
        renderItem={(a, update) => (
          <React.Fragment>
            <div className="rental-grid">
              <label className="rental-field"><span className="rental-field-label">Maximum value during the year</span>
                <MoneyInput value={a.maxValue} onChange={(x) => update({ maxValue: x })} placeholder="0" /></label>
              <label className="rental-field"><span className="rental-field-label">Name of bank / financial institution</span>
                <input className="rental-input" type="text" placeholder="e.g. State Bank of India" value={a.bank} onChange={(e) => update({ bank: e.target.value })} /></label>
              <FAAcctType value={a.type} other={a.typeOther} onType={(t) => update({ type: t })} onOther={(o) => update({ typeOther: o })} />
              <label className="rental-field"><span className="rental-field-label">Account number</span>
                <input className="rental-input" type="text" placeholder="Full account / IBAN number" value={a.acctNo} onChange={(e) => update({ acctNo: e.target.value })} /></label>
              <label className="rental-field full"><span className="rental-field-label">Address of financial institution <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— including postal &amp; country code</span></span>
                <input className="rental-input" type="text" placeholder="Branch address, city, postal code, country" value={a.address} onChange={(e) => update({ address: e.target.value })} /></label>
              <label className="rental-field full"><span className="rental-field-label">Jointly held with <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— name &amp; relationship, if joint</span></span>
                <input className="rental-input" type="text" placeholder="e.g. Priya Sharma (spouse)" value={a.jointlyHeld} onChange={(e) => update({ jointlyHeld: e.target.value })} /></label>
            </div>
            {a.jointlyHeld.trim() && (
              <div className="fa-subblock">
                <div className="fa-subblock-label">Principal joint owner information</div>
                <div className="rental-grid">
                  <label className="rental-field"><span className="rental-field-label">Taxpayer identification number</span>
                    <input className="rental-input" type="text" placeholder="TIN / SSN / ITIN" value={a.jointTIN} onChange={(e) => update({ jointTIN: e.target.value })} /></label>
                  <label className="rental-field"><span className="rental-field-label">Name</span>
                    <input className="rental-input" type="text" placeholder="Full legal name" value={a.jointName} onChange={(e) => update({ jointName: e.target.value })} /></label>
                  <label className="rental-field full"><span className="rental-field-label">Address</span>
                    <input className="rental-input" type="text" placeholder="Mailing address" value={a.jointAddress} onChange={(e) => update({ jointAddress: e.target.value })} /></label>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      />

      {/* 2. Signature-authority accounts */}
      <div className="fa-gate">
        <YesNoRow
          label="Do you have accounts you do NOT own but have signature authority over?"
          hint="For example, a company or partnership account you can sign on."
          value={v.hasSignature} onChange={(x) => set({ hasSignature: x })} />
      </div>
      {v.hasSignature === "yes" && (
        <FASection
          title="Accounts with signature authority"
          subtitle="Accounts you can sign on but don't own — e.g. a company or partnership account."
          list={sig}
          emptyItem={emptySig}
          labelKey="bank"
          addLabel="Add another account"
          onChange={(next) => set({ signature: next })}
          renderItem={(a, update) => (
            <div className="rental-grid">
              <label className="rental-field"><span className="rental-field-label">Maximum value during the year</span>
                <MoneyInput value={a.maxValue} onChange={(x) => update({ maxValue: x })} placeholder="0" /></label>
              <label className="rental-field"><span className="rental-field-label">Name of bank / financial institution</span>
                <input className="rental-input" type="text" placeholder="Institution name" value={a.bank} onChange={(e) => update({ bank: e.target.value })} /></label>
              <FAAcctType value={a.type} other={a.typeOther} onType={(t) => update({ type: t })} onOther={(o) => update({ typeOther: o })} />
              <label className="rental-field"><span className="rental-field-label">Account number</span>
                <input className="rental-input" type="text" placeholder="Full account number" value={a.acctNo} onChange={(e) => update({ acctNo: e.target.value })} /></label>
              <label className="rental-field full"><span className="rental-field-label">Address of financial institution <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— including postal &amp; country code</span></span>
                <input className="rental-input" type="text" placeholder="Branch address, city, postal code, country" value={a.address} onChange={(e) => update({ address: e.target.value })} /></label>
              <label className="rental-field full"><span className="rental-field-label">Account holder name</span>
                <input className="rental-input" type="text" placeholder="Company / partnership / owner name" value={a.holderName} onChange={(e) => update({ holderName: e.target.value })} /></label>
            </div>
          )}
        />
      )}

      {/* 3. Other financial assets */}
      <div className="fa-gate">
        <YesNoRow
          label="Do you hold any other foreign financial assets?"
          hint="Foreign stock, partnership interests, foreign mutual funds, contracts, or other instruments not held in an account above."
          value={v.hasAssets} onChange={(x) => set({ hasAssets: x })} />
      </div>
      {v.hasAssets === "yes" && (
        <FASection
          title="Other financial assets"
          subtitle="Each asset's identifying details, any acquisition / disposal this year, income, and its maximum value."
          list={assets}
          emptyItem={emptyAsset}
          labelKey="description"
          addLabel="Add another asset"
          onChange={(next) => set({ assets: next })}
          renderItem={(a, update) => (
            <div className="rental-grid">
              <label className="rental-field full"><span className="rental-field-label">Description of asset</span>
                <input className="rental-input" type="text" placeholder="e.g. Shares in Infosys Ltd" value={a.description} onChange={(e) => update({ description: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Identifying number or designation</span>
                <input className="rental-input" type="text" placeholder="ID / reference number" value={a.idNumber} onChange={(e) => update({ idNumber: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Date acquired this year <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— if applicable</span></span>
                <input className="rental-input" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" maxLength={10} value={a.dateAcquired} onChange={(e) => update({ dateAcquired: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Date disposed this year <span className="rental-field-hint" style={{ display: "inline", fontWeight: 400 }}>— if applicable</span></span>
                <input className="rental-input" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" maxLength={10} value={a.dateDisposed} onChange={(e) => update({ dateDisposed: e.target.value })} /></label>
              <label className="rental-field"><span className="rental-field-label">Income from this asset</span>
                <MoneyInput value={a.income} onChange={(x) => update({ income: x })} placeholder="0" /></label>
              <label className="rental-field"><span className="rental-field-label">Maximum value during the year</span>
                <MoneyInput value={a.maxValue} onChange={(x) => update({ maxValue: x })} placeholder="0" /></label>
            </div>
          )}
        />
      )}
    </div>
  );
}

// FAAcctType — account-type select with conditional "if other, describe" field.
function FAAcctType({ value, other, onType, onOther }) {
  return (
    <React.Fragment>
      <label className="rental-field"><span className="rental-field-label">Account type</span>
        <select className="rental-input" value={value} onChange={(e) => onType(e.target.value)}>
          <option value="">— Select —</option>
          {FA_ACCT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select></label>
      {value === "Other" && (
        <label className="rental-field"><span className="rental-field-label">If other, describe</span>
          <input className="rental-input" type="text" placeholder="Describe the account type" value={other} onChange={(e) => onOther(e.target.value)} /></label>
      )}
    </React.Fragment>
  );
}

// FASection — a titled, tabbed, repeatable list of entries.
function FASection({ title, subtitle, list, emptyItem, labelKey, addLabel, onChange, renderItem }) {
  const [active, setActive] = React.useState(0);
  const update = (patch) => onChange(list.map((it, i) => (i === active ? { ...it, ...patch } : it)));
  const add = () => { const n = [...list, emptyItem(list.length)]; onChange(n); setActive(n.length - 1); };
  const remove = (i) => {
    const n = list.filter((_, idx) => idx !== i).map((it, idx) => ({ ...it, label: it.label.replace(/\d+$/, idx + 1) }));
    onChange(n.length ? n : [emptyItem(0)]);
    setActive((cur) => Math.max(0, Math.min(cur, (n.length || 1) - 1)));
  };
  const item = list[Math.min(active, list.length - 1)];

  return (
    <div className="fa-section">
      <div className="fa-section-head">
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="rental-tabs">
        {list.map((it, i) => (
          <button key={i} type="button" className={"rental-tab" + (active === i ? " active" : "")} onClick={() => setActive(i)}>
            <span>{((it[labelKey] || "").trim()) || it.label}</span>
            {list.length > 1 && (
              <span role="button" tabIndex={0} className="rental-tab-remove" aria-label="Remove"
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); remove(i); } }}>
                <Icon name="x" size={12} />
              </span>
            )}
          </button>
        ))}
        <button type="button" className="rental-tab-add" onClick={add}><Icon name="plus" size={14} /> {addLabel}</button>
      </div>
      {renderItem(item, update)}
    </div>
  );
}

export { ForeignAccountsOrganizer };

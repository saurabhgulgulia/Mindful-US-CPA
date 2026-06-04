import React from 'react';
import { Icon } from './Icon.jsx';

// IncomeOrganizer — Step "Income". When the client files with a spouse, the
// whole section splits into two TABS at the top — Tax payer and Spouse — each
// holding that person's income heads. Each head holds one or more entries with
// income earned/received, tax withheld (+ country), currency + USD equivalent.

const INCOME_HEADS = [
  { key: "employed",   flag: "employed",     emoji: "💼", title: "Employment income",         sub: "Wages, salary, bonuses (W-2 or foreign equivalent)." },
  { key: "selfEmp",    flag: "selfEmployed", emoji: "🧰", title: "Self-employment income",    sub: "Freelance, consulting, contractor, sole-proprietor earnings." },
  { key: "dividends",  flag: "dividends",    emoji: "💰", title: "Dividend income",           sub: "From US or foreign brokerages and funds." },
  { key: "interest",   flag: "interest",     emoji: "💵", title: "Interest income",           sub: "Bank, savings, money-market, or loan interest." },
  { key: "investments",flag: "investments",  emoji: "📈", title: "Investment / capital gains", sub: "Sales of stocks, funds, or other holdings." },
  { key: "retirement", flag: "retirement",   emoji: "🌅", title: "Retirement income",         sub: "Social Security, pensions, annuities, IRA / 401(k)." },
];

const emptyIncomeEntry = () => ({
  source: "",
  earned:   { amount: "", currency: "USD", rateBasis: "" },
  withheld: { amount: "", currency: "USD", rateBasis: "" },
  withheldCountry: "United States",
});

function IncomeOrganizer({ about, showSpouse, value, onChange }) {
  const heads = INCOME_HEADS.filter((h) => about[h.flag] === "yes");
  const [person, setPerson] = React.useState("taxpayer");
  const owner = showSpouse ? person : "taxpayer";
  const data = value || {};

  // data shape: { [owner]: { [headKey]: [entries] } }
  const ownerData = data[owner] || {};
  const entriesFor = (headKey) =>
    (ownerData[headKey] && ownerData[headKey].length ? ownerData[headKey] : [emptyIncomeEntry()]);

  const setEntries = (headKey, entries) =>
    onChange({ ...data, [owner]: { ...ownerData, [headKey]: entries } });
  const updateEntry = (headKey, idx, patch) =>
    setEntries(headKey, entriesFor(headKey).map((e, i) => (i === idx ? { ...e, ...patch } : e)));
  const addEntry = (headKey) => setEntries(headKey, [...entriesFor(headKey), emptyIncomeEntry()]);
  const removeEntry = (headKey, idx) => {
    const list = entriesFor(headKey).filter((_, i) => i !== idx);
    setEntries(headKey, list.length ? list : [emptyIncomeEntry()]);
  };

  if (heads.length === 0) {
    return (
      <div className="income-empty">
        <span className="income-empty-emoji" aria-hidden="true">🍃</span>
        <div>
          <h3>No income sources flagged yet.</h3>
          <p>Head back to “About you” and mark the income types that apply — they'll appear here for the amounts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="income-wrap">
      {showSpouse && (
        <div className="person-tabs">
          <button type="button" className={"person-tab" + (person === "taxpayer" ? " active" : "")} onClick={() => setPerson("taxpayer")}>
            <Icon name="user" size={15} />
            Tax payer
          </button>
          <button type="button" className={"person-tab" + (person === "spouse" ? " active" : "")} onClick={() => setPerson("spouse")}>
            <Icon name="users" size={15} />
            Spouse
          </button>
        </div>
      )}

      {showSpouse && (
        <div className="person-banner">
          <span className="person-banner-icon"><Icon name={person === "spouse" ? "users" : "user"} size={14} /></span>
          You're entering income for the <strong>{person === "spouse" ? "spouse" : "tax payer"}</strong>.
          Switch tabs above to record the other person's income.
        </div>
      )}

      {heads.map((h) => (
        <div key={h.key} className="income-head">
          <div className="income-head-title">
            <span className="income-head-emoji" aria-hidden="true">{h.emoji}</span>
            <div>
              <h4>{h.title}</h4>
              <p>{h.sub}</p>
            </div>
          </div>

          <div className="income-entries">
            {entriesFor(h.key).map((entry, idx) => (
              <div key={idx} className="income-entry">
                {entriesFor(h.key).length > 1 && (
                  <div className="income-entry-head">
                    <span className="income-entry-num">Entry {idx + 1}</span>
                    <button type="button" className="income-entry-remove" onClick={() => removeEntry(h.key, idx)}>
                      <Icon name="x" size={13} /> Remove
                    </button>
                  </div>
                )}
                <div className="income-fields">
                  <label className="rental-field">
                    <span className="rental-field-label">Source / payer name</span>
                    <input className="rental-input" type="text" placeholder="e.g. Acme Ltd, HSBC, Vanguard"
                      value={entry.source} onChange={(e) => updateEntry(h.key, idx, { source: e.target.value })} />
                  </label>
                  <label className="rental-field">
                    <span className="rental-field-label">Income earned / received</span>
                    <MoneyInput value={entry.earned} onChange={(v) => updateEntry(h.key, idx, { earned: v })} placeholder="0" />
                  </label>
                  <label className="rental-field">
                    <span className="rental-field-label">Tax withheld at source</span>
                    <MoneyInput value={entry.withheld} onChange={(v) => updateEntry(h.key, idx, { withheld: v })} placeholder="0" />
                  </label>
                  <label className="rental-field">
                    <span className="rental-field-label">Country where tax was withheld</span>
                    <select className="rental-input" value={entry.withheldCountry}
                      onChange={(e) => updateEntry(h.key, idx, { withheldCountry: e.target.value })}>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            ))}
            <button type="button" className="income-add" onClick={() => addEntry(h.key)}>
              <Icon name="plus" size={14} />
              Add another {h.title.toLowerCase()} entry
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { IncomeOrganizer };

import React from 'react';
import { About } from './About.jsx';
import { Icon } from './Icon.jsx';

// RentalOrganizer — the conditional follow-up that appears when a client
// answers "That's me" to "I rent out property" in Step 3 (About you).
//
// Each money input has its own currency selector so foreign-currency receipts
// can sit alongside USD amounts. We convert to USD on the CPA side.

const RENTAL_TYPES = [
  "Single-family residential",
  "Multi-family residential",
  "Vacation / short-term rental",
  "Commercial",
  "Land",
  "Self-rental",
  "Royalty (oil/gas/IP)",
  "Other",
];

const COMMON_CURRENCIES = [
  { code: "USD", symbol: "$" },{ code: "EUR", symbol: "€" },{ code: "GBP", symbol: "£" },
  { code: "AED", symbol: "د.إ" },{ code: "AFN", symbol: "؋" },{ code: "ALL", symbol: "L" },
  { code: "AMD", symbol: "֏" },{ code: "ANG", symbol: "ƒ" },{ code: "AOA", symbol: "Kz" },
  { code: "ARS", symbol: "$" },{ code: "AUD", symbol: "A$" },{ code: "AWG", symbol: "ƒ" },
  { code: "AZN", symbol: "₼" },{ code: "BAM", symbol: "KM" },{ code: "BBD", symbol: "$" },
  { code: "BDT", symbol: "৳" },{ code: "BGN", symbol: "лв" },{ code: "BHD", symbol: ".د.ب" },
  { code: "BIF", symbol: "FBu" },{ code: "BMD", symbol: "$" },{ code: "BND", symbol: "B$" },
  { code: "BOB", symbol: "Bs" },{ code: "BRL", symbol: "R$" },{ code: "BSD", symbol: "$" },
  { code: "BTN", symbol: "Nu." },{ code: "BWP", symbol: "P" },{ code: "BYN", symbol: "Br" },
  { code: "BZD", symbol: "$" },{ code: "CAD", symbol: "C$" },{ code: "CDF", symbol: "FC" },
  { code: "CHF", symbol: "Fr" },{ code: "CLP", symbol: "$" },{ code: "CNY", symbol: "¥" },
  { code: "COP", symbol: "$" },{ code: "CRC", symbol: "₡" },{ code: "CUP", symbol: "$" },
  { code: "CVE", symbol: "$" },{ code: "CZK", symbol: "Kč" },{ code: "DJF", symbol: "Fdj" },
  { code: "DKK", symbol: "kr" },{ code: "DOP", symbol: "RD$" },{ code: "DZD", symbol: "دج" },
  { code: "EGP", symbol: "£" },{ code: "ERN", symbol: "Nfk" },{ code: "ETB", symbol: "Br" },
  { code: "FJD", symbol: "$" },{ code: "GEL", symbol: "₾" },{ code: "GHS", symbol: "₵" },
  { code: "GMD", symbol: "D" },{ code: "GNF", symbol: "FG" },{ code: "GTQ", symbol: "Q" },
  { code: "GYD", symbol: "$" },{ code: "HKD", symbol: "HK$" },{ code: "HNL", symbol: "L" },
  { code: "HRK", symbol: "kn" },{ code: "HTG", symbol: "G" },{ code: "HUF", symbol: "Ft" },
  { code: "IDR", symbol: "Rp" },{ code: "ILS", symbol: "₪" },{ code: "INR", symbol: "₹" },
  { code: "IQD", symbol: "ع.د" },{ code: "IRR", symbol: "﷼" },{ code: "ISK", symbol: "kr" },
  { code: "JMD", symbol: "J$" },{ code: "JOD", symbol: "د.ا" },{ code: "JPY", symbol: "¥" },
  { code: "KES", symbol: "KSh" },{ code: "KGS", symbol: "с" },{ code: "KHR", symbol: "៛" },
  { code: "KMF", symbol: "CF" },{ code: "KRW", symbol: "₩" },{ code: "KWD", symbol: "د.ك" },
  { code: "KYD", symbol: "$" },{ code: "KZT", symbol: "₸" },{ code: "LAK", symbol: "₭" },
  { code: "LBP", symbol: "ل.ل" },{ code: "LKR", symbol: "Rs" },{ code: "LRD", symbol: "$" },
  { code: "LSL", symbol: "L" },{ code: "LYD", symbol: "ل.د" },{ code: "MAD", symbol: "د.م." },
  { code: "MDL", symbol: "L" },{ code: "MGA", symbol: "Ar" },{ code: "MKD", symbol: "ден" },
  { code: "MMK", symbol: "K" },{ code: "MNT", symbol: "₮" },{ code: "MOP", symbol: "MOP$" },
  { code: "MRU", symbol: "UM" },{ code: "MUR", symbol: "₨" },{ code: "MVR", symbol: ".ރ" },
  { code: "MWK", symbol: "MK" },{ code: "MXN", symbol: "$" },{ code: "MYR", symbol: "RM" },
  { code: "MZN", symbol: "MT" },{ code: "NAD", symbol: "$" },{ code: "NGN", symbol: "₦" },
  { code: "NIO", symbol: "C$" },{ code: "NOK", symbol: "kr" },{ code: "NPR", symbol: "₨" },
  { code: "NZD", symbol: "NZ$" },{ code: "OMR", symbol: "ر.ع." },{ code: "PAB", symbol: "B/." },
  { code: "PEN", symbol: "S/" },{ code: "PGK", symbol: "K" },{ code: "PHP", symbol: "₱" },
  { code: "PKR", symbol: "₨" },{ code: "PLN", symbol: "zł" },{ code: "PYG", symbol: "₲" },
  { code: "QAR", symbol: "ر.ق" },{ code: "RON", symbol: "lei" },{ code: "RSD", symbol: "дин" },
  { code: "RUB", symbol: "₽" },{ code: "RWF", symbol: "FRw" },{ code: "SAR", symbol: "ر.س" },
  { code: "SBD", symbol: "$" },{ code: "SCR", symbol: "₨" },{ code: "SDG", symbol: "ج.س." },
  { code: "SEK", symbol: "kr" },{ code: "SGD", symbol: "S$" },{ code: "SLL", symbol: "Le" },
  { code: "SOS", symbol: "Sh" },{ code: "SRD", symbol: "$" },{ code: "SSP", symbol: "£" },
  { code: "STN", symbol: "Db" },{ code: "SYP", symbol: "£" },{ code: "SZL", symbol: "L" },
  { code: "THB", symbol: "฿" },{ code: "TJS", symbol: "ЅМ" },{ code: "TMT", symbol: "m" },
  { code: "TND", symbol: "د.ت" },{ code: "TOP", symbol: "T$" },{ code: "TRY", symbol: "₺" },
  { code: "TTD", symbol: "$" },{ code: "TWD", symbol: "NT$" },{ code: "TZS", symbol: "TSh" },
  { code: "UAH", symbol: "₴" },{ code: "UGX", symbol: "USh" },{ code: "UYU", symbol: "$U" },
  { code: "UZS", symbol: "soʻm" },{ code: "VES", symbol: "Bs" },{ code: "VND", symbol: "₫" },
  { code: "VUV", symbol: "VT" },{ code: "WST", symbol: "T" },{ code: "XAF", symbol: "FCFA" },
  { code: "XCD", symbol: "$" },{ code: "XOF", symbol: "CFA" },{ code: "XPF", symbol: "₣" },
  { code: "YER", symbol: "﷼" },{ code: "ZAR", symbol: "R" },{ code: "ZMW", symbol: "ZK" },
  { code: "ZWL", symbol: "$" },{ code: "OTHER", symbol: "—" },
];

const EXPENSE_FIELDS = [
  { key: "advertising",   label: "Advertising" },
  { key: "autoTravel",    label: "Auto & travel" },
  { key: "cleaning",      label: "Cleaning & maintenance" },
  { key: "commissions",   label: "Commissions" },
  { key: "insurance",     label: "Insurance" },
  { key: "legal",         label: "Legal & professional fees" },
  { key: "management",    label: "Management fee" },
  { key: "mortgageInt",   label: "Interest — mortgage" },
  { key: "otherInt",      label: "Interest — other" },
  { key: "repairs",       label: "Repairs" },
  { key: "supplies",      label: "Supplies" },
  { key: "taxes",         label: "Property taxes" },
  { key: "utilities",     label: "Utilities" },
  { key: "otherExp",      label: "Other expenses" },
];

const emptyProperty = (i) => ({
  label: `Property ${i + 1}`,
  address: "",
  purchaseDate: "",
  type: "",
  cost: { amount: "", currency: "USD", rateBasis: "" },
  fairRentalDays: "",
  personalUseDays: "",
  personalUseDates: "",
  rents:     { amount: "", currency: "USD", rateBasis: "" },
  royalties: { amount: "", currency: "USD", rateBasis: "" },
  expenses: EXPENSE_FIELDS.reduce((a, f) => ({ ...a, [f.key]: { amount: "", currency: "USD", rateBasis: "" } }), {}),
});

function RentalOrganizer({ value, onChange }) {
  // value is an array of properties; ensure at least one exists
  const props = value && value.length > 0 ? value : [emptyProperty(0)];
  const [active, setActive] = React.useState(0);

  const update = (idx, patch) => {
    const next = props.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    onChange(next);
  };
  const updateMoney = (idx, key, money) => {
    const next = props.map((p, i) => (i === idx ? { ...p, [key]: money } : p));
    onChange(next);
  };
  const updateExpense = (idx, expKey, money) => {
    const next = props.map((p, i) =>
      i === idx ? { ...p, expenses: { ...p.expenses, [expKey]: money } } : p
    );
    onChange(next);
  };
  const addProperty = () => {
    const next = [...props, emptyProperty(props.length)];
    onChange(next);
    setActive(next.length - 1);
  };
  const removeProperty = (idx) => {
    if (props.length === 1) return;
    const next = props.filter((_, i) => i !== idx).map((p, i) => ({ ...p, label: `Property ${i + 1}` }));
    onChange(next);
    setActive(Math.max(0, Math.min(active, next.length - 1)));
  };

  const p = props[active];

  return (
    <div className="rental-card">
      <div className="rental-header">
        <div className="rental-header-left">
          <span className="rental-header-emoji" aria-hidden="true">🏘️</span>
          <div>
            <h3>Rental property details</h3>
            <p>
              List each property you rent out. Enter amounts in whatever currency you receive them —
              we'll handle the year-end USD conversion. Add another property below if you have more than one.
            </p>
          </div>
        </div>
      </div>

      {/* Property tab strip */}
      <div className="rental-tabs">
        {props.map((pr, i) => (
          <button
            key={i}
            type="button"
            className={"rental-tab" + (active === i ? " active" : "")}
            onClick={() => setActive(i)}
          >
            <span>{pr.label}</span>
            {props.length > 1 && (
              <span
                role="button"
                tabIndex={0}
                className="rental-tab-remove"
                aria-label={`Remove ${pr.label}`}
                onClick={(e) => { e.stopPropagation(); removeProperty(i); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    removeProperty(i);
                  }
                }}
              >
                <Icon name="x" size={12} />
              </span>
            )}
          </button>
        ))}
        <button type="button" className="rental-tab-add" onClick={addProperty}>
          <Icon name="plus" size={14} />
          Add another property
        </button>
      </div>

      {/* General info */}
      <RentalSection title="General information" icon="map-pin">
        <div className="rental-grid">
          <RentalField label="Property address" full>
            <input
              type="text"
              className="rental-input"
              placeholder="Street, city, country"
              value={p.address}
              onChange={(e) => update(active, { address: e.target.value })}
            />
          </RentalField>
          <RentalField label="Purchase date">
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM/DD/YYYY"
              maxLength={10}
              className="rental-input"
              value={p.purchaseDate}
              onChange={(e) => update(active, { purchaseDate: e.target.value })}
            />
          </RentalField>
          <RentalField label="Type of property">
            <select
              className="rental-input"
              value={p.type}
              onChange={(e) => update(active, { type: e.target.value })}
            >
              <option value="">— Select —</option>
              {RENTAL_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </RentalField>
          <RentalField label="Cost / basis of the property">
            <MoneyInput
              value={p.cost}
              onChange={(v) => updateMoney(active, "cost", v)}
              placeholder="0"
            />
          </RentalField>
          <RentalField label="Fair rental days" hint="Days actually rented at fair market value.">
            <input
              type="number"
              className="rental-input"
              min="0" max="366"
              placeholder="0"
              value={p.fairRentalDays}
              onChange={(e) => update(active, { fairRentalDays: e.target.value })}
            />
          </RentalField>
          <RentalField label="Personal use days" hint="Days you used it yourself.">
            <input
              type="number"
              className="rental-input"
              min="0" max="366"
              placeholder="0"
              value={p.personalUseDays}
              onChange={(e) => update(active, { personalUseDays: e.target.value })}
            />
          </RentalField>
          <RentalField label="Personal use dates" hint="The dates you stayed there yourself (e.g. Jul 1–14, Dec 20–27).">
            <input
              type="text"
              className="rental-input"
              placeholder="e.g. Jul 1–14, Dec 20–27"
              value={p.personalUseDates || ""}
              onChange={(e) => update(active, { personalUseDates: e.target.value })}
            />
          </RentalField>
        </div>
      </RentalSection>

      {/* Income */}
      <RentalSection title="Income" icon="trending-up">
        <div className="rental-grid">
          <RentalField label="Rents collected">
            <MoneyInput
              value={p.rents}
              onChange={(v) => updateMoney(active, "rents", v)}
              placeholder="0"
            />
          </RentalField>
          <RentalField label="Royalties (if any)">
            <MoneyInput
              value={p.royalties}
              onChange={(v) => updateMoney(active, "royalties", v)}
              placeholder="0"
            />
          </RentalField>
        </div>
      </RentalSection>

      {/* Expenses */}
      <RentalSection title="Expenses" icon="receipt" subtitle="All amounts annual. Leave blank if not applicable.">
        <div className="rental-grid expenses">
          {EXPENSE_FIELDS.map((f) => (
            <RentalField key={f.key} label={f.label}>
              <MoneyInput
                value={p.expenses[f.key]}
                onChange={(v) => updateExpense(active, f.key, v)}
                placeholder="0"
              />
            </RentalField>
          ))}
        </div>
      </RentalSection>

      <div className="rental-tip">
        <span className="rental-tip-icon"><Icon name="info" size={14} /></span>
        <span>
          <strong>Why we ask for currency:</strong> if your property is abroad, receipts and bills
          arrive in local currency. Recording amounts as-received lets us apply the correct annual
          exchange rate for Schedule E reporting — far more accurate than converting on your end.
        </span>
      </div>
    </div>
  );
}

function RentalSection({ title, subtitle, icon, children }) {
  return (
    <div className="rental-section">
      <div className="rental-section-head">
        <span className="rental-section-icon"><Icon name={icon} size={16} /></span>
        <div>
          <h4>{title}</h4>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function RentalField({ label, hint, full, children }) {
  return (
    <label className={"rental-field" + (full ? " full" : "")}>
      <span className="rental-field-label">{label}</span>
      {children}
      {hint && <span className="rental-field-hint">{hint}</span>}
    </label>
  );
}

function MoneyInput({ value, onChange, placeholder }) {
  const v = value || { amount: "", currency: "USD", rateBasis: "" };
  const sym = (COMMON_CURRENCIES.find((c) => c.code === v.currency) || COMMON_CURRENCIES[0]).symbol;
  const isForeign = v.currency !== "USD";
  return (
    <span className="money-block">
      <span className="money-input">
        <span className="money-symbol">{sym}</span>
        <input
          type="text"
          inputMode="decimal"
          className="money-amount"
          placeholder={placeholder || "0"}
          value={v.amount}
          onChange={(e) => {
            const s = e.target.value;
            if (s === "" || /^\d*\.?\d*$/.test(s)) onChange({ ...v, amount: s });
          }}
        />
        <select
          className="money-currency"
          value={v.currency}
          onChange={(e) => onChange({ ...v, currency: e.target.value, rateBasis: e.target.value === "USD" ? "" : v.rateBasis })}
        >
          {COMMON_CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>{c.code}</option>
          ))}
        </select>
      </span>
      {isForeign && (
        <span className="money-rate">
          <span className="money-rate-usd">
            <span className="money-rate-usd-label">USD equivalent</span>
            <span className="money-input money-input-usd">
              <span className="money-symbol">$</span>
              <input
                type="text"
                inputMode="decimal"
                className="money-amount"
                placeholder="0"
                value={v.usd || ""}
                onChange={(e) => {
                  const s = e.target.value;
                  if (s === "" || /^\d*\.?\d*$/.test(s)) onChange({ ...v, usd: s });
                }}
              />
              <span className="money-usd-tag">USD</span>
            </span>
          </span>
        </span>
      )}
    </span>
  );
}

export { RentalOrganizer, MoneyInput };

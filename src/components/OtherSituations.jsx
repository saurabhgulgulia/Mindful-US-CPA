import React from 'react';
import { About } from './About.jsx';
import { Icon } from './Icon.jsx';

// OtherSituations — grouped Yes/No questions covering entities, crypto,
// miscellaneous income, and non-taxable income (mirrors the reference TQ).
// Rendered near the end of the "About you" step.

const OTHER_GROUPS = [
  {
    label: "Corporations, partnerships & other entities",
    items: [
      { k: "ownShare", three: false, q: "Do you own a share (interest) in a corporation or partnership (US or foreign)?", hint: "Owned directly. Don't count shares held in a brokerage or in ETFs / mutual funds." },
      { k: "soleLLC",  three: false, q: "Are you the sole owner of a US LLC?" },
    ],
  },
  {
    label: "Cryptocurrency",
    items: [
      { k: "cryptoReceive", q: "This year, did you receive — as a reward, award, or payment for property or services — any digital asset?", hint: "Bitcoin, Ethereum, or any other cryptocurrency." },
      { k: "cryptoDispose", q: "This year, did you sell, exchange, gift, or otherwise dispose of any digital asset?", hint: "Bitcoin, Ethereum, or any other cryptocurrency." },
    ],
  },
  {
    label: "Miscellaneous income",
    items: [
      { k: "gift19k",     q: "Did you gift any one person over USD 19,000?", hint: "The gift(s) may be in the form of cash or other property." },
      { k: "inheritance", q: "This year, did you receive an inheritance or gifts from a non-US person?", hint: "A non-US person is someone who is neither a US citizen nor a green-card holder — an “NRA”." },
      { k: "stipend",     q: "Did you receive a stipend or fellowship grant?" },
      { k: "royalties",   q: "Did you receive royalties?" },
      { k: "stateRefund", q: "Did you receive a refund or unemployment income from a US state this year?" },
      { k: "hsa",         q: "Do you have a Health Savings Account (HSA)?" },
      { k: "foreignBenefits", three: true, q: "Did you receive non-US monetary benefits of any kind?", hint: "Example: disability, maternity, paternity, unemployment." },
      { k: "cancelledDebt", q: "Do you have a cancelled debt that you did not pay back?", hint: "For instance, a credit-card bill or some other loan you didn't have to repay." },
      { k: "lottery",     q: "Did you have lottery / gambling winnings or a lawsuit settlement during the filing year?" },
    ],
  },
  {
    label: "Non-taxable income",
    items: [
      { k: "childBenefits", q: "Have you received child benefits of any kind?", hint: "Report child-raising allowances received from a foreign government, if any." },
      { k: "welfare",       q: "Have you received welfare benefits?", hint: "Welfare benefits from a foreign government may be taxable in the US." },
      { k: "housingSubsidy", q: "Have you received government housing subsidies?", hint: "Assistance / allowances for housing provided by the government of your resident country." },
    ],
  },
];

function OtherSituations({ value, onChange, country }) {
  const v = value || {};
  const set = (k, ans) => onChange({ ...v, [k]: ans });
  const [expanded, setExpanded] = React.useState({});
  const toggle = (k) => setExpanded((e) => ({ ...e, [k]: !e[k] }));

  const place = country && country !== "United States" ? country : "your country of residence";

  const taxesPaid = {
    label: "Taxes you've paid",
    items: [
      {
        k: "foreignIncomeTax",
        q: "Did you pay tax to any non-U.S. country on any of your income this year?",
        hint: "You may have paid tax during the year on income like wages, investment, retirement, rental income, etc. Include both withholdings and any separate payments as taxes paid.",
        note: `To find information on foreign annual tax-return requirements in ${place}, refer to that country's official tax authority and other reliable sources. We use whatever foreign tax you paid to calculate your Foreign Tax Credit (Form 1116) or the Foreign Earned Income Exclusion — so the same income isn't taxed twice.`,
      },
      {
        k: "foreignCapitalTax",
        q: "Did you pay any tax to a non-U.S. country on the sale of any capital assets (stock, mutual funds, cryptocurrency, real property, etc.)?",
        note: "Types of capital assets — stocks (shares in companies), mutual funds, cryptocurrency (e.g. Bitcoin and other digital currencies), and real property. Any foreign tax you paid on a sale may qualify for a Foreign Tax Credit against the U.S. tax on the same gain.",
      },
      {
        k: "estimatedPayments",
        three: true,
        q: "Did you make Estimated Tax Payments to the IRS or any U.S. State?",
      },
    ],
  };

  const groups = [...OTHER_GROUPS, taxesPaid];

  return (
    <div className="other-card">
      <div className="other-header">
        <span className="other-emoji" aria-hidden="true">📋</span>
        <div>
          <h3>A few more situations</h3>
          <p>These cover entities, digital assets, and other income the IRS asks about. Most clients answer “No” to most — it only takes a moment.</p>
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.label} className="other-group">
          <div className="other-group-label">{g.label}</div>
          <div className="sincome-list">
            {g.items.map((item) => (
              <div key={item.k} className="sincome-row">
                <div className="sincome-row-body">
                  <div className="sincome-row-q">{item.q}</div>
                  {item.hint && <div className="sincome-row-hint">{item.hint}</div>}
                  {item.note && (
                    <div className="sincome-note">
                      <span className="sincome-note-icon" aria-hidden="true"><Icon name="info" size={14} /></span>
                      <span className="sincome-note-text">
                        {expanded[item.k] ? item.note : (item.note.length > 96 ? item.note.slice(0, 96).trimEnd() + "… " : item.note)}
                        {item.note.length > 96 && (
                          <button type="button" className="sincome-note-more" onClick={() => toggle(item.k)}>
                            {expanded[item.k] ? "See less" : "See more"}
                          </button>
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <div className="sincome-row-pick">
                  <button type="button" className={"about-pick" + (v[item.k] === "no" ? " selected-no" : "")} onClick={() => set(item.k, "no")}>No</button>
                  <button type="button" className={"about-pick" + (v[item.k] === "yes" ? " selected-yes" : "")} onClick={() => set(item.k, "yes")}>Yes</button>
                  {item.three && <button type="button" className={"about-pick about-pick-soft" + (v[item.k] === "unsure" ? " selected-soft" : "")} onClick={() => set(item.k, "unsure")}>I don't know</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { OtherSituations };
